import {test, beforeEach, afterEach} from "node:test"
import assert from "node:assert"
import { MockAgent, setGlobalDispatcher } from 'undici'

import { summarize } from "../../lib/llm/index.js"
const system = "You are a helpful assistant."
const prompt = "Just tell me something"

let agent;
beforeEach(() => {
  agent = new MockAgent()
  setGlobalDispatcher(agent)
  agent.enableCallHistory()
  agent.disableNetConnect()
})

test('should use Anthropic provider', async () => {
  agent
    .get('https://api.anthropic.com')
    .intercept({
      path: '/v1/messages',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': 'your-api-key'
      },
      body: '{"model":"claude-v1","temperature":0.7,"system":"You are a helpful assistant.","maxTokens":1000,"messages":[{"role":"user","content":"Just tell me something"}]}',
      method: 'POST'
    })
    .reply(200, {
      "content": [
        {
          "text": "something",
          "type": "text"
        }
      ],
      "id": "msg_013Zva2CMHLNnXjNJJKqJ2EF",
      "model": "claude-3-7-sonnet-20250219",
      "role": "assistant",
      "stop_reason": "end_turn",
      "stop_sequence": null,
      "type": "message",
      "usage": {
        "input_tokens": 2095,
        "output_tokens": 503
      }
    })

  const llmSettings = {
    host: 'https://api.anthropic.com',
    model: 'claude-v1',
    endpoint: '/v1/messages',
    apiKey: 'your-api-key',
    temperature: 0.7,
    maxTokens: 1000
  }

  const result = await summarize(system, prompt, llmSettings)
  assert.equal(result, 'something')
  agent.assertNoPendingInterceptors()
  assert.equal(agent.getCallHistory().logs.length, 1)
})

test('should use OpenAI provider', async () => {
  agent
    .get('https://api.openai.com')
    .intercept({
      path: '/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-api-key'
      },
      body: '{"model":"gpt-4o","temperature":0.7,"maxTokens":1000,"messages":[{"role":"system","content":"You are a helpful assistant."},{"role":"user","content":"Just tell me something"}]}',
      method: 'POST'
    })
    .reply(200, {
      "id": "chatcmpl-B9MBs8CjcvOU2jLn4n570S5qMJKcT",
      "object": "chat.completion",
      "created": 1741569952,
      "model": "gpt-4o-2024-08-06",
      "choices": [
        {
          "index": 0,
          "message": {
            "role": "assistant",
            "content": "something",
            "refusal": null,
            "annotations": []
          },
          "logprobs": null,
          "finish_reason": "stop"
        }
      ],
      "usage": {
        "prompt_tokens": 19,
        "completion_tokens": 10,
        "total_tokens": 29,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "audio_tokens": 0
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "audio_tokens": 0,
          "accepted_prediction_tokens": 0,
          "rejected_prediction_tokens": 0
        }
      },
      "service_tier": "default"
    })

  const llmSettings = {
    host: 'https://api.openai.com',
    model: 'gpt-4o',
    endpoint: '/v1/chat/completions',
    apiKey: 'your-api-key',
    temperature: 0.7,
    maxTokens: 1000
  }
  
  const result = await summarize(system, prompt, llmSettings)
  assert.equal(result, 'something')
  agent.assertNoPendingInterceptors()
  assert.equal(agent.getCallHistory().logs.length, 1)
})