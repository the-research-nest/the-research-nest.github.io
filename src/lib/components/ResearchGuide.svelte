<script lang="ts">
  import AccordionItem from "$lib/components/research/AccordionItem.svelte";
  import Pill from "$lib/components/research/Pill.svelte";
  import { onMount } from "svelte";
  import {
    architectureOptions,
    assimilationTests,
    bigIdeaQuestions,
    chapters,
    colors,
    criticalControls,
    formatOptions,
    grokkingPhases,
    mastheadPills,
    openQuestions,
    phaseCards,
    ratioCards,
    researchGaps,
    scaleCards,
    understandingTests,
    whyItMatters,
    worldLayers
  } from "$lib/data/research-guide";

  const darkAccentMap: Record<string, string> = {
    [colors.rust]: "#ff9d73",
    [colors.teal]: "#68c6c1",
    [colors.gold]: "#e2bf68",
    [colors.sage]: "#84c48c",
    [colors.slate]: "#90addc",
    [colors.plum]: "#c998c3",
    [colors.muted]: "#d2c1b3"
  };

  let currentChapter = $state(0);
  let isDarkTheme = $state(false);

  function syncTheme() {
    if (typeof document === "undefined") {
      return;
    }

    isDarkTheme = document.documentElement.classList.contains("dark");
  }

  function tone(color: string) {
    return isDarkTheme ? darkAccentMap[color] ?? color : color;
  }

  function alpha(color: string, value: string) {
    return `${tone(color)}${value}`;
  }

  function accentStyle(color: string, surface: string, border: string) {
    return `--accent:${tone(color)}; --accent-surface:${alpha(color, surface)}; --accent-border:${alpha(color, border)};`;
  }

  function accentSurfaceStyle(color: string, surface: string) {
    return `--accent:${tone(color)}; --accent-surface:${alpha(color, surface)};`;
  }

  function accentBorderStyle(color: string, border: string) {
    return `--accent:${tone(color)}; --accent-border:${alpha(color, border)};`;
  }

  function setChapter(index: number) {
    const nextChapter = Math.max(0, Math.min(index, chapters.length - 1));

    if (nextChapter === currentChapter) {
      return;
    }

    currentChapter = nextChapter;

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  onMount(() => {
    syncTheme();

    const observer = new MutationObserver(() => {
      syncTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => {
      observer.disconnect();
    };
  });
</script>

<div class="guide-shell">
  <div class="guide">
    <header class="masthead">
      <a class="archive-link" href="/research">Research archive</a>
      <h1>
        How Small Can an AI Brain Be<br />
        <span>and Still Actually Learn?</span>
      </h1>
      <p class="masthead-copy">
        A plain-English guide to our research, grounded in current literature.
      </p>
      <div class="pill-row">
        {#each mastheadPills as pill (pill.label)}
          <Pill label={pill.label} color={tone(pill.color)} />
        {/each}
      </div>
    </header>

    <nav class="chapter-nav" aria-label="Research guide chapters">
      {#each chapters as chapter, index (chapter)}
        <button
          type="button"
          class:active={currentChapter === index}
          class="chapter-button"
          onclick={() => setChapter(index)}
        >
          {index + 1}. {chapter}
        </button>
      {/each}
    </nav>

    {#if currentChapter === 0}
      <section class="chapter">
        <h2>Chapter 1 - The Big Idea</h2>

        <p class="lead">
          Imagine hiring someone to memorize and truly <em>understand</em> an encyclopedia.
          You could hire a genius with a large brain, or you could give a smaller brain a
          perfectly organised, step-by-step version of the same encyclopedia. Which matters
          more - the size of the brain, or the quality of the book?
        </p>

        <div class="analogy">
          <strong>Idea:</strong> That's the core of what we're studying. An AI model's
          "parameters" are its brain cells. Training "tokens" are the words it reads. We want
          to know: <strong>what is the smallest possible brain that can truly understand a given amount of information?</strong>
        </div>

        <p class="para">
          This question has never been formally answered below one million parameters. We're
          starting with just <strong class="accent-rust">ten thousand</strong>. That's not a
          typo. And it's deliberate - it puts us in completely uncharted territory where every
          experiment runs in minutes on a laptop.
        </p>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>The Two Questions We're Asking</h3>

        <div class="two-column-grid">
          {#each bigIdeaQuestions as item (item.label)}
            <article
              class="accent-card"
              style={accentStyle(item.color, "0d", "2c")}
            >
              <div class="card-label">{item.label}</div>
              <div class="card-quote">{item.question}</div>
              <div class="card-copy">{item.description}</div>
            </article>
          {/each}
        </div>

        <div
          class="callout"
          style={accentStyle(colors.sage, "0e", "2e")}
        >
          <div class="callout-title">Target: Why this matters in the real world</div>
          <div class="callout-copy">
            If we can answer these questions, we can build dramatically smaller, cheaper,
            faster AIs for specific tasks. A hospital AI for diagnosing chest X-rays doesn't
            need to know how to write poetry. If we know the exact minimum size it needs to
            understand radiology - that changes how we build and deploy AI everywhere.
          </div>
        </div>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>What "Understanding" Means in This Experiment</h3>

        <p class="para">
          "Understanding" is a fuzzy word, so we pin it down with four concrete, measurable
          tests. A model only counts as having truly understood its training data if it passes
          all four:
        </p>

        <div class="stack-list">
          {#each understandingTests as test, index (test.title)}
            <div class="stack-row">
              <div
                class="number-badge"
                style={accentSurfaceStyle(test.color, "18")}
              >
                {index + 1}
              </div>
              <div>
                <div class="stack-title">{test.title}</div>
                <div class="card-copy muted">{test.description}</div>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    {#if currentChapter === 1}
      <section class="chapter">
        <h2>Chapter 2 - What the Research Actually Says</h2>

        <p class="para">
          Six bodies of literature directly inform this experiment. Here is what each one found
          and why it matters for what we're doing.
        </p>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>Finding 1 - Scaling Laws - and the "Chinchilla Trap"</h3>
        <p class="citation">Kaplan et al. 2020 - Hoffmann et al. (Chinchilla) 2022</p>

        <article
          class="fact-card"
          style={accentStyle(colors.teal, "08", "25")}
        >
          <div class="fact-title">The Chinchilla Rule</div>
          <div class="fact-copy">
            Google DeepMind's 2022 paper found that for any fixed compute budget, you should
            train with roughly equal numbers of parameters and training tokens - a 1:20 ratio.
            This became the dominant guideline for two years.
          </div>
          <div class="fact-footer">
            Replicated across multiple independent studies. The D/N ~ 20 result is solid.
          </div>
        </article>

        <p class="para">
          But here's what happened after Chinchilla. Major research groups quietly moved away
          from it. Why?
          Because Chinchilla is optimised for training cost - but you also pay for inference
          (every time the model is actually used). A smaller model trained much longer is
          cheaper to run at scale.
        </p>

        <div class="three-column-grid">
          {#each ratioCards as item (item.model)}
            <article
              class="mini-metric"
              style={accentStyle(item.color, "0c", "28")}
            >
              <div class="mini-label">{item.model}</div>
              <div class="mini-value">{item.ratio}</div>
              <div class="mini-note">{item.note}</div>
            </article>
          {/each}
        </div>

        <div
          class="callout"
          style={accentStyle(colors.slate, "0e", "2e")}
        >
          <div class="callout-title">Signal: Why this matters for our experiment</div>
          <div class="callout-copy">
            Chinchilla answers "how to allocate a compute budget." We're asking something
            different and harder: <strong>"what is the minimum number of parameters to genuinely understand a dataset?"</strong>
            These have different answers. Chinchilla cannot tell us P*(T) - the sufficiency
            floor.
          </div>
        </div>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>Finding 2 - Grokking - the Phase Transition to Understanding</h3>
        <p class="citation">Power et al. 2022 - Nanda et al. 2023 - Rubin et al. ICLR 2024</p>

        <article
          class="fact-card"
          style={accentStyle(colors.rust, "08", "25")}
        >
          <div class="fact-title">Grokking: sudden understanding, long after training</div>
          <div class="fact-copy">
            Researchers at OpenAI (2022) trained small transformers on simple arithmetic tasks
            and found something striking: models would achieve near-perfect accuracy on training
            data, then appear to stall for a very long time - before suddenly jumping to
            perfect generalisation on unseen data. Like a light switch flipping on.
          </div>
          <div class="fact-footer">
            Foundational result, replicated across many architectures and tasks.
          </div>
        </article>

        <p class="para">
          Nanda et al. (2023) reverse-engineered exactly <em>why</em> this happens. They
          identified three distinct phases playing out beneath the surface:
        </p>

        <div class="card-stack">
          {#each grokkingPhases as item (item.title)}
            <article
              class="soft-card"
              style={accentStyle(item.color, "08", "22")}
            >
              <div class="soft-card-title">{item.title}</div>
              <div class="card-copy">{item.description}</div>
            </article>
          {/each}
        </div>

        <article
          class="fact-card"
          style={accentStyle(colors.rust, "08", "25")}
        >
          <div class="fact-title">Grokking is a phase transition - first-order or second-order</div>
          <div class="fact-copy">
            Rubin et al. (ICLR 2024) formalised grokking as a genuine phase transition in the
            physics sense. Depending on the model architecture and task, it can appear as either
            a first-order transition (sharp, discontinuous - the light-switch feel) or a
            second-order transition (gradual, continuous). The key insight is that it is always
            a phase transition, meaning the system moves between qualitatively distinct regimes.
          </div>
          <div class="fact-footer">
            We use the grokking event as our operational definition of P*(T): a model has
            "understood" its data when it grokkeds.
          </div>
        </article>

        <article
          class="fact-card"
          style={accentStyle(colors.sage, "08", "25")}
        >
          <div class="fact-title">Grokfast: 50x acceleration (Lee et al. 2024)</div>
          <div class="fact-copy">
            Gradient updates can be decomposed into fast-varying components (which drive
            memorisation) and slow-varying components (which drive generalisation). Grokfast
            amplifies the slow component. Result: grokking accelerates by more than 50x with
            only a few lines of code added to the training loop.
          </div>
          <div class="fact-footer">
            We use Grokfast in Phase 0 to make the phenomenon observable in hours rather than
            days.
          </div>
        </article>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>Finding 3 - Tiny Models Work - With the Right Data</h3>
        <p class="citation">Eldan & Li 2023 (TinyStories) - BabyLM 2025 (Co4)</p>

        <article
          class="fact-card"
          style={accentStyle(colors.teal, "08", "25")}
        >
          <div class="fact-title">TinyStories: sub-10M models can genuinely generalise</div>
          <div class="fact-copy">
            Microsoft's 2023 paper showed that models with fewer than 10 million parameters can
            produce fluent, consistent text with real reasoning - but only when the training
            corpus is carefully matched to the model's capacity. They used a synthetic dataset
            built from a ~1,500-word vocabulary. A 28M-parameter model in that study
            outperformed GPT-2-XL (1.5B parameters) on the same domain. Their ablations also
            revealed a consistent architectural pattern: depth matters more than width for
            reasoning and consistency, while width matters more for grammatical fluency.
          </div>
          <div class="fact-footer">
            Direct precedent for Phase 0. The depth-vs-width finding shapes our architecture
            choices.
          </div>
        </article>

        <article
          class="fact-card"
          style={accentStyle(colors.sage, "08", "25")}
        >
          <div class="fact-title">BabyLM 2025: 8M parameters outperforms 124M parameters</div>
          <div class="fact-copy">
            A biologically-inspired architecture called Co4 (single layer, 2 attention heads,
            8M parameters, O(N) compute) was trained for 2 epochs on 10M tokens. Compared
            against GPT-2 (124M parameters, 10 epochs of training): Co4 outperformed it on 5
            out of 7 zero-shot metrics and 6 out of 7 fine-tuning tasks. The gap is striking -
            architecture choice and data matching can more than compensate for a 15x difference
            in parameter count.
          </div>
          <div class="fact-footer">
            Key implication: at tiny scale, the architecture family matters enormously. We test
            all three viable candidates.
          </div>
        </article>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>Finding 4 - Data Quality Is a Multiplier - But It's Complicated</h3>
        <p class="citation">Phi-1 (Microsoft 2023) - Systematic study (arXiv 2025)</p>

        <article
          class="fact-card"
          style={accentStyle(colors.gold, "08", "25")}
        >
          <div class="fact-title">Phi-1: quality beats quantity</div>
          <div class="fact-copy">
            Microsoft's Phi-1 (1.3B parameters, 7B tokens of "textbook quality" data) matched
            models 10x its size on coding benchmarks. This was the first clear empirical
            measurement of a quality multiplier: one carefully written token can be worth many
            generic tokens in terms of what the model learns.
          </div>
        </article>

        <article
          class="fact-card"
          style={accentStyle(colors.plum, "08", "25")}
        >
          <div class="fact-title">2025 update: pure synthetic data is not automatically better</div>
          <div class="fact-copy">
            A 2025 systematic study on synthetic training data found that purely synthetic
            datasets do not reliably outperform CommonCrawl on their own. Optimal mixtures of
            high-quality synthetic and natural web text consistently beat either source alone.
            Textbook-style data used at high proportions can actually degrade performance. The
            quality multiplier is real - but it is mix-dependent, not a fixed number.
          </div>
          <div class="fact-footer">
            This shapes our sub-experiments: we test mixed formats, not just pure
            chain-of-thought.
          </div>
        </article>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>What Nobody Has Done - The Gaps We're Filling</h3>

        <div class="accordion-stack">
          {#each researchGaps as gap (gap.question)}
            <AccordionItem q={gap.question} a={gap.answer} color={tone(gap.color)} />
          {/each}
        </div>
      </section>
    {/if}

    {#if currentChapter === 2}
      <section class="chapter">
        <h2>Chapter 3 - The Experiment Plan</h2>

        <p class="lead">
          The experiment is structured in four phases that build on each other. Think of it as
          starting in a petri dish before scaling to a clinical trial.
        </p>

        <div class="phase-board">
          {#each phaseCards as item (item.phase)}
            <article class="phase-card" style={accentBorderStyle(item.color, "38")}>
              <div class="phase-name">{item.phase}</div>
              <div class="phase-subheading">{item.subheading}</div>
              <div class="phase-copy">{item.description}</div>
            </article>
          {/each}
        </div>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>How We Find P*(T) - Step by Step</h3>

        <div class="step-stack">
          <div class="step-row">
            <div class="step-number" style={accentSurfaceStyle(colors.teal, "16")}>
              1
            </div>
            <div>
              <div class="step-title">Build a fake mini-world</div>
              <div class="card-copy">
                We create a synthetic dataset - a fictional world with made-up names, places,
                and logical rules. This guarantees zero contamination: the model starts knowing
                absolutely nothing about this world. Everything it learns comes purely from our
                training text.
              </div>
            </div>
          </div>

          <div class="step-row">
            <div class="step-number" style={accentSurfaceStyle(colors.teal, "16")}>
              2
            </div>
            <div>
              <div class="step-title">Train models of different sizes on different amounts of data</div>
              <div class="card-copy">
                We train models from 10K to 10M parameters on varying amounts of data from our
                mini-world. Each (model size, data size) pair is a separate experiment. Imagine
                a grid: roughly 50+ runs, each taking minutes to a few hours on a single
                machine.
              </div>
            </div>
          </div>

          <div class="step-row">
            <div class="step-number" style={accentSurfaceStyle(colors.teal, "16")}>
              3
            </div>
            <div>
              <div class="step-title">Watch for the "click" - the grokking event</div>
              <div class="card-copy">
                For each run, we watch whether the model grokkeds - crosses the phase
                transition from memorisation to genuine understanding. We use Grokfast to
                accelerate this by up to 50x, making the phenomenon observable at small scale.
              </div>
            </div>
          </div>

          <div class="step-row">
            <div class="step-number" style={accentSurfaceStyle(colors.teal, "16")}>
              4
            </div>
            <div>
              <div class="step-title">Trace the boundary</div>
              <div class="card-copy">
                Some (P, T) cells grokk; others don't. The line separating them is our empirical
                measurement of P*(T). We trace that curve across the full grid.
              </div>
            </div>
          </div>

          <div class="step-row">
            <div class="step-number" style={accentSurfaceStyle(colors.teal, "16")}>
              5
            </div>
            <div>
              <div class="step-title">Fit the equation and recover the exponent delta</div>
              <div class="card-copy">
                With boundary points in hand, we fit the equation P*(T) = k x T^delta. The
                exponent delta is the key number - it tells us how fast the minimum brain size
                must grow as the dataset grows.
              </div>
            </div>
          </div>
        </div>

        <div class="callout" style={accentStyle(colors.slate, "0e", "2e")}>
          <div class="callout-title">Readout: What the exponent delta would mean</div>
          <div class="callout-copy">
            <strong class="accent-teal">delta &lt; 0.5:</strong> Data grows faster than the brain needs to. Very parameter-efficient.<br />
            <strong class="accent-gold">delta = 0.5:</strong> Balanced growth - consistent with Chinchilla at large scale.<br />
            <strong class="accent-rust">delta &gt; 0.5:</strong> Parameters must grow fast to keep up with data. Parameters are the bottleneck.<br /><br />
            The Banko-Brill (2001) conjecture suggests log-linear scaling in the small-data
            regime, implying delta &lt; 0.5 below 1M parameters, possibly transitioning upward at
            larger scales. <strong>Nobody has measured which regime governs sub-1M-param models.</strong>
          </div>
        </div>
      </section>
    {/if}

    {#if currentChapter === 3}
      <section class="chapter">
        <h2>Chapter 4 - The 10K Micro-Lab</h2>

        <p class="lead">
          Phase 0 is the ground-truth anchor for the entire framework. Everything at larger
          scale builds directly on findings here.
        </p>

        <div class="three-column-grid">
          {#each scaleCards as item (item.label)}
            <article class="mini-metric large" style={accentStyle(item.color, "0d", "30")}>
              <div class="mini-label larger">{item.label}</div>
              <div class="mini-note mono">{item.params} params</div>
              <div class="mini-note">{item.note}</div>
            </article>
          {/each}
        </div>

        <div class="analogy">
          <strong>Scale:</strong> A 10K parameter model is not a "small AI." It's a calculation
          that would have run on a pocket calculator in the 1970s. And yet - our hypothesis is
          that with precisely designed data, it can genuinely understand a small, well-defined
          world.
        </div>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>Architecture Options at 10K Parameters</h3>

        <p class="para">
          10,000 parameters is so tight that architecture choice becomes critical. TinyStories
          (2023) confirmed depth matters more than width for reasoning at small scale. BabyLM
          2025 showed non-transformer architectures can win significantly at tiny scales. We
          test all three viable options:
        </p>

        <div class="card-stack">
          {#each architectureOptions as item (item.name)}
            <article class="architecture-card" style={accentStyle(item.color, "06", "35")}>
              <div class="architecture-head">
                <span class="soft-card-title">{item.name}</span>
                <div class="architecture-meta">
                  <span class="shape">{item.shape}</span>
                  <Pill label={item.params} color={tone(item.color)} />
                </div>
              </div>

              <div class="two-column-grid compact">
                <div class="micro-copy accent-sage">+ {item.pro}</div>
                <div class="micro-copy accent-rust">- {item.con}</div>
              </div>

              <div class="architecture-footnote">-> {item.verdict}</div>
            </article>
          {/each}
        </div>

        <div class="callout" style={accentStyle(colors.slate, "0e", "2e")}>
          <div class="callout-title">Decision: We test all three viable architectures</div>
          <div class="callout-copy">
            Rather than guessing which is best, we train all three on identical data. Whichever
            one grokkeds first is the most parameter-efficient for relational reasoning at this
            scale. <strong>This comparison is itself a finding</strong> - directly relevant to
            the "given P=10K, what is the optimal design?" question.
          </div>
        </div>
      </section>
    {/if}

    {#if currentChapter === 4}
      <section class="chapter">
        <h2>Chapter 5 - What to Feed It - The Data Question</h2>

        <p class="lead">
          The format of the data might matter just as much as the quantity. This chapter covers
          both: what our training world looks like, and how we present it.
        </p>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>WorldKB-10K: Our Synthetic Mini-World</h3>

        <p class="para">
          We build a tiny fake world - "WorldKB-10K." It has made-up entities, made-up
          locations, and made-up logical rules. The model starts knowing absolutely nothing
          about it. Everything it learns comes purely from our training text.
        </p>

        <div class="analogy">
          <strong>Analogy:</strong> Think of it like creating a simple board game with its own
          geography, characters, and rules. The AI has to learn this game entirely from the
          instruction manual we write. We control every word in that manual.
        </div>

        <div class="stack-list">
          {#each worldLayers as layer (layer.layer)}
            <div class="stack-row with-pill">
              <div>
                <div class="stack-meta">
                  <span class="card-label" style={`color:${tone(layer.color)};`}>
                    {layer.layer} - {layer.name}
                  </span>
                  <Pill label={layer.tokens} color={tone(layer.color)} />
                </div>
                <div class="card-copy">{layer.description}</div>
              </div>
            </div>
          {/each}
        </div>

        <p class="para">
          Total: roughly 2,500 tokens - about a 4-page document. A human could read it in ten
          minutes. We want to know whether a 10,000-parameter model can truly
          <em>understand</em> it.
        </p>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>Same Content, Five Different Formats</h3>

        <p class="para">
          The key sub-experiment: we take identical knowledge and present it five different
          ways. Does the packaging change how much a tiny model can absorb?
        </p>

        <div class="card-stack">
          {#each formatOptions as item (item.code)}
            <article class="soft-card" style={accentStyle(item.color, "08", "22")}>
              <div class="format-head">
                <Pill label={item.code} color={tone(item.color)} />
                <span class="soft-card-title ink">{item.name}</span>
              </div>
              <div class="format-example">{item.example}</div>
              <div class="card-copy">{item.note}</div>
            </article>
          {/each}
        </div>

        <div class="callout" style={accentStyle(colors.teal, "0e", "2e")}>
          <div class="callout-title">Prediction: The key prediction</div>
          <div class="callout-copy">
            Format F3 (Chain-of-Thought) should allow the 10K-param model to assimilate the
            most data per token - because when the reasoning is written out, the model doesn't
            need to store the reasoning in its weights. This frees up capacity for other
            work.<br /><br />
            Important nuance from 2025 research: pure chain-of-thought data may not dominate. A
            mixed format (F5) is our actual top candidate - the quality multiplier is
            mix-dependent, not a fixed property of any single format.
          </div>
        </div>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>Data Repetition: How Many Times?</h3>

        <p class="para">
          If our WorldKB dataset is only 2,500 tokens but we train for many steps, we repeat
          the data. The literature says repetition past ~4 epochs yields diminishing returns for
          large models (Muennighoff et al. 2024). But at tiny scale, repetition may behave
          differently - like how children need to hear the same story many times to internalise
          it.
        </p>

        <p class="para">
          We test 1x, 2x, 4x, 8x, 16x, 32x, and 64x repetitions. Does grokking arrive earlier
          in unique-token terms with more repetition? Or is there a floor of unique tokens that
          no amount of repetition can substitute for? <strong>This sub-experiment has no
          published answer.</strong>
        </p>
      </section>
    {/if}

    {#if currentChapter === 5}
      <section class="chapter">
        <h2>Chapter 6 - How We Know If It Worked</h2>

        <p class="lead">
          "The AI learned it" is not enough. We need specific, measurable tests that
          distinguish genuine understanding from sophisticated memorisation.
        </p>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>The Assimilation Score - Our Report Card</h3>

        <div class="card-stack">
          {#each assimilationTests as item (item.label)}
            <article class="architecture-card" style={accentStyle(item.color, "05", "28")}>
              <div class="assimilation-head">
                <div class="format-head">
                  <Pill label={item.label} color={tone(item.color)} />
                  <span class="soft-card-title ink">{item.name}</span>
                </div>
                <span class="weight">{item.weight}</span>
              </div>
              <div class="card-copy">{item.description}</div>
            </article>
          {/each}
        </div>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>Critical Controls</h3>

        <p class="para">
          A 2025 survey of 51 scaling law papers found their results were wildly inconsistent -
          often due to small implementation details. We address each known issue explicitly:
        </p>

        <div class="stack-list">
          {#each criticalControls as item (item.title)}
            <div class="stack-row warning-row">
              <span class="warning-mark" style={`color:${tone(item.color)};`}>!</span>
              <div>
                <div class="stack-title">{item.title}</div>
                <div class="card-copy muted">{item.description}</div>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    {#if currentChapter === 6}
      <section class="chapter">
        <h2>Chapter 7 - The Path to a Formal Proof</h2>

        <p class="lead">
          The experiment is designed so that empirical results can be elevated into a theorem -
          a proven mathematical statement you can actually use. Here's the five-step path.
        </p>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <div class="step-stack">
          <div class="step-row">
            <div class="step-number" style={accentSurfaceStyle(colors.teal, "16")}>
              1
            </div>
            <div>
              <div class="step-title">Establish the information-theoretic floor</div>
              <div class="card-copy">
                There is a hard mathematical minimum on parameters, derived from information
                theory. A model can only store a certain number of "bits" in its weights. If
                the dataset contains more unique information than the model can hold,
                generalisation is impossible - regardless of how long you train. We calculate
                this floor first. It is the absolute lower bound.
              </div>
            </div>
          </div>

          <div class="step-row">
            <div class="step-number" style={accentSurfaceStyle(colors.teal, "16")}>
              2
            </div>
            <div>
              <div class="step-title">Measure how far real models sit above that floor</div>
              <div class="card-copy">
                Real models are always less efficient than the mathematical ideal - they need
                more parameters than the theoretical minimum. We call this ratio the
                "architecture overhead Phi." Phase 3 measures it for each architecture family.
                If Phi is small and stable, the bound is practically tight. If it grows with
                scale, the bound is loose. Either finding is valuable.
              </div>
            </div>
          </div>

          <div class="step-row">
            <div class="step-number" style={accentSurfaceStyle(colors.teal, "16")}>
              3
            </div>
            <div>
              <div class="step-title">Formalise the quality multiplier</div>
              <div class="card-copy">
                Phase 2 gives us the effective token equivalence: how much is one token of
                Chain-of-Thought data worth compared to one plain-fact token? Once measured, we
                write the substitution: P*(T, Q) = P*(T x mu(Q)). Quality collapses into a known
                multiplier on the token count.
              </div>
            </div>
          </div>

          <div class="step-row">
            <div class="step-number" style={accentSurfaceStyle(colors.teal, "16")}>
              4
            </div>
            <div>
              <div class="step-title">Map the grokking phase boundary</div>
              <div class="card-copy">
                Using Phase 0 and Phase 1 results, we trace the exact boundary in (P, T) space
                between "model will grokk" and "model will only memorise." We fit
                P*(T) = k x T^delta to the boundary points and recover delta empirically.
              </div>
            </div>
          </div>

          <div class="step-row">
            <div class="step-number" style={accentSurfaceStyle(colors.teal, "16")}>
              5
            </div>
            <div>
              <div class="step-title">Write the theorem</div>
              <div class="card-copy">
                Combine all steps into one formal statement:
              </div>
              <div class="theorem-box">
                "If a model has at least P_min(T, Q) parameters, trained with weight decay
                WD &gt;= WD*(P, T), then it will achieve full assimilation (Assimilation Score
                &gt;= tau) with high probability."
              </div>
              <div class="card-copy">
                Plug in your dataset size and quality level. Out comes the minimum brain size.
                That is the goal.
              </div>
            </div>
          </div>
        </div>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>The Open Questions - Genuine Unknowns</h3>

        <div class="accordion-stack">
          {#each openQuestions as item (item.question)}
            <AccordionItem q={item.question} a={item.answer} color={tone(item.color)} />
          {/each}
        </div>

        <div class="divider" aria-hidden="true">
          <span></span>
          <small>...</small>
          <span></span>
        </div>

        <h3>Why This Matters</h3>

        <div class="two-column-grid">
          {#each whyItMatters as item (item.title)}
            <article class="soft-card" style={accentStyle(item.color, "08", "28")}>
              <div class="soft-card-title">{item.title}</div>
              <div class="card-copy">{item.body}</div>
            </article>
          {/each}
        </div>

        <div class="callout" style={accentStyle(colors.sage, "0e", "2e")}>
          <div class="callout-title">Bottom line: Why This Matters</div>
          <div class="callout-copy">
            We are trying to answer one of the most fundamental open questions in AI:
            <strong> what is the minimum amount of intelligence required to truly understand a given body of knowledge?</strong>
            <br /><br />
            We start with 10,000 parameters, a 4-page synthetic world, and an operational
            definition of understanding grounded in phase-transition physics. The literature is
            clear on what is known. Everything ahead of us is new.
          </div>
        </div>
      </section>
    {/if}

    <nav class="chapter-footer" aria-label="Chapter navigation">
      <div class="chapter-progress">
        Chapter {currentChapter + 1} of {chapters.length}
      </div>

      <div class="chapter-footer-actions">
        <button
          type="button"
          class="chapter-nav-button"
          disabled={currentChapter === 0}
          onclick={() => setChapter(currentChapter - 1)}
        >
          Previous
        </button>

        <button
          type="button"
          class="chapter-nav-button"
          disabled={currentChapter === chapters.length - 1}
          onclick={() => setChapter(currentChapter + 1)}
        >
          Next
        </button>
      </div>
    </nav>
  </div>
</div>

<style>
  .guide-shell {
    --ink-color: #1c1510;
    --body-color: #3a3028;
    --muted-color: #7a6a58;
    --dim-color: #b0a090;
    --rule-color: #ddd0bc;
    --warm-color: #f8f4ee;
    --paper-color: #fffcf8;
    --bg-color: #f4f0e8;
    --rust-accent: #b83a12;
    --teal-accent: #1a5e5e;
    --gold-accent: #8a6000;
    --sage-accent: #3d6644;
    --slate-accent: #2e4060;
    --plum-accent: #62305a;
    min-height: 100vh;
    padding: clamp(1.1rem, 2.6vw, 1.55rem) 1rem 3.25rem;
    background: var(--bg-color);
    color: var(--body-color);
  }

  :global(html.dark) .guide-shell {
    --ink-color: #faf3eb;
    --body-color: #eadfd3;
    --muted-color: #d4c0b2;
    --dim-color: #a99586;
    --rule-color: #463931;
    --warm-color: #1d1714;
    --paper-color: #16110f;
    --bg-color: #0e0a08;
    --rust-accent: #ff9d73;
    --teal-accent: #68c6c1;
    --gold-accent: #e2bf68;
    --sage-accent: #84c48c;
    --slate-accent: #90addc;
    --plum-accent: #c998c3;
    background: var(--bg-color);
  }

  .guide {
    width: min(48.75rem, 100%);
    margin: 0 auto;
  }

  .masthead {
    margin-bottom: 2rem;
    padding-bottom: 1.4rem;
    text-align: center;
    border-bottom: 2.5px solid var(--ink-color);
  }

  .archive-link {
    display: inline-flex;
    align-items: center;
    margin-bottom: 0.85rem;
    color: var(--muted-color);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0 0 0.8rem;
    color: var(--ink-color);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.2;
  }

  h1 span {
    color: var(--rust-accent);
  }

  .masthead-copy {
    margin: 0;
    color: var(--muted-color);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 0.95rem;
    line-height: 1.75;
  }

  .pill-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.35rem;
    margin-top: 0.95rem;
  }

  .chapter-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem;
    margin-bottom: 1.85rem;
  }

  .chapter-button {
    border: 1px solid var(--rule-color);
    border-radius: 999px;
    padding: 0.45rem 0.9rem;
    background: transparent;
    color: var(--muted-color);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 0.82rem;
    cursor: pointer;
    transition:
      background-color 150ms ease,
      color 150ms ease,
      border-color 150ms ease;
  }

  .chapter-button:hover,
  .chapter-button:focus-visible {
    outline: none;
    color: var(--ink-color);
    border-color: var(--ink-color);
  }

  .chapter-button.active {
    background: var(--ink-color);
    color: var(--paper-color);
    border-color: var(--ink-color);
  }

  .chapter h2 {
    margin: 0 0 1rem;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid var(--rule-color);
    color: var(--ink-color);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.4rem;
  }

  .chapter h3 {
    margin: 0 0 0.9rem;
    color: var(--ink-color);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.08rem;
  }

  .lead,
  .para,
  .card-copy,
  .callout-copy,
  .fact-copy,
  .fact-footer,
  .mini-note,
  .phase-copy,
  .theorem-box,
  .weight,
  .citation,
  .format-example {
    font-family: Georgia, "Times New Roman", serif;
  }

  .lead {
    margin: 1rem 0 0.2rem;
    color: var(--body-color);
    font-size: 0.98rem;
    line-height: 1.85;
  }

  .para {
    margin: 0.75rem 0;
    color: var(--body-color);
    font-size: 0.93rem;
    line-height: 1.85;
  }

  .analogy {
    margin: 1rem 0;
    padding: 0.95rem 1.15rem;
    border-left: 4px solid var(--gold-accent);
    border-radius: 0 0.75rem 0.75rem 0;
    background: var(--warm-color);
    color: var(--body-color);
    font-size: 0.93rem;
    line-height: 1.8;
    font-style: italic;
    font-family: Georgia, "Times New Roman", serif;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin: 1.8rem 0;
  }

  .divider span {
    flex: 1;
    height: 1px;
    background: var(--rule-color);
  }

  .divider small {
    color: var(--dim-color);
    font-size: 0.72rem;
    letter-spacing: 0.4em;
  }

  .two-column-grid,
  .three-column-grid {
    display: grid;
    gap: 0.85rem;
  }

  .two-column-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .two-column-grid.compact {
    gap: 0.55rem;
  }

  .three-column-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0.9rem 0 0;
  }

  .accent-card,
  .soft-card,
  .mini-metric,
  .fact-card,
  .callout,
  .phase-card,
  .architecture-card {
    background: var(--accent-surface, var(--paper-color));
    border: 1px solid var(--accent-border, var(--rule-color));
    border-radius: 0.9rem;
  }

  .accent-card {
    padding: 1rem;
  }

  .card-label {
    margin-bottom: 0.5rem;
    color: var(--accent, var(--muted-color));
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .card-quote {
    margin-bottom: 0.65rem;
    color: var(--ink-color);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 0.98rem;
    font-weight: 700;
    line-height: 1.4;
    font-style: italic;
  }

  .card-copy {
    color: var(--body-color);
    font-size: 0.9rem;
    line-height: 1.75;
  }

  .callout {
    margin: 1rem 0;
    padding: 1rem 1.2rem;
  }

  .callout-title {
    margin-bottom: 0.55rem;
    color: var(--accent, var(--ink-color));
    font-family: Georgia, "Times New Roman", serif;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .callout-copy {
    color: var(--body-color);
    font-size: 0.9rem;
    line-height: 1.8;
  }

  .stack-list,
  .card-stack,
  .accordion-stack,
  .step-stack {
    display: grid;
    gap: 0.75rem;
  }

  .stack-row,
  .step-row {
    display: flex;
    gap: 0.9rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--rule-color);
  }

  .stack-row.with-pill:last-child,
  .step-row:last-child {
    border-bottom: none;
  }

  .number-badge,
  .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    border: 2px solid var(--accent);
    background: var(--accent-surface);
    color: var(--accent);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .step-number {
    width: 2.3rem;
    height: 2.3rem;
    font-size: 0.88rem;
  }

  .stack-title,
  .step-title,
  .soft-card-title,
  .fact-title,
  .phase-subheading,
  .mini-label,
  .mini-value {
    color: var(--ink-color);
    font-family: Georgia, "Times New Roman", serif;
  }

  .stack-title,
  .step-title,
  .soft-card-title,
  .fact-title {
    margin-bottom: 0.35rem;
    font-size: 0.95rem;
    font-weight: 700;
  }

  .muted,
  .citation,
  .mini-note,
  .weight,
  .shape {
    color: var(--muted-color);
  }

  .citation {
    margin: -0.35rem 0 0.95rem;
    font-size: 0.77rem;
    font-style: italic;
  }

  .fact-card {
    padding: 0.9rem 1rem;
    margin-bottom: 0.75rem;
  }

  .fact-title {
    color: var(--accent, var(--ink-color));
  }

  .fact-copy {
    color: var(--body-color);
    font-size: 0.9rem;
    line-height: 1.75;
  }

  .fact-footer,
  .architecture-footnote {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--rule-color);
    color: var(--muted-color);
    font-size: 0.82rem;
    font-style: italic;
  }

  .soft-card {
    padding: 0.9rem 1rem;
  }

  .mini-metric {
    padding: 0.85rem;
    text-align: center;
  }

  .mini-metric.large {
    padding: 1rem;
  }

  .mini-label {
    margin-bottom: 0.3rem;
    color: var(--accent, var(--ink-color));
    font-size: 0.82rem;
    font-weight: 700;
  }

  .mini-label.larger {
    font-size: 0.9rem;
  }

  .mini-value {
    margin-bottom: 0.35rem;
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.95rem;
    font-weight: 700;
  }

  .mono,
  .shape,
  .phase-name,
  .weight {
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
  }

  .phase-board {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.75rem;
    padding: 1rem;
    border: 1px solid var(--rule-color);
    border-radius: 1rem;
    background: var(--warm-color);
    margin-top: 1.2rem;
  }

  .phase-card {
    padding: 0.9rem;
    background: var(--paper-color);
  }

  .phase-name {
    color: var(--accent, var(--ink-color));
    font-size: 0.78rem;
    font-weight: 700;
  }

  .phase-subheading {
    margin: 0.35rem 0;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .phase-copy {
    font-size: 0.78rem;
    line-height: 1.6;
  }

  .architecture-card {
    padding: 1rem;
  }

  .architecture-head,
  .assimilation-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.65rem;
  }

  .architecture-meta,
  .format-head {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    flex-wrap: wrap;
  }

  .shape,
  .weight {
    font-size: 0.72rem;
    letter-spacing: 0.04em;
  }

  .micro-copy {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 0.82rem;
  }

  .format-example {
    margin-bottom: 0.4rem;
    color: var(--muted-color);
    font-size: 0.85rem;
    font-style: italic;
  }

  .stack-meta {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    flex-wrap: wrap;
    margin-bottom: 0.35rem;
  }

  .warning-row {
    align-items: flex-start;
  }

  .warning-mark {
    flex-shrink: 0;
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 1rem;
    font-weight: 700;
  }

  .theorem-box {
    margin: 0.85rem 0;
    padding: 0.95rem 1rem;
    border: 1px solid var(--rule-color);
    border-radius: 0.8rem;
    background: var(--warm-color);
    color: var(--ink-color);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.82rem;
    line-height: 1.75;
  }

  .accent-rust {
    color: var(--rust-accent);
  }

  .accent-teal {
    color: var(--teal-accent);
  }

  .accent-gold {
    color: var(--gold-accent);
  }

  .accent-sage {
    color: var(--sage-accent);
  }

  .ink {
    color: var(--ink-color);
  }

  .chapter-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    margin-top: 2.75rem;
    padding-top: 1.2rem;
    border-top: 2.5px solid var(--ink-color);
  }

  .chapter-footer-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.8rem;
    flex: 0 0 auto;
  }

  .chapter-nav-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--rule-color);
    border-radius: 999px;
    padding: 0.75rem 1.15rem;
    background: transparent;
    color: var(--ink-color);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background-color 150ms ease,
      border-color 150ms ease,
      color 150ms ease,
      transform 150ms ease;
  }

  .chapter-nav-button:hover,
  .chapter-nav-button:focus-visible {
    outline: none;
    background: rgb(184 58 18 / 0.1);
    border-color: rgb(184 58 18 / 0.32);
    transform: translateY(-1px);
  }

  :global(html.dark) .chapter-nav-button:hover,
  :global(html.dark) .chapter-nav-button:focus-visible {
    background: rgb(236 138 95 / 0.14);
    border-color: rgb(236 138 95 / 0.34);
  }

  .chapter-nav-button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  .chapter-progress {
    color: var(--muted-color);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.74rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .archive-link:hover,
  .archive-link:focus-visible {
    outline: none;
    color: var(--ink-color);
  }

  @media (max-width: 860px) {
    .phase-board {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 720px) {
    .two-column-grid,
    .three-column-grid,
    .phase-board {
      grid-template-columns: minmax(0, 1fr);
    }

    .architecture-head,
    .assimilation-head {
      flex-direction: column;
      align-items: flex-start;
    }

    .chapter-footer {
      flex-direction: column;
      align-items: stretch;
      gap: 0.9rem;
    }

    .chapter-progress {
      text-align: center;
    }

    .chapter-footer-actions {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.65rem;
    }

    .chapter-nav-button {
      width: 100%;
      padding-inline: 0.9rem;
    }
  }

  @media (max-width: 560px) {
    .guide-shell {
      padding-top: 1rem;
      padding-inline: 0.85rem;
      padding-bottom: 2.5rem;
    }

    .chapter-button {
      width: 100%;
      text-align: center;
    }

    .stack-row,
    .step-row {
      gap: 0.75rem;
    }
  }
</style>
