import fs from "fs"
import { getVideoSubtitles } from "./youtube.js"
import * as llm from "./llm/index.js"

export async function summarizeVideo(id, repo, llmSettings = {}, callback = () => {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const transcript = await getVideoSubtitles(id, callback)
      let cleanedTranscript = cleanTranscript(transcript)
      repo.setVideoTranscript(id, cleanedTranscript)
      cleanedTranscript = cleanedTranscript.replace('\n', ' ')
      fs.writeFileSync(`./data/videos/${id}.en.txt`, cleanedTranscript)
      callback('prompting llm')
      
      const userPrompt = `
Extract the key points from the following video transcript:

${cleanedTranscript}`.trim()

      const systemPrompt = "You're a helpful assistant that sumarizes a video transcript in max 10 sentences, extracting the key points"
      const summary = await llm.summarize(systemPrompt, userPrompt, llmSettings)
      callback('received summary')
      repo.setVideoSummary(id, summary)
      resolve({summary, transcript: cleanedTranscript})
    } catch (error) {
      console.error('Error summarizing video', id, error.message)
      reject(error)
    }
  })
}
export function cleanTranscript (transcript) {
  const lines = []
  for (let line of transcript.split('\n')) {
    line = line.trim()
    if (/^\d+/.test(line)) continue
    if (line.match(/^\d+:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/)) continue
    if (lines.length === 0 || !lines[lines.length - 1].startsWith(line)) {
      lines.push(line)
    }
  }
  return lines.filter(Boolean).join('\n').trim()
}


