import { error } from "@sveltejs/kit"
import { getResearchPost } from "$lib/data/research-posts"

export function load({ params }) {
  const post = getResearchPost(params.slug)

  if (!post) {
    throw error(404, "Research article not found")
  }

  return { post }
}
