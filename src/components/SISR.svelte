<script lang="ts">
  import Loading from "./Loading.svelte";
  import InlineError from "./InlineError.svelte";

  let files = $state<FileList | null>(null);
  let isError = $state<string | null>(null);
  let downloadURL = $state<string | null>(null);
  let isLoading = $state<boolean>(false);

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
    const url = `${import.meta.env.VITE_BACKEND_URL}/sisr/upload`;
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
    const blob = await res.blob();
    const downURL = window.URL.createObjectURL(blob);
    return downURL;
  }
</script>

<section class="content-section">
  <h2>Image Upscaler</h2>
  <p>
    This project implements a deep learning model based on
    <a href="https://arxiv.org/pdf/1609.04802">SRGAN</a> for single image super-resolution
    (4x upscale). You can upload image (up to 90.000 pixels) you want to upscale,
    your uploaded image will not be uploaded to database.
  </p>
</section>
<section class="form-section">
  <form
    onsubmit={(e) => {
      isLoading = true;
      handleSubmit(e)
        .then((val) => {
          downloadURL = val;
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
      <label class="label" for="imageFile">Upload your image here</label>
      <input bind:files type="file" name="imageFile" id="imageFile" required />
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

{#if downloadURL}
  <section class="download-section">
    <div class="download-container">
      <img src={downloadURL} alt="upscaled-img" width="100px" height="100px" />
      <a
        download={`upscaled_img.png`}
        onclick={() => (downloadURL = null)}
        href={downloadURL}>Download your upscaled image here</a
      >
    </div>
  </section>
{/if}

<style>
  .download-section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .download-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .download-container > a {
    text-decoration: none;
    display: block;
    background-color: var(--container);
    padding: 0.5rem;
    border: 1px solid var(--container);
    border-radius: 0.5rem;
    text-align: center;
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
  }
  .button-container > button {
    color: var(--sub-title);
    background-color: var(--container);
    padding: 0.5rem;
    border: 1px solid var(--container);
    border-radius: 0.5rem;
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
    background-color: var(--container);
    color: var(--text);
  }
</style>
