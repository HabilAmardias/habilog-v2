<script lang="ts">
  import InlineError from "../InlineError.svelte";
  import Loading from "../Loading.svelte";
  import type { FAGUploadState } from "./fagUiState.svelte";
  let {state} : {state: FAGUploadState} = $props()
  
</script>

<div class="image-upload-container">
  <label class="label" for="imageFile"
    >{state.getFileName()}</label
  >
  <input
    bind:files={state.files}
    type="file"
    name="imageFile"
    id="imageFile"
    required
    accept=".jpeg, .png, .bmp, .jpg"
  />
</div>
{#if state.isError}
  <InlineError message={state.isError.message} />
{/if}
<div class="button-container">
  <button
    onclick={(e) => {
      state.handleUploadFile(e)
        .then((val) => {
          state.setResult({...val.data, url: state.downUrl})
        })
        .catch((err: Error) => {
          state.setIsError(err);
        })
        .finally(() => {
          state.stopLoading()
        });
    }}
    disabled={state.isLoading}
    type="button"
  >
    {#if state.isLoading}
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
</style>
