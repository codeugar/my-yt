import { Generic } from "./generic.js"

const ANTHROPIC_VERSION = '2023-06-01'
const MAX_TOKENS = 1024

export class Anthropic extends Generic {
  constructor(system, args = {
    model,
    host,
    endpoint,
    apiKey,
    temperature,
    maxTokens
  }) {
    super(system, args)
  }

  getHeaders () {
    return {
      'Content-Type': 'application/json',
      'anthropic-version': ANTHROPIC_VERSION,
      'x-api-key': this.apiKey
    }
  }

  getBody (prompt) {
    return JSON.stringify({
      model: this.model,
      temperature: Number(this.temperature),
      system: this.system,
      maxTokens: this.maxTokens,
      messages: [
        { role: "user", content: prompt }
      ]
    })
  }

  getMessage (data) {
    const messages = data?.content || []
    const message = messages[messages.length - 1]?.text || ''
    return message.replace('<|eot_id|>', '')
  }
}
