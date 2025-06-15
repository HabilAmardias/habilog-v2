<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  let { snip }: { snip: Snippet } = $props();

  let isVisible = $state<boolean>(false);
  let container = $state<Element | null>(null);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.5 }
    );
    if (container) {
      observer.observe(container);
    }
    return () => observer.disconnect();
  });
</script>

<div bind:this={container} class={`content ${isVisible ? "inview" : ""}`}>
  {@render snip()}
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.6s ease-out,
      transform 0.6s ease-out;
  }
  .content.inview {
    opacity: 1;
    transform: translateY(0);
  }
  @media only screen and (min-width: 1024px) {
    .content {
      flex-direction: row;
      gap: 2rem;
      height: 50dvh;
    }
  }
</style>
