<script lang="ts">
  import { onMount } from "svelte";
  import InlineError from "../InlineError.svelte";
  import Loading from "../Loading.svelte";
  import type { FAGCameraState } from "./fagUiState.svelte";
  let {state} : {state: FAGCameraState} = $props()

  onMount(()=>{
    const cleanup = state.getVideo()
    return () => {
      cleanup()
    }
  })
</script>

<video bind:this={state.videoSource}><track kind="captions" /></video>
<canvas bind:this={state.canvas} style="display: none;"></canvas>
{#if state.isError}
  <InlineError message={state.isError.message} />
{/if}
<div class="button-container">
  <button
    onclick={(e) => {
      state.handleUploadCamera(e)
        .then((val) => {
          state.setResult({...val.data, url: state.downUrl})
        })
        .catch((err: Error) => {
          state.setIsError(err)
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
