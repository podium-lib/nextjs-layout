const toggle = (el) => {
    console.log('toggle', el.target);
}

class MenuToggle extends HTMLElement {
    constructor() {
      super();

      if (this.shadowRoot) {
        const button = this.shadowRoot.firstElementChild;
        button.addEventListener('click', toggle);
      } else {
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `<button><slot></slot></button>`;
        shadow.firstChild.addEventListener('click', toggle);
      }
    }
  }

  customElements.define('menu-toggle', MenuToggle);