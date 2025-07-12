<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.ts";
  import ErrorPage from "../components/ErrorPage.svelte";
  import CarouselItem from "../components/CarouselItem.svelte";
  import Loading from "../components/Loading.svelte";
  import Dashboard from "../components/WeatherDashboard/Dashboard.svelte";

  let carouselState = $state<string>("FAG");
  function setCarouselState(newState: string) {
    carouselState = newState;
  }

  let { navigateToHome }: { navigateToHome: () => void } = $props();
</script>

{#snippet FagDesc()}
  <p>
    This project implement deep learning model (MobileNetV3 from
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://pytorch.org/vision/stable/models/generated/torchvision.models.mobilenet_v3_large.html#torchvision.models.mobilenet_v3_large"
      >PyTorch</a
    >) for Face Age Detection, fine-tuned on
    <a
      class="nav-link"
      target="_blank"
      rel="noopener noreferrer"
      href="https://susanqq.github.io/UTKFace/">Face Dataset Here</a
    >. You can upload your face image or you can take a photo with camera (if
    you allow it). Your uploaded image will not be uploaded to database
  </p>
{/snippet}

{#snippet SISRDesc()}
  <p>
    This project implements a deep learning model based on
    <a
      class="nav-link"
      target="_blank"
      rel="noopener noreferrer"
      href="https://arxiv.org/pdf/1609.04802">SRGAN</a
    > for single image super-resolution (4x upscale). You can upload image (up to
    90.000 pixels) you want to upscale, your uploaded image will not be uploaded
    to database.
  </p>
{/snippet}

{#snippet WeatherDashboardDesc()}
  <p>
    This dashboard provides insights into weather patterns in Gunung Putri,
    Indonesia. Weather data is taken from <a
      class="nav-link"
      target="_blank"
      rel="noopener noreferrer"
      href="https://open-meteo.com/">Open-Meteo</a
    >.
  </p>
{/snippet}

<section class="projects-section">
  <h2>My Projects</h2>
  <Carousel.Root>
    <Carousel.Content>
      <Carousel.Item>
        <CarouselItem
          setCarousal={setCarouselState}
          item="FAG"
          title="Face Age Detector"
          description={FagDesc}
        />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselItem
          setCarousal={setCarouselState}
          item="SISR"
          title="Image Upscaler"
          description={SISRDesc}
        />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselItem
          setCarousal={setCarouselState}
          item="WeatherDashboard"
          title="Weather Dashboard"
          description={WeatherDashboardDesc}
        />
      </Carousel.Item>
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</section>
<section class="content-section">
  {#if carouselState === "SISR"}
    {#await import("../components/SISR/SISR.svelte")}
      <Loading />
    {:then SISR}
      <SISR.default />
    {/await}
  {:else if carouselState === "FAG"}
    {#await import("../components/FAG/FAG.svelte")}
      <Loading />
    {:then FAG}
      <FAG.default />
    {/await}
  {:else if carouselState === "WeatherDashboard"}
    <Dashboard navigate={navigateToHome} />
  {:else}
    <ErrorPage message="Not Found" navigate={navigateToHome} />
  {/if}
</section>

<style>
  .projects-section > h2 {
    text-align: center;
  }

  .projects-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
    margin: 0 auto;
  }
  .content-section {
    display: flex;
    flex: 0 1 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .nav-link {
    color: var(--sub-title);
  }
  .nav-link:hover {
    color: var(--text);
  }
</style>
