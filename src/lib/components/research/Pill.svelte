<script lang="ts">
  interface Props {
    label: string
    color?: string
  }

  let { label, color = "#1a5e5e" }: Props = $props()
</script>

<span
  class="pill"
  style={`--pill-color:${color}; --pill-background:${color}14; --pill-border:${color}30;`}
>
  {label}
</span>

<style>
  .pill {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.18rem 0.7rem;
    border: 1px solid var(--pill-border);
    background: var(--pill-background);
    color: var(--pill-color);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: 0.8rem;
    line-height: 1;
    letter-spacing: 0.04em;
  }
</style>
