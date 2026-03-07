<script lang="ts">
  interface Props {
    q: string
    a: string
    color?: string
  }

  let { q, a, color = "#1a5e5e" }: Props = $props()
  let open = $state(false)
</script>

<div
  class="accordion-item"
  style={`--item-color:${color}; --item-background:${color}0c; --item-border:${color}22;`}
>
  <button type="button" class="accordion-trigger" onclick={() => (open = !open)}>
    <span>{q}</span>
    <span class="accordion-symbol" aria-hidden="true">{open ? "-" : "+"}</span>
  </button>

  {#if open}
    <div class="accordion-panel">
      {a}
    </div>
  {/if}
</div>

<style>
  .accordion-item {
    overflow: hidden;
    border: 1px solid var(--rule-color, #ddd0bc);
    border-radius: 0.85rem;
    background: var(--paper-color, #fffcf8);
  }

  .accordion-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border: none;
    padding: 0.95rem 1.15rem;
    background: transparent;
    color: var(--ink-color, #1c1510);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 0.95rem;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
  }

  .accordion-trigger:hover,
  .accordion-trigger:focus-visible {
    background: var(--item-background);
    outline: none;
  }

  .accordion-symbol {
    flex-shrink: 0;
    color: var(--item-color);
    font-size: 1.3rem;
    line-height: 1;
  }

  .accordion-panel {
    border-top: 1px solid var(--rule-color, #ddd0bc);
    padding: 0.95rem 1.15rem 1.15rem;
    color: var(--body-color, #3a3028);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 0.93rem;
    line-height: 1.8;
    background: var(--paper-color, #fffcf8);
  }
</style>
