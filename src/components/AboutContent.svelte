<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  let { snip }: { snip: Snippet } = $props();

  let isVisible = $state<boolean>(false);
  let sectionContent = $state<Element | null>(null);

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
    if (sectionContent) {
      observer.observe(sectionContent);
    }
    return () => observer.disconnect();
  });
</script>

<section
  bind:this={sectionContent}
  class={`content-section ${isVisible ? "inview" : ""}`}
>
  {@render snip()}
</section>

<style>
  .content-section {
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
  .content-section.inview {
    opacity: 1;
    transform: translateY(0);
  }
  @media only screen and (min-width: 1024px) {
    .content-section {
      flex-direction: row;
      gap: 2rem;
      height: 50dvh;
    }
  }
</style>
