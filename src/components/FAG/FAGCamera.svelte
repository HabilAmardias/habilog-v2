<script lang="ts">
  import { onMount } from "svelte";
  import InlineError from "../InlineError.svelte";
  import Loading from "../Loading.svelte";

  let {
    setResult,
  }: {
    setResult: (data: {
      probability: number;
      age_range: string;
      url: string;
    }) => void;
  } = $props();

  interface FAGResponse {
    message: string;
    data: { probability: number; age_range: string };
  }

  let isError = $state<string | null>(null);
  let isLoading = $state<boolean>(false);
  let videoSource = $state<HTMLVideoElement | null>(null);
  let canvas = $state<HTMLCanvasElement | null>(null);
  let downUrl = $state<string>("");

  onMount(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((val) => {
        if (videoSource) {
          videoSource.srcObject = val;
          videoSource.play();
        }
      })
      .catch(() => (isError = "Failed to use webcam"));
    return () => {
      (videoSource!.srcObject! as MediaStream)
        .getTracks()
        .forEach((t) => t.stop());
    };
  });

  async function handleWebcam(
    e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) {
    e.preventDefault();

    if (canvas && videoSource) {
      canvas.width = videoSource.videoWidth;
      canvas.height = videoSource.videoHeight;
    }

    const context = canvas?.getContext("2d");
    context?.drawImage(
      videoSource as CanvasImageSource,
      0,
      0,
      canvas!.width,
      canvas!.height
    );

    const formData = new FormData();
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas?.toBlob((b) => {
        if (b) {
          resolve(b);
        }
      }, "image/png");
    });
    if (!blob) throw new Error("Failed to capture image from webcam");
    downUrl = window.URL.createObjectURL(blob);
    formData.append("file", blob);

    const url = `${import.meta.env.VITE_BACKEND_URL}/fag/upload`;

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.detail);
    }
    const response: FAGResponse = await res.json();
    return response;
  }
</script>

<video bind:this={videoSource}><track kind="captions" /></video>
<canvas bind:this={canvas} style="display: none;"></canvas>
{#if isError}
  <InlineError message={isError} />
{/if}
<div class="button-container">
  <button
    onclick={(e) => {
      isLoading = true;
      isError = null;
      handleWebcam(e)
        .then((val) => {
          setResult({
            age_range: val.data.age_range,
            probability: val.data.probability,
            url: downUrl,
          });
        })
        .catch((err: Error) => {
          console.error(err);
          isError = err.message;
        })
        .finally(() => {
          isLoading = false;
        });
    }}
    disabled={isLoading ? true : false}
    type="button"
  >
    {#if isLoading}
      <Loading />
    {:else}
      Upload
    {/if}
  </button>
</div>

<style>
  .button-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .button-container > button {
    color: var(--sub-title);
    background-color: var(--app-container);
    padding-block: 0.5rem;
    border: 1px solid var(--app-container);
    border-radius: 0.5rem;
    width: 50%;
  }

  .button-container > button:hover {
    color: var(--app-container);
    background-color: var(--sub-title);
  }
  .button-container > button:disabled {
    opacity: 0.5;
  }
</style>
