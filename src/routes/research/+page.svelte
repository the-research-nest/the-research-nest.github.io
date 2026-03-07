<svelte:head>
  <title>Research | The Research Nest</title>
  <meta
    name="description"
    content="Long-form notes on compact intelligence, tiny models, grokking, and experiment design."
  />
</svelte:head>

<script lang="ts">
  import {
    publishedResearchPosts,
  } from "$lib/data/research-posts";
</script>

<div class="research-home">
  <section class="lead">
    <div>
      <h1>Research notes.</h1>
    </div>
    <p class="lead-copy">
      Literature syntheses, experiment notes, field logs.
    </p>
  </section>

  <section class="featured">
    <div class="post-grid">
      {#each publishedResearchPosts as post (post.slug)}
        <article class="featured-card">
          <a class="post-card post-card-link" href={`/research/${post.slug}`}>
            <div class="card-meta">
              <span>{post.publishedOn} / {post.readingTime}</span>
            </div>
            <h3>{post.title}</h3>

            <p class="deck">{post.deck}</p>
            <p class="excerpt">{post.excerpt}</p>

            <div class="tag-row" aria-label="Article tags">
              {#each post.tags as tag (tag)}
                <span>{tag}</span>
              {/each}
            </div>
          </a>
        </article>
      {/each}
    </div>
  </section>
</div>

<style>
  .research-home {
    --ink-color: #1c1510;
    --body-color: #312822;
    --muted-color: #645444;
    --rule-color: #d2c2af;
    --surface-color: #fffaf4;
    --soft-surface: #f5ecdf;
    --accent-color: #ab6118;
    --accent-soft: rgb(171 97 24 / 0.14);
    width: min(1080px, calc(100% - 2rem));
    margin: 0 auto;
    padding: 1.2rem 0 3rem;
    color: var(--body-color);
  }

  :global(html.dark) .research-home {
    --ink-color: #faf3eb;
    --body-color: #e6d9cc;
    --muted-color: #c8b3a2;
    --rule-color: #4a3e36;
    --surface-color: #171210;
    --soft-surface: #211916;
    --accent-color: #f0bf67;
    --accent-soft: rgb(240 191 103 / 0.16);
  }

  .lead {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 0.75fr);
    gap: 1.5rem;
    align-items: end;
    margin-bottom: 2.2rem;
  }

  h1,
  h3,
  .lead-copy,
  .deck,
  .excerpt {
    font-family: Georgia, "Times New Roman", serif;
  }

  h1 {
    margin: 0;
    max-width: 11ch;
    color: var(--ink-color);
    font-size: clamp(3rem, 7vw, 5.25rem);
    line-height: 0.97;
    letter-spacing: -0.05em;
  }

  .lead-copy {
    margin: 0;
    max-width: 28rem;
    color: var(--muted-color);
    font-size: 1rem;
    line-height: 1.85;
  }

  .featured {
    margin-top: 2rem;
  }

  .post-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .featured-card {
    grid-column: 1 / -1;
  }

  .post-card {
    display: block;
    padding: 1.35rem;
    border: 1px solid var(--rule-color);
    border-radius: 1.4rem;
    background:
      radial-gradient(circle at top right, rgb(240 182 98 / 0.14), transparent 36%),
      linear-gradient(180deg, rgb(255 255 255 / 0.2), transparent 60%),
      var(--surface-color);
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      box-shadow 180ms ease;
  }

  :global(html.dark) .post-card {
    background:
      radial-gradient(circle at top right, rgb(245 203 93 / 0.12), transparent 38%),
      linear-gradient(180deg, rgb(255 255 255 / 0.02), transparent 60%),
      var(--surface-color);
  }

  .post-card-link:hover,
  .post-card-link:focus-visible {
    border-color: var(--accent-color);
    box-shadow: 0 18px 38px -28px var(--accent-soft);
    outline: none;
    transform: translateY(-2px);
  }

  .card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    margin-bottom: 1rem;
    color: var(--muted-color);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .card-meta span {
    display: inline-flex;
    flex-wrap: wrap;
    row-gap: 0.2rem;
  }

  h3 {
    margin: 0;
    color: var(--ink-color);
    font-size: 1.55rem;
    line-height: 1.18;
  }

  .deck {
    margin: 0.85rem 0 0;
    color: var(--ink-color);
    font-size: 1rem;
    line-height: 1.75;
  }

  .excerpt {
    margin: 0.8rem 0 0;
    color: var(--body-color);
    font-size: 0.95rem;
    line-height: 1.8;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 1rem;
  }

  .tag-row span {
    border: 1px solid var(--rule-color);
    border-radius: 999px;
    padding: 0.32rem 0.65rem;
    background: var(--soft-surface);
    color: var(--body-color);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .post-card-link:hover h3,
  .post-card-link:focus-visible h3 {
    outline: none;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.16em;
  }

  @media (max-width: 820px) {
    .lead,
    .post-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    h1 {
      max-width: 9.5ch;
    }
  }

  @media (max-width: 640px) {
    .research-home {
      width: min(100%, calc(100% - 1.4rem));
      padding-top: 0.95rem;
      padding-bottom: 2.5rem;
    }

    .lead {
      gap: 0.85rem;
      margin-bottom: 1.6rem;
    }

    .post-card {
      padding: 1.1rem;
      border-radius: 1.15rem;
    }

    .card-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.35rem;
      margin-bottom: 0.8rem;
      font-size: 0.68rem;
      letter-spacing: 0.1em;
    }

    h3 {
      font-size: 1.32rem;
    }

    .deck {
      margin-top: 0.7rem;
      font-size: 0.96rem;
      line-height: 1.7;
    }

    .excerpt {
      margin-top: 0.72rem;
      font-size: 0.91rem;
      line-height: 1.7;
    }

    .tag-row {
      margin-top: 0.85rem;
      gap: 0.4rem;
    }

    .tag-row span {
      font-size: 0.64rem;
    }
  }

  @media (max-width: 480px) {
    .research-home {
      width: min(100%, calc(100% - 1rem));
      padding-top: 0.8rem;
      padding-bottom: 2rem;
    }

    h1 {
      max-width: none;
      font-size: clamp(2.6rem, 14vw, 4rem);
    }

    .lead-copy {
      max-width: none;
      font-size: 0.96rem;
      line-height: 1.72;
    }

    .post-grid {
      gap: 0.8rem;
    }

    .post-card {
      padding: 1rem;
    }
  }
</style>
