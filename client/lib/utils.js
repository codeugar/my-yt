export function createVideoElement (video, showOriginalThumbnail = false) {
  const $video = document.createElement('video-element')
  $video.dataset['data'] = JSON.stringify(Object.assign(video, showOriginalThumbnail ? {
    thumbnail: video.thumbnail.replace('mq2.jpg', 'mqdefault.jpg')
  } : {}))
  $video.dataset['videoId'] = video.id
  return $video
}

export function applyShowThumbnails(showThumbnails) {
  if (showThumbnails) {
    document.body.classList.remove('hide-thumbnails')
  } else {
    document.body.classList.add('hide-thumbnails')
  }
  const $showThumbnailsCheckbox = document.getElementById('show-thumbnails')
  if ($showThumbnailsCheckbox) $showThumbnailsCheckbox.checked = showThumbnails
}

export function applyShowBigPlayer(showBigPlayer) {
  if (showBigPlayer) {
    document.body.classList.add('show-big-player')
  } else {
    document.body.classList.remove('show-big-player')
  }
  const $showBigPlayerCheckbox = document.getElementById('show-big-player')
  if ($showBigPlayerCheckbox) $showBigPlayerCheckbox.checked = showBigPlayer
}

export function addClickListener ($el, handler) {
  if (!$el) return
  $el.addEventListener('click', handler)
  $el.addEventListener('keydown', (event) => event.key === 'Enter' && handler(event))
}

export function removeClickListener ($el, handler) {
  if (!$el) return
  $el.removeEventListener('click', handler)
  $el.removeEventListener('keydown', (event) => event.key === 'Enter' && handler(event))
}
