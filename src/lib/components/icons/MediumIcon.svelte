<script lang="ts">
  import { siMedium } from "simple-icons"

  interface Props {
    size?: number
  }

  let { size = 17 }: Props = $props()
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
>
  <path d={siMedium.path}></path>
</svg>
