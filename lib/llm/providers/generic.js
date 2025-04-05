const MAX_PROMPT_LEN = 10000
const MAX_TOKENS = 1024

export class Generic {
  constructor(system, {
    model,
    host,
    endpoint,
    apiKey,
    temperature,
    maxTokens
  }) {
    this.system = system
    this.model = model
    this.host = host
    this.endpoint = endpoint
    this.apiKey = apiKey
    this.temperature = temperature
    this.maxTokens = maxTokens || MAX_TOKENS
  }

  getHeaders () {
    return Object.assign({
      'Content-Type': 'application/json',
    }, this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {})
  }

  getBody (prompt) {
    return JSON.stringify({
      model: this.model,
      temperature: Number(this.temperature),
      maxTokens: this.maxTokens,
      messages: [
        { role: "system", content: this.system },
        { role: "user", content: prompt }
      ]
    })
  }

  getMessage (data) {
    const messages = data?.choices || []
    const message = messages[messages.length - 1]?.message?.content || ''
    return message.replace('<|eot_id|>', '')
  }
  
  async summarize(prompt) {
    if (prompt.length > MAX_PROMPT_LEN) prompt = prompt.substring(0, MAX_PROMPT_LEN)

    try {
      const response = await fetch(this.host + this.endpoint, {
        method: 'POST',
        headers: this.getHeaders(),
        body: this.getBody(prompt)
      })

      const data = await response.json()
      if (!response.ok) {
        console.error(data)
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return this.getMessage(data)
    } catch (error) {
      console.error('Error summarizing text:', error)
      throw error
    }
  }
}
