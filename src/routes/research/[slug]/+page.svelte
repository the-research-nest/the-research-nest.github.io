<svelte:head>
  <title>{data.post.title} | The Research Nest</title>
  <meta name="description" content={data.post.deck} />
</svelte:head>

<script lang="ts">
  import ResearchGuide from "$lib/components/ResearchGuide.svelte"

  let { data } = $props()
</script>

{#if data.post.component === "research-guide"}
  <ResearchGuide />
{/if}
