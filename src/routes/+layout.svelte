<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Research Nest — an indie, community-powered research lab</title>
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
    } catch (e) {
      // localStorage may be unavailable — ignore
    }
  </script>
</svelte:head>

<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";

  // Runes-mode props/state (kept as-is)
  let { children } = $props();

  // Guard document access for SSR — compute initial safely
  const _initialDark = (typeof document !== "undefined") ? document.documentElement.classList.contains("dark") : false;
  let isDark = $state(_initialDark);

  // Function to safely check and set theme based on preference/storage
  function initializeTheme() {
    try {
      // guard window/localStorage for non-browser environments
      if (typeof window === "undefined") {
        isDark = _initialDark;
        return;
      }

      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.classList.add("dark");
        isDark = true;
      } else {
        document.documentElement.classList.remove("dark");
        isDark = false;
      }
    } catch (e) {
      // Fallback if localStorage or window.matchMedia is unavailable
      isDark = (typeof document !== "undefined") && document.documentElement.classList.contains("dark");
    }
  }

  onMount(() => {
    // Re-run initialization to catch any state changes missed by the FOUC script
    initializeTheme();

    // Close mobile menu on outside click
    const handleClickOutside = (e: any) => {
      const details = document.querySelector("details");
      if (details && details.hasAttribute("open") && !details.contains(e.target)) {
        details.removeAttribute("open");
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  // Simplified toggle function using Svelte Runes state (kept logic intact)
  function toggleTheme() {
    const html = document.documentElement;

    // Toggle the state first
    isDark = !isDark;

    // Update HTML class and localStorage based on the new state
    if (isDark) {
      html.classList.add("dark");
      try { localStorage.theme = "dark"; } catch (e) {}
    } else {
      html.classList.remove("dark");
      try { localStorage.theme = "light"; } catch (e) {}
    }
  }

  // Mobile menu open state for improved accessibility (kept)
  let isMenuOpen = $state(false);
  // removed unused toggleMenu() to avoid unused-code warnings
</script>

<div class="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-mono antialiased min-h-screen flex flex-col transition-colors duration-300 selection:bg-amber-200 selection:text-stone-900">
  <header class="w-full border-b border-stone-200 dark:border-stone-800 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <h1 class="text-base sm:text-lg font-bold tracking-tight uppercase select-none">
        The Research Nest
      </h1>

      <nav class="flex items-center gap-4 sm:gap-6" aria-label="Main Navigation">
        <div class="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a
            href="https://medium.com/the-research-nest/trn-guest-blogging-2817c4ca31d3"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-amber-700 dark:hover:text-amber-400 hover:underline transition-all"
          >
            Write
          </a>
          <a
            href="https://medium.com/the-research-nest"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-amber-700 dark:hover:text-amber-400 hover:underline transition-all"
          >
            Medium
          </a>
          <a
            href="https://www.youtube.com/@theresearchnest"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-amber-700 dark:hover:text-amber-400 hover:underline transition-all"
          >
            YouTube
          </a>
        </div>

        <button
          onclick={toggleTheme}
          class="text-xs font-bold border border-stone-300 dark:border-stone-700 px-2.5 py-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors duration-200"
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? '[ LIGHT ]' : '[ DARK ]'}
        </button>

        <details
          class="md:hidden relative"
          ontoggle={() => isMenuOpen = (document.querySelector('details')?.hasAttribute('open') ?? false)}
        >
          <summary
            class="cursor-pointer px-3 py-1 border border-transparent hover:border-stone-300 dark:hover:border-stone-700 transition-colors select-none"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-content"
          >
            <span class="text-sm font-bold uppercase">Menu</span>
          </summary>

          <div
            id="mobile-menu-content"
            class="absolute right-0 top-full mt-2 w-48 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-md p-3 flex flex-col space-y-2 z-50"
          >
            <a
              href="https://medium.com/the-research-nest/trn-guest-blogging-2817c4ca31d3"
              target="_blank"
              rel="noopener noreferrer"
              class="block text-sm hover:text-amber-700 dark:hover:text-amber-400"
            >
              Write
            </a>
            <a
              href="https://medium.com/the-research-nest"
              target="_blank"
              rel="noopener noreferrer"
              class="block text-sm hover:text-amber-700 dark:hover:text-amber-400"
            >
              Medium
            </a>
            <a
              href="https://www.youtube.com/@theresearchnest"
              target="_blank"
              rel="noopener noreferrer"
              class="block text-sm hover:text-amber-700 dark:hover:text-amber-400"
            >
              YouTube
            </a>
          </div>
        </details>
      </nav>
    </div>
  </header>

  <main class="grow w-full">
    {@render children?.()}
  </main>
</div>

<style>
  :global(details > summary) { list-style: none; }
  :global(details > summary::-webkit-details-marker) { display: none; }
  :global(details[open] summary ~ div) { animation: fadeIn 0.12s ease-in-out; }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-6px); }
    100% { opacity: 1; transform: translateY(0); }
  }
</style>
