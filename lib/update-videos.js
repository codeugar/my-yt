import { getVideosFor } from './youtube.js'

export async function updateAndPersistVideos (repo, callback = () => {}) {
  const channels = repo.getChannels()
  for (const channel of channels) {
    await updateAndPersistVideosForChannel(channel.name, repo, callback)
  }
}

export async function updateAndPersistVideosForChannel(name, repo, callback = () => {}) {
  let videos = await getVideosFor(name)
  if (videos) {
    videos = videos.map(v => repo.patchVideo(v))
    repo.upsertVideos(videos)
    callback({name, videos})
  }
  return videos
}
