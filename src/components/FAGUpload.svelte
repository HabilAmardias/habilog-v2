<script lang="ts">
  import InlineError from "./InlineError.svelte";
  import Loading from "./Loading.svelte";

  interface FAGResponse {
    message: string;
    data: { probability: number; age_range: string };
  }

  let {
    setResult,
  }: {
    setResult: (data: {
      probability: number;
      age_range: string;
      url: string;
    }) => void;
  } = $props();

  let files = $state<FileList | null>(null);
  let isError = $state<string | null>(null);
  let isLoading = $state<boolean>(false);
  let downUrl = $state<string>("");

  $effect(() => {
    const imgTypes = ["image/png", "image/jpeg", "image/bmp"];
    if (files === null) {
      isError = "Please upload a file";
    } else if (files && !imgTypes.includes(files[0].type)) {
      isError = "Wrong File Types";
    } else {
      isError = null;
    }
  });

  async function handleUpload(
    e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) {
    if (files === null) {
      throw new Error("There is no file uploaded");
    }
    e.preventDefault();

    const file = files[0];
    downUrl = window.URL.createObjectURL(file);
    const url = `${import.meta.env.VITE_BACKEND_URL}/fag/upload`;
    const formData = new FormData();
    formData.append("file", file);

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

<div class="image-upload-container">
  <label class="label" for="imageFile"
    >{files ? files[0].name : "Upload your image here"}</label
  >
  <input bind:files type="file" name="imageFile" id="imageFile" required />
</div>
{#if isError}
  <InlineError message={isError} />
{/if}
<div class="button-container">
  <button
    onclick={(e) => {
      isLoading = true;
      handleUpload(e)
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
    disabled={isError || isLoading ? true : false}
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
  #imageFile {
    display: none;
  }
  .label {
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: var(--text);
    border: 1px dashed var(--text);
    font-size: small;
  }
  .button-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .button-container > button {
    color: var(--sub-title);
    background-color: var(--container);
    padding-block: 0.5rem;
    border: 1px solid var(--container);
    border-radius: 0.5rem;
    width: 50%;
  }

  .button-container > button:hover {
    color: var(--container);
    background-color: var(--sub-title);
  }
  .button-container > button:disabled {
    opacity: 0.5;
  }
</style>
