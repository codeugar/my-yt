class EmptyState extends HTMLElement {
  constructor () {
    super()
  }

  connectedCallback () {
    this.classList.add('flex')
    this.classList.add('space-between')
    this.classList.add('direction-col')
    this.classList.add('user-select-none')
    this.render()
  }

  static get observedAttributes() {
    return ['data-has-channels'];
  }

  attributeChangedCallback(name, _, newValue) {
    this.render()
  }
  render () {
    if (this.dataset['hasChannels']) {
      this.innerHTML = /*html*/`
        <h1>All caught up!</h1>
        <p>Enjoy the world outside</p>
        <div class="extra-big">☀️</div>
      `
    } else {
      this.innerHTML = /*html*/`
        <h1>Nothing to show...</h1>
        <p>Add YouTube channels you want to track in <a href="/settings">/settings</a></p>
        <div class="extra-big">🙈</div>
      `
    }
  }
}
customElements.define('empty-state', EmptyState)
