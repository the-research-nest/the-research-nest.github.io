<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Research Nest</title>
  <meta
    name="description"
    content="The Research Nest is an independent research forum exploring compact intelligence, world models, and efficient learning."
  />
  <script>
    try {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      // localStorage may be unavailable during startup
    }
  </script>
</svelte:head>

<script lang="ts">
  import MediumIcon from "$lib/components/icons/MediumIcon.svelte";
  import YoutubeIcon from "$lib/components/icons/YoutubeIcon.svelte";
  import { page } from "$app/state";
  import { FilePenLine, House, Menu, MoonStar, SunMedium } from "@lucide/svelte";
  import { onMount } from "svelte";
  import "../app.css";

  const internalLinks = [
    { href: "/research", label: "Research" }
  ];

  const externalLinks = [
    {
      href: "https://medium.com/the-research-nest/trn-guest-blogging-2817c4ca31d3",
      label: "Write",
      icon: FilePenLine
    },
    {
      href: "https://medium.com/the-research-nest",
      label: "Medium",
      icon: MediumIcon
    },
    {
      href: "https://www.youtube.com/@theresearchnest",
      label: "YouTube",
      icon: YoutubeIcon
    }
  ];

  let { children } = $props();

  const hideHeader = $derived(page.url.pathname.startsWith("/research"));
  const isResearchArticle = $derived(page.url.pathname !== "/research" && page.url.pathname.startsWith("/research/"));

  let isDark = $state(false);
  let isMenuOpen = $state(false);
  let mobileMenu = $state<HTMLDetailsElement | null>(null);

  function initializeTheme() {
    try {
      if (typeof window === "undefined") {
        return;
      }

      const storedTheme = localStorage.getItem("theme");
      const prefersDark =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

      isDark = storedTheme === "dark" || (!storedTheme && prefersDark);
      document.documentElement.classList.toggle("dark", isDark);
    } catch (error) {
      isDark =
        typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    }
  }

  function closeMobileMenu() {
    if (mobileMenu?.open) {
      mobileMenu.open = false;
    }

    isMenuOpen = false;
  }

  function toggleTheme() {
    if (typeof document === "undefined") {
      return;
    }

    isDark = !isDark;
    document.documentElement.classList.toggle("dark", isDark);

    try {
      localStorage.theme = isDark ? "dark" : "light";
    } catch (error) {
      // localStorage may be unavailable in some browsers
    }
  }

  onMount(() => {
    initializeTheme();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenu?.open &&
        event.target instanceof Node &&
        !mobileMenu.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<div class="app-shell">
  {#if hideHeader}
    <a href="/" class="corner-control corner-left" aria-label="Return home">
      <House size={18} aria-hidden="true" />
    </a>

    <button
      type="button"
      class="corner-control corner-right"
      onclick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {#if isDark}
        <SunMedium size={18} aria-hidden="true" />
      {:else}
        <MoonStar size={18} aria-hidden="true" />
      {/if}
    </button>
  {/if}

  {#if !hideHeader}
    <header class="site-header">
      <div class="site-bar">
        <a href="/" class="brand" aria-label="The Research Nest home">
          The Research Nest
        </a>

        <nav class="desktop-nav" aria-label="Primary">
          <div class="tab-links">
            {#each internalLinks as link}
              <a
                href={link.href}
                class:active={page.url.pathname === link.href}
                class="nav-link"
                aria-current={page.url.pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </a>
            {/each}
          </div>

          <div class="icon-links" aria-label="External links">
            {#each externalLinks as link}
              {@const Icon = link.icon}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                class="icon-button"
                aria-label={link.label}
                title={link.label}
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            {/each}

            <button
              type="button"
              class="icon-button"
              onclick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {#if isDark}
                <SunMedium size={17} aria-hidden="true" />
              {:else}
                <MoonStar size={17} aria-hidden="true" />
              {/if}
            </button>
          </div>
        </nav>

        <div class="mobile-controls">
          <button
            type="button"
            class="icon-button"
            onclick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {#if isDark}
              <SunMedium size={17} aria-hidden="true" />
            {:else}
              <MoonStar size={17} aria-hidden="true" />
            {/if}
          </button>

          <details
            bind:this={mobileMenu}
            class="mobile-menu"
            ontoggle={() => {
              isMenuOpen = mobileMenu?.open ?? false;
            }}
          >
            <summary aria-expanded={isMenuOpen} aria-controls="mobile-menu-panel">
              <Menu size={17} aria-hidden="true" />
              <span class="sr-only">Toggle navigation menu</span>
            </summary>

            <div id="mobile-menu-panel" class="mobile-panel">
              <div class="mobile-tabs">
                {#each internalLinks as link}
                  <a
                    href={link.href}
                    class:active={page.url.pathname === link.href}
                    class="mobile-link"
                    aria-current={page.url.pathname === link.href ? "page" : undefined}
                    onclick={closeMobileMenu}
                  >
                    {link.label}
                  </a>
                {/each}
              </div>

              <div class="mobile-divider"></div>

              <div class="mobile-icons">
                {#each externalLinks as link}
                  {@const Icon = link.icon}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mobile-icon-link"
                    onclick={closeMobileMenu}
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span>{link.label}</span>
                  </a>
                {/each}
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  {/if}

  <main
    class="app-main"
    class:research-main={hideHeader}
    class:research-article-main={isResearchArticle}
  >
    {@render children?.()}
  </main>
</div>

<style>
  :global(:root) {
    --shell-bg: #f4efe7;
    --shell-panel: #fffbf6;
    --shell-border: #d9ccb9;
    --shell-text: #1c1510;
    --shell-muted: #6a5b4f;
    --shell-soft: #f1e7da;
    --shell-active: #ece0d0;
    --shell-group: rgb(255 251 246 / 0.78);
    --shell-nav-hover: rgb(28 21 16 / 0.06);
    --shell-nav-active: rgb(28 21 16 / 0.1);
    --research-article-bg: #f4f0e8;
  }

  :global(html.dark) {
    --shell-bg: #110d0b;
    --shell-panel: #171210;
    --shell-border: #4a3e36;
    --shell-text: #f7eee5;
    --shell-muted: #cfbcab;
    --shell-soft: #231b18;
    --shell-active: #2f241f;
    --shell-group: rgb(23 18 16 / 0.9);
    --shell-nav-hover: rgb(247 238 229 / 0.08);
    --shell-nav-active: rgb(247 238 229 / 0.14);
    --research-article-bg: #0e0a08;
  }

  .app-shell {
    min-height: 100vh;
    background: var(--shell-bg);
    color: var(--shell-text);
    transition:
      background-color 180ms ease,
      color 180ms ease;
  }

  .site-header {
    width: 100%;
    background: transparent;
  }

  .site-bar {
    width: min(1080px, calc(100% - 2rem));
    margin: 0 auto;
    min-height: 4.3rem;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem;
    padding-top: 0.7rem;
  }

  .brand {
    color: var(--shell-text);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.06rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }

  .tab-links {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .nav-link {
    border-radius: 999px;
    padding: 0.45rem 0.72rem;
    color: var(--shell-muted);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    transition:
      background-color 160ms ease,
      color 160ms ease;
  }

  .nav-link:hover,
  .nav-link:focus-visible {
    background: var(--shell-nav-hover);
    color: var(--shell-text);
    outline: none;
  }

  .nav-link.active {
    background: var(--shell-nav-active);
    color: var(--shell-text);
  }

  .icon-links {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  .icon-button,
  .mobile-menu summary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.3rem;
    height: 2.3rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--shell-muted);
    cursor: pointer;
    transition:
      background-color 160ms ease,
      color 160ms ease;
  }

  .icon-button:hover,
  .icon-button:focus-visible,
  .mobile-menu summary:hover,
  .mobile-menu summary:focus-visible {
    background: var(--shell-nav-hover);
    color: var(--shell-text);
    outline: none;
  }

  .corner-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.55rem;
    height: 2.55rem;
    border: 1px solid var(--shell-border);
    border-radius: 999px;
    background: transparent;
    color: var(--shell-text);
    cursor: pointer;
    transition:
      background-color 160ms ease,
      border-color 160ms ease,
      color 160ms ease;
  }

  .corner-control:hover,
  .corner-control:focus-visible {
    background: var(--shell-soft);
    outline: none;
  }

  .mobile-controls {
    display: none;
    align-items: center;
    justify-content: flex-end;
    gap: 0.55rem;
  }

  .mobile-menu {
    position: relative;
  }

  .mobile-menu summary {
    list-style: none;
  }

  .mobile-menu summary::-webkit-details-marker {
    display: none;
  }

  .mobile-panel {
    position: absolute;
    right: 0;
    top: calc(100% + 0.7rem);
    width: min(17rem, calc(100vw - 2rem));
    padding: 0.9rem;
    border: 1px solid var(--shell-border);
    border-radius: 1rem;
    background: var(--shell-panel);
  }

  .mobile-tabs {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .mobile-link {
    border-radius: 0.75rem;
    padding: 0.75rem 0.85rem;
    color: var(--shell-muted);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .mobile-link.active,
  .mobile-link:hover,
  .mobile-link:focus-visible {
    background: var(--shell-soft);
    color: var(--shell-text);
    outline: none;
  }

  .mobile-divider {
    height: 1px;
    margin: 0.8rem 0;
    background: var(--shell-border);
  }

  .mobile-icons {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .mobile-icon-link {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    border-radius: 0.75rem;
    padding: 0.75rem 0.85rem;
    color: var(--shell-muted);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .mobile-icon-link:hover,
  .mobile-icon-link:focus-visible {
    background: var(--shell-soft);
    color: var(--shell-text);
    outline: none;
  }

  .corner-control {
    position: fixed;
    top: 0.95rem;
    z-index: 40;
    background: var(--shell-group);
  }

  .corner-left {
    left: 0.95rem;
  }

  .corner-right {
    right: 0.95rem;
  }

  .app-main {
    width: 100%;
  }

  .app-main.research-article-main {
    background: var(--research-article-bg);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 900px) {
    .desktop-nav {
      display: none;
    }

    .site-bar {
      grid-template-columns: auto 1fr;
    }

    .mobile-controls {
      display: inline-flex;
    }
  }

  @media (max-width: 640px) {
    .app-main.research-main {
      padding-top: 3.1rem;
    }

    .site-bar {
      width: min(100%, calc(100% - 1rem));
      min-height: 4rem;
      padding-top: 0.45rem;
    }

    .brand {
      font-size: 0.94rem;
    }

    .icon-button,
    .mobile-menu summary {
      width: 2.15rem;
      height: 2.15rem;
    }

    .corner-control {
      top: 0.8rem;
    }

    .corner-left {
      left: 0.8rem;
    }

    .corner-right {
      right: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .app-main.research-main {
      padding-top: 3rem;
    }

    .corner-control {
      width: 2rem;
      height: 2rem;
      top: 0.65rem;
    }

    .corner-left {
      left: 0.65rem;
    }

    .corner-right {
      right: 0.65rem;
    }
  }
</style>
