<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Research Nest - an indie community powered research lab</title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="The Research Nest - Research Community Platform">
    <meta name="description" content="The Research Nest is a community platform for researchers, academics, and knowledge enthusiasts to share insights, collaborate, and explore research topics.">
    <meta name="keywords" content="research, academic writing, research community, academic collaboration, research platform">
    <meta name="author" content="The Research Nest">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://the-research-nest.github.io/">
    <meta property="og:title" content="The Research Nest - Research Community Platform">
    <meta property="og:description" content="The Research Nest is a community platform for researchers, academics, and knowledge enthusiasts to share insights, collaborate, and explore research topics.">
    <!-- <meta property="og:image" content="[Your OG Image URL]"> -->

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://the-research-nest.github.io/">
    <meta property="twitter:title" content="The Research Nest - Research Community Platform">
    <meta property="twitter:description" content="The Research Nest is a community platform for researchers, academics, and knowledge enthusiasts to share insights, collaborate, and explore research topics.">
    <!-- <meta property="twitter:image" content="[Your Twitter Card Image URL]"> -->

    <!-- Favicon -->
    <!-- <link rel="icon" type="image/x-icon" href="/favicon.ico"> -->
    <link rel="canonical" href="https://the-research-nest.github.io/">
    <script>
        // Prevent flash of unstyled content
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</svelte:head>

<script lang="ts">
    import "../app.css"
    let { children } = $props()
    import { onMount } from 'svelte'
    
    let isDark = false;
    
    onMount(() => {
        // Initialize dark mode from localStorage or system preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            isDark = true;
        } else {
            document.documentElement.classList.remove('dark');
            isDark = false;
        }
        
        // Close mobile menu when clicking outside
        const handleClickOutside = (e) => {
            const details = document.querySelector('details');
            if (details && details.hasAttribute('open') && !details.contains(e.target)) {
                details.removeAttribute('open');
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
    
    function toggleTheme() {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
            isDark = false;
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
            isDark = true;
        }
    }
</script>

<div class="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-200 font-mono antialiased min-h-screen flex flex-col transition-colors duration-300 selection:bg-amber-200 selection:text-stone-900">
    
    <!-- HEADER -->
    <header class="w-full border-b-2 border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-950 sticky top-0 z-50 transition-colors duration-300">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            
            <!-- Brand -->
            <h2 class="text-base sm:text-lg font-bold tracking-tighter uppercase select-none">
                The Research Nest
            </h2>

            <!-- Navigation -->
            <nav class="flex items-center gap-4 sm:gap-6">
                
                <!-- Desktop Menu (Flex) -->
                <div class="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <a 
                        href="https://medium.com/the-research-nest/trn-guest-blogging-2817c4ca31d3" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="hover:text-amber-700 dark:hover:text-amber-400 hover:underline decoration-2 underline-offset-4 transition-all"
                    >
                        Write
                    </a>
                    <a 
                        href="https://medium.com/the-research-nest" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="hover:text-amber-700 dark:hover:text-amber-400 hover:underline decoration-2 underline-offset-4 transition-all"
                    >
                        Medium
                    </a>
                    <a 
                        href="https://www.youtube.com/@theresearchnest" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="hover:text-amber-700 dark:hover:text-amber-400 hover:underline decoration-2 underline-offset-4 transition-all"
                    >
                        YouTube
                    </a>
                </div>

                <!-- Theme Toggle Button -->
                <button 
                    onclick={toggleTheme}
                    class="text-xs font-bold border border-stone-900 dark:border-stone-400 px-2 py-1 hover:bg-stone-900 hover:text-stone-50 dark:hover:bg-stone-200 dark:hover:text-stone-950 transition-all uppercase"
                >
                    {isDark ? '[ LIGHT ]' : '[ DARK ]'}
                </button>

                <!-- Mobile Menu (Details/Summary) -->
                <details class="md:hidden relative group">
                    <summary class="cursor-pointer px-3 py-1 border border-transparent hover:border-stone-900 dark:hover:border-stone-400 transition-colors select-none">
                        <span class="text-sm font-bold uppercase">Menu +</span>
                    </summary>
                    
                    <!-- Dropdown -->
                    <div class="absolute right-0 top-full mt-2 w-48 bg-stone-50 dark:bg-stone-900 border-2 border-stone-900 dark:border-stone-400 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(168,162,158,1)] p-4 flex flex-col space-y-3 z-50">
                        <a 
                            href="https://medium.com/the-research-nest/trn-guest-blogging-2817c4ca31d3" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="block text-sm hover:text-amber-700 dark:hover:text-amber-400 hover:pl-2 transition-all duration-200"
                        >
                            → Write
                        </a>
                        <a 
                            href="https://medium.com/the-research-nest" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="block text-sm hover:text-amber-700 dark:hover:text-amber-400 hover:pl-2 transition-all duration-200"
                        >
                            → Medium
                        </a>
                        <a 
                            href="https://www.youtube.com/@theresearchnest" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="block text-sm hover:text-amber-700 dark:hover:text-amber-400 hover:pl-2 transition-all duration-200"
                        >
                            → YouTube
                        </a>
                    </div>
                </details>

            </nav>
        </div>
    </header>

    <!-- MAIN CONTENT SLOT -->
    <main class="flex-grow w-full">
        {@render children?.()}
    </main>
</div>

<style>
    /* Custom adjustment to hide the default details marker across browsers */
    :global(details > summary) {
        list-style: none;
    }
    :global(details > summary::-webkit-details-marker) {
        display: none;
    }
    
    /* Smooth fade for the mobile dropdown */
    :global(details[open] summary ~ div) {
        animation: fadeIn 0.1s ease-in-out;
    }

    @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(-5px); }
        100% { opacity: 1; transform: translateY(0); }
    }
</style>
