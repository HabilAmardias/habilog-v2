<script lang="ts">
  import MyResume from "../assets/resume.pdf";
  import MyPhoto from "../assets/MyPhoto.jpeg";
  import GraduationPhoto from "../assets/GraduationPhoto.jpeg";
  import AboutContent from "./AboutContent.svelte";
</script>

{#snippet introduction()}
  <img class="about-img" src={MyPhoto} alt="" />
  <p>
    Hello, first, I want to say thank you for visiting this page. My name is
    Habil. I was born in Jakarta, Desember 9th 2002. I have interest in machine
    learning, AI and web-development, I also like anime haha.
  </p>
{/snippet}

{#snippet education()}
  <img src={GraduationPhoto} alt="" class="about-img" />
  <p>
    I graduated with a degree in Mathematics from a university in Indonesia in
    August 2024. During college, I participated in several data science
    competition, like Satria Data Big Data Competition, IPB Gammafest,
    DataSlayer, etc, It was a great experience. Occasionally I also participate
    in online competition in kaggle like ISIC 2024, and sometime monthly kaggle
    playground competition, it is very fun, I learn a lot from another
    competitor like how they process data, modelling, etc.
    <br />
    <br />
    Okay, that's enough about me, for more detail you can see my resume
    <a
      download="resume.pdf"
      class="nav-link"
      target="_blank"
      rel="noopener noreferrer"
      href={MyResume}>attached here</a
    >.
  </p>
{/snippet}

{#snippet aboutPage()}
  <div class="content-title">
    <h2>About this page</h2>
  </div>
  <p>
    If you are wondering "what is this page about", this page purpose is to
    archive my personal projects or maybe personal achievement. The project can
    be anything really but i think the majority of it wil be either machine
    learning/ai or web development project related. The scale of each project
    here will be not too large i think since there are limitations, and mostly
    I'd do it for fun or if I have spare time.
    <br />
    <br />
    This page is powered by
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://svelte.dev/"
      class="nav-link">Svelte</a
    >
    and the backend is powered by
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.python.org/"
      class="nav-link">Python</a
    >
    with
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://fastapi.tiangolo.com/"
      class="nav-link">FastAPI</a
    >.
  </p>
{/snippet}

{#snippet finalWords()}
  <div class="content-title">
    <h2>Final words</h2>
  </div>
  <p>
    If you have any feedback for this page you can contact me via <a
      href="mailto:habilamar@gmail.com"
      class="nav-link">this email</a
    >. Once again thank you for visiting this page. I hope what this page
    provide will be helpful to you.
  </p>
{/snippet}

<AboutContent snip={introduction} />
<AboutContent snip={education} />
<AboutContent snip={aboutPage} />
<AboutContent snip={finalWords} />

<style>
  .about-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .nav-link {
    color: var(--sub-title);
  }
  .nav-link:hover {
    color: var(--text);
  }
  @media only screen and (min-width: 1024px) {
    .about-img {
      width: 300px;
      height: 300px;
    }
    .content-title > h2 {
      width: max-content;
    }
  }
</style>
