<script lang="ts">
  import FagCamera from "./FAGCamera.svelte";
  import FagUpload from "./FAGUpload.svelte";
  let result = $state<{ probability: number; age_range: string } | null>(null);
  let uploadOption = $state<string>("upload");
</script>

{#if "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices}
  <p>Choose one of the option</p>
  <select class="upload-selection" bind:value={uploadOption} name="" id="">
    <option value="camera">Camera</option>
    <option value="upload">Upload</option>
  </select>
{/if}

{#if !result}
  <section class="form">
    <form action="" method="POST">
      {#if uploadOption === "upload"}
        <FagUpload
          setResult={(data) => {
            result = data;
          }}
        />
      {:else if uploadOption === "camera"}
        <FagCamera
          setResult={(data) => {
            result = data;
          }}
        />
      {/if}
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
    <div class="button-container">
      <button
        type="button"
        onclick={() => {
          result = null;
        }}>Upload other image</button
      >
    </div>
  </section>
{/if}

<style>
  .upload-selection {
    background-color: var(--container);
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
    /* width: 80%; */
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
</style>
