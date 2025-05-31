<script lang="ts">
  import MyFile from "../assets/Resume_Muhammad Habil Amardias_v2 (1).pdf";
</script>

<section class="content-section">
  <h2>About Me</h2>
  <p>
    Hello, first, I want to say thank you for visiting this page. My name is
    Habil. I have interest in machine learning, AI and web-development. To be
    honest i do not really have many things to share here about me but for more
    detail you can see my resume <a
      download="resume.pdf"
      class="nav-link"
      target="_blank"
      rel="noopener noreferrer"
      href={MyFile}>attached here</a
    >.
  </p>
</section>
<section class="content-section">
  <h2>About this page</h2>
  <p>
    If you are wondering "what is this page about", the answer is this page
    purpose is to archive (?) my personal projects or maybe personal achievement
    (if any). The project can be anything really but i think the majority of it
    wil be either machine-learning/ai or web development project related. The
    scale of each project here will be not too large i think since there are
    limitations, and mostly I'd do it for fun or if I have spare time.
  </p>
  <p>
    This page is powered by <a
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
</section>
<section class="content-section">
  <h2>Final words</h2>
  <p>
    If you have any feedback for this page or maybe you just want to chat with
    me, you can contact me via <a
      href="mailto:habilamar@gmail.com"
      class="nav-link">this email</a
    >. Once again thank you for visiting this page. I hope what this page
    provide will be helpful to you.
  </p>
</section>

<style>
  .nav-link {
    color: var(--sub-title);
  }
  .nav-link:hover {
    color: var(--text);
  }
  .content-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
