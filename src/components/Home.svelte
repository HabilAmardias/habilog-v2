<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.ts";
  import type { CarouselNavItf } from "../stores/CarouselNavStore.svelte";
  import ErrorPage from "./ErrorPage.svelte";
  import Fag from "./FAG.svelte";
  import ProjectCarouselItem from "./ProjectCarouselItem.svelte";
  import Sisr from "./SISR.svelte";

  let { CarouselNavigator }: { CarouselNavigator: CarouselNavItf } = $props();

  function navigateToHome() {
    CarouselNavigator.changeState("SISR");
  }
</script>

<section class="projects-section">
  <h2>My Projects</h2>
  <Carousel.Root>
    <Carousel.Content>
      <Carousel.Item>
        <ProjectCarouselItem
          {CarouselNavigator}
          item="FAG"
          title="Face Age Detector"
          description={`<p>
            This project implement deep learning model (MobileNetV3 from
            <a
              href="https://pytorch.org/vision/stable/models/generated/torchvision.models.mobilenet_v3_large.html#torchvision.models.mobilenet_v3_large"
              >PyTorch</a
            >) for Face Age Detection, fine-tuned on
            <a href="https://susanqq.github.io/UTKFace/">Face Dataset Here</a>.
            You can upload your face image or you can take a photo with camera
            (if you allow it). Your uploaded image will not be uploaded to database
          </p>`}
        />
      </Carousel.Item>
      <Carousel.Item>
        <ProjectCarouselItem
          {CarouselNavigator}
          item="SISR"
          title="Image Upscaler"
          description={`<p>
            This project implements a deep learning model based on
            <a href="https://arxiv.org/pdf/1609.04802">SRGAN</a> for single image
            super-resolution (4x upscale). You can upload image (up to 90.000 pixels) you want to upscale, your uploaded image will not be uploaded to database.
          </p>`}
        />
      </Carousel.Item>
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</section>
<section class="content-section">
  {#if CarouselNavigator.navState === "SISR"}
    <Sisr />
  {:else if CarouselNavigator.navState === "FAG"}
    <Fag />
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
  }
  .content-section {
    display: flex;
    flex: 0 1 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
</style>
