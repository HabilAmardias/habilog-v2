<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  let {
    setCarousal,
    title,
    description,
    item,
  }: {
    setCarousal: (newState: string) => void;
    title: string;
    description: Snippet;
    item: string;
  } = $props();

  let el = $state<Element | null>(null);

  onMount(() => {
    const observer = new IntersectionObserver(
      (e) => {
        e.forEach((val) => {
          if (val.isIntersecting) {
            setCarousal(item);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    if (el) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  });
</script>

<div bind:this={el} class="item-container">
  <h3>{title}</h3>
  {@render description()}
</div>

<style>
  .item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--app-container);
    border: 1px solid var(--app-container);
    border-radius: 0.5rem;
    padding: 1rem;
    gap: 1rem;
    width: 100%;
  }
  .item-container > h3 {
    margin: 0;
    text-align: center;
  }
  @media only screen and (min-width: 768px) {
    .item-container {
      width: 70%;
      margin: 0 auto;
    }
  }
</style>
