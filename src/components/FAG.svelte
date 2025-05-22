<script lang="ts">
  import Loading from "./Loading.svelte";
  import InlineError from "./InlineError.svelte";

  interface FAGResponse {
    message: string;
    data: { probability: number; age_range: string };
  }

  let files = $state<FileList | null>(null);
  let isError = $state<string | null>(null);
  let isLoading = $state<boolean>(false);
  let result = $state<{ probability: number; age_range: string } | null>(null);

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

  async function handleSubmit(
    e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    if (files === null) {
      throw new Error("There is no file uploaded");
    }
    e.preventDefault();

    const file = files[0];
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

<section class="content-section">
  <h2>Face Age Detector</h2>
  <p>
    This project implement deep learning model (MobileNetV3 from
    <a
      href="https://pytorch.org/vision/stable/models/generated/torchvision.models.mobilenet_v3_large.html#torchvision.models.mobilenet_v3_large"
      >PyTorch</a
    >) for Face Age Detection, fine-tuned on
    <a href="https://susanqq.github.io/UTKFace/">Face Dataset Here</a>. You can
    upload your face image or you can take a photo with camera (if you allow
    it).
  </p>
</section>
{#if !result}
  <section class="form-section">
    <form
      onsubmit={(e) => {
        isLoading = true;
        handleSubmit(e)
          .then((val) => {
            result = {
              probability: val.data.probability,
              age_range: val.data.age_range,
            };
          })
          .catch((err: Error) => {
            console.error(err);
            isError = err.message;
          })
          .finally(() => {
            isLoading = false;
          });
      }}
      action=""
      method="POST"
    >
      <div class="image-upload-container">
        <label class="label" for="imageFile"
          >{files ? files[0].name : "Upload your image here"}</label
        >
        <input
          bind:files
          type="file"
          name="imageFile"
          id="imageFile"
          required
        />
      </div>
      {#if isError}
        <InlineError message={isError} />
      {/if}
      <div class="button-container">
        <button disabled={isError || isLoading ? true : false} type="submit">
          {#if isLoading}
            <Loading />
          {:else}
            Upload
          {/if}
        </button>
      </div>
    </form>
  </section>
{/if}

{#if result}
  <section class="result-section">
    <div class="result-container">
      <p>
        {Math.round(result.probability * 100)}% chance that you are {result.age_range}
      </p>
    </div>
  </section>
{/if}

<style>
  .form-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
  }
  .result-section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .result-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .content-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  #imageFile {
    display: none;
  }
  .form-section > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 80%;
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
  .label {
    /* border: 1px solid ; */
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: var(--text);
    border: 1px dashed var(--text);
  }
</style>
