<script lang="ts">
  import type { RouterItf } from "../stores/RouteStore.svelte";

  let { router }: RouterItf = $props();
</script>

<section class="content-section">
  <h2>Hello</h2>
  <p>
    Welcome to my page. First I want to introduce myself. My name is Muhammad
    Habil Amardias. I was born on December 9, 2002. I'm a graduate of the The
    mathematics program at the University of Indonesia, a little bit of trivia,
    I falls into the category of people who like anime, often called a "weaboo"
    (my first waifu is Elysia from Honkai Impact 3). I have an interest in
    machine learning, AI, and programming.
  </p>
</section>
<section class="content-section">
  <h2>About This Page</h2>
  <p>
    Okay let's stop talking about me, some of you might be wondering what is
    this page about? On this page, I'll showcase my projects, which can be
    anything, like for example a computer vision model showcase or maybe data
    analysis, et cetera. Uhm anyway you can try on things that I have built by
    click one of these option below
  </p>
</section>
<section class="projects-section">
  <h2>My Projects</h2>
  <ul class="projects-list">
    <li>
      <button
        class="project-container"
        onclick={() => {
          router.changeRoute("FAG");
        }}
      >
        <h3>Face Age Detector</h3>
        <p>
          This project implement deep learning model (MobileNetV3 from
          <a
            href="https://pytorch.org/vision/stable/models/generated/torchvision.models.mobilenet_v3_large.html#torchvision.models.mobilenet_v3_large"
            >PyTorch</a
          >) for Face Age Detection, fine-tuned on
          <a href="https://susanqq.github.io/UTKFace/">Face Dataset Here</a>.
          You can upload your face image or you can take a photo with camera (if
          you allow it). Your uploaded image will not be uploaded to database.
        </p>
      </button>
    </li>
    <li>
      <button
        class="project-container"
        onclick={() => {
          router.changeRoute("SISR");
        }}
      >
        <h3>Image Upscaler</h3>
        <p>
          This project implements a deep learning model based on
          <a href="https://arxiv.org/pdf/1609.04802">SRGAN</a> for single image super-resolution
          (4x upscale). You can upload image you want to upscale, your uploaded image
          will not be uploaded to database.
        </p>
      </button>
    </li>
  </ul>
</section>

<style>
  .content-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
  }
  .projects-section > h2 {
    text-align: center;
  }
  .projects-list {
    width: 100%;
    padding: 0;
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    gap: 4%;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .projects-list::-webkit-scrollbar {
    display: none;
  }
  .projects-list > li {
    list-style-type: none;
    flex: 0 0 100%;
  }

  .project-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--container);
    border: 1px solid var(--container);
    border-radius: 0.5rem;
    padding: 1rem;
    gap: 1rem;
    width: 100%;
    cursor: pointer;
    height: 100%;
  }
  .project-container > h3 {
    margin: 0;
    text-align: center;
  }
  @media only screen and (min-width: 768px) {
    .content-section {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    .project-container {
      width: 60%;
      margin: 0 auto;
    }
  }
</style>
