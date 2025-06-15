<script lang="ts">
  import Loading from "../Loading.svelte";
  import InlineError from "../InlineError.svelte";

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

{#if downloadURL}
  <div class="download-section">
    <div class="download-container">
      <img src={downloadURL} alt="upscaled-img" width="100px" height="100px" />
      <a
        download={`upscaled_img.png`}
        onclick={() => (downloadURL = null)}
        href={downloadURL}>Download your upscaled image here</a
      >
    </div>
  </div>
{:else}
  <div class="form">
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
        <label class="label" for="imageFile"
          >{files ? files[0].name : "Upload your image here"}</label
        >
        <input
          bind:files
          type="file"
          name="imageFile"
          id="imageFile"
          required
          accept=".jpeg, .png, .bmp, .jpg"
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
  </div>
{/if}

<style>
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
  }
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
    background-color: var(--app-container);
    padding: 0.5rem;
    border: 1px solid var(--app-container);
    border-radius: 0.5rem;
    text-align: center;
    color: var(--sub-title);
  }

  .download-container > a:hover {
    color: var(--text);
  }

  #imageFile {
    display: none;
  }
  .form > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
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
  .label {
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: var(--text);
    border: 1px dashed var(--text);
  }
</style>
