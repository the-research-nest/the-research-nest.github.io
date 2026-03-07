<svelte:head>
  <title>The Research Nest | Independent Research Forum</title>
  <meta
    name="description"
    content="The Research Nest is an independent, open research forum focused on practical intelligence, efficient systems, and compact world models."
  />
</svelte:head>

<script lang="ts">
  import { publishedResearchPosts } from "$lib/data/research-posts"

  const currentFocusHref = publishedResearchPosts[0]
    ? `/research/${publishedResearchPosts[0].slug}`
    : "/research"
</script>

<div class="landing">
  <section class="hero">
    <div class="hero-copy">
      <h1>Bootstrapping practical intelligence for everyone.</h1>
      <p class="hero-text">
        An open research forum quietly focused on
        efficient, practical approaches to capable systems. The work stays narrow, serious, and
        evaluation-first.
      </p>
      <div class="cta-row">
        <a class="button primary" href="/research">Read research</a>
      </div>
    </div>

    <aside class="focus-panel">
      <div class="panel-kicker">Current focus area</div>
      <h2>Shrinking intelligence to its sharpest core.</h2>
      <p class="panel-copy">
        We are focused on one question: what is the smallest possible AI model that can still
        deliver meaningful performance, structured reasoning, and genuine learning?
      </p>
      <p class="panel-note">Minimal footprint. Maximal surprise.</p>
      <a class="panel-link" href={currentFocusHref}>Read more</a>
    </aside>
  </section>
</div>

<style>
  .landing {
    width: min(1080px, calc(100% - 2rem));
    margin: 0 auto;
    padding: 0.7rem 0 3rem;
    color: #1c1510;
  }

  :global(html.dark) .landing {
    color: #f8f1e8;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 0.75fr);
    gap: 1.75rem;
    min-height: calc(100vh - 8.25rem);
    align-items: center;
    padding: 2.35rem 0 1.4rem;
  }

  .hero-copy {
    max-width: 43rem;
    transform: translateY(-1.35rem);
  }

  .panel-kicker,
  h1,
  h2,
  .hero-text,
  .panel-copy,
  .panel-note,
  .panel-link {
    font-family: Georgia, "Times New Roman", serif;
  }

  h1 {
    margin: 0.75rem 0 0;
    max-width: 11ch;
    color: inherit;
    font-size: clamp(3rem, 6vw, 5.75rem);
    line-height: 0.95;
    letter-spacing: -0.055em;
  }

  .hero-text {
    max-width: 37rem;
    margin: 1.1rem 0 0;
    color: #5f5247;
    font-size: 1rem;
    line-height: 1.9;
  }

  :global(html.dark) .hero-text {
    color: #ddd0c4;
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1.5rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.9rem;
    padding: 0.75rem 1.15rem;
    border-radius: 999px;
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    transition:
      background-color 160ms ease,
      border-color 160ms ease,
      color 160ms ease;
  }

  .button:hover,
  .button:focus-visible,
  .panel-link:hover,
  .panel-link:focus-visible {
    outline: none;
  }

  .button.primary {
    border: 1px solid transparent;
    background: #1c1510;
    color: #fffbf6;
  }

  :global(html.dark) .button.primary {
    background: #f7eee5;
    color: #171210;
  }

  .focus-panel {
    border: 1px solid #d9ccb9;
    border-radius: 1.4rem;
    background: #fffbf6;
  }

  :global(html.dark) .focus-panel {
    border-color: #4a3e36;
    background: #171210;
  }

  .focus-panel {
    padding: 1.35rem 1.25rem;
  }

  h2 {
    margin: 0.7rem 0 0;
    color: inherit;
    font-size: 1.5rem;
    line-height: 1.2;
  }

  .panel-copy {
    margin: 0.9rem 0 0;
    color: #4d4137;
    font-size: 0.98rem;
    line-height: 1.8;
  }

  .panel-note {
    margin: 0.9rem 0 0;
    color: #7b6b5b;
    font-size: 0.94rem;
    line-height: 1.8;
    font-style: italic;
  }

  .panel-link {
    display: inline-flex;
    align-items: center;
    margin-top: 1.3rem;
    color: #1c1510;
    font-size: 0.98rem;
    font-weight: 700;
  }

  :global(html.dark) .panel-copy {
    color: #e2d7cc;
  }

  :global(html.dark) .panel-note {
    color: #c4b2a2;
  }

  :global(html.dark) .panel-link {
    color: #f8f1e8;
  }

  @media (max-width: 920px) {
    .hero {
      grid-template-columns: minmax(0, 1fr);
    }

    .hero {
      min-height: auto;
      padding-top: 1.75rem;
    }

    h1 {
      max-width: 10.5ch;
    }
  }

  @media (max-width: 720px) {
    .landing {
      width: min(100%, calc(100% - 1.6rem));
      padding-bottom: 2rem;
    }

    .hero-copy {
      transform: none;
    }

    .cta-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .button {
      width: 100%;
    }
  }
</style>
