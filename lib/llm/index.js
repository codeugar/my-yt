import { Anthropic } from "./providers/anthropic.js"
import { Generic } from "./providers/generic.js"

export async function summarize(
  system,
  prompt,
  llmSettings,
) {
  try {
    const llm = llmSettings.host.includes('api.anthropic.com') 
    ? new Anthropic(system, llmSettings)
    : new Generic(system, llmSettings)    

    return llm.summarize(prompt)
  } catch (e) {
    console.error('Error summarizing video', e.message)
  }
}
