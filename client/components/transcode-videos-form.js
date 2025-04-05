class TranscodeVideosForm extends HTMLElement {
  constructor () {
    super()
  }
  connectedCallback () {
    this.render()
    this.registerEvents()

    fetch('/api/transcode-videos')
    .then(response => response.json())
    .then((transcodeVideos) => {
      this.querySelector('#transcode-videos').checked = transcodeVideos
    })
    .catch(error => console.error('Error:', error))
  }
  disconnectedCallback () {
    this.unregisterEvents()
  }
  registerEvents () {
    this.querySelector('#transcode-videos').addEventListener('change', this.setTranscodeVideosHandler.bind(this))
  }
  unregisterEvents () {
    this.querySelector('#transcode-videos').removeEventListener('change', this.setTranscodeVideosHandler.bind(this))
  }
  render () {
    this.innerHTML = /*html*/`
      <form>
        <div class="flex space-between">
          <div>
            <label for="transcode-videos">Transcode videos to h264</label>
          </div>
          <input type="checkbox" id="transcode-videos"/>
        </div>
        <div><small>Maximize compatibility across devices</small></div>
        <div><small>The download of videos will be slower, transcoding is quite resource intensive</small></div>
      </form>
    `
  }

  setTranscodeVideosHandler (event) {
    event.preventDefault()
    fetch('/api/transcode-videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event.target.checked)
    })
  }
}
customElements.define('transcode-videos-form', TranscodeVideosForm)
