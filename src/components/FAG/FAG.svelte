<script lang="ts">
  import FagCamera from "./FAGCamera.svelte";
  import { uiState } from "./fagUiState.svelte";
  import FagUpload from "./FAGUpload.svelte";
</script>

{#if "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices}
  <p>Choose one of the option</p>
  <select class="upload-selection" bind:value={uiState.uploadOption} name="" id="">
    <option value="camera">Camera</option>
    <option value="upload">Upload</option>
  </select>
{/if}

{#if uiState.result}
  <section class="result-section">
    <div class="result-container">
      <img class="image-result" src={uiState.result.url} alt="" width="300" />
      <p>
        {Math.round(uiState.result.probability * 100)}% chance that you are {uiState.result.age_range}
      </p>
    </div>
    <div class="button-container">
      <button
        type="button"
        onclick={() => uiState.removeResult()}>Upload other image</button
      >
    </div>
  </section>
{:else}
  <section class="form">
    <form action="" method="POST">
      {#if uiState.uploadOption === "upload"}
        <FagUpload
          state={uiState}
        />
      {:else if uiState.uploadOption === "camera"}
        <FagCamera
          state={uiState}
        />
      {/if}
    </form>
  </section>
{/if}

<style>
  .upload-selection {
    background-color: var(--app-container);
    padding: 0.5rem;
    color: var(--sub-title);
    border-radius: 0.5rem;
  }
  .form {
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
    flex-direction: column;
    gap: 1rem;
  }
  .result-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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
    width: fit-content;
    padding: 0.5rem;
  }

  .button-container > button:hover {
    color: var(--app-container);
    background-color: var(--sub-title);
  }
</style>
