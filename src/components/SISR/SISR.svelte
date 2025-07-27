<script lang="ts">
  import Loading from "../Loading.svelte";
  import InlineError from "../InlineError.svelte";
  import { uiState } from "./sisrUiState.svelte";
</script>

{#if uiState.downUrl}
  <div class="download-section">
    <div class="download-container">
      <img src={uiState.downUrl} alt="upscaled-img" width="100px" height="100px" />
      <a
        download={`upscaled_img.png`}
        onclick={() => uiState.removeURL()}
        href={uiState.downUrl}>Download your upscaled image here</a
      >
    </div>
  </div>
{:else}
  <div class="form">
    <form
      onsubmit={(e) => {
        uiState.handleUpload(e)
        .then((val) => uiState.setDownUrl(val))
        .catch((err: Error) => uiState.setIsError(err))
        .finally(() => uiState.stopLoading())
      }}
      action=""
      method="POST"
    >
      <div class="image-upload-container">
        <label class="label" for="imageFile"
          >{uiState.getFileName()}</label
        >
        <input
          bind:files={uiState.files}
          type="file"
          name="imageFile"
          id="imageFile"
          required
          accept=".jpeg, .png, .bmp, .jpg"
        />
      </div>
      {#if uiState.isError}
        <InlineError message={uiState.isError.message} />
      {/if}
      <div class="button-container">
        <button disabled={uiState.isLoading} type="submit">
          {#if uiState.isLoading}
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
