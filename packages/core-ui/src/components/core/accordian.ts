const template = document.createElement('template');

template.innerHTML = `
<style>
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    display: none;
  }

  .icon {
    font-size: 2em;
    transform: rotate(-90deg);
  }

  .expanded .content {
    display: block;
  }

  .expanded .icon {
    transform: rotate(90deg);
  }
</style>

<div class="container">
  <div class="heading">
    <slot name="heading"></slot>
    <span class="icon">&#x2039;</span>
  </div>
  <div class="content">
    <slot name="content"></slot>
  </div>
</div>`;

/** TODO: We are temporarily using unicode for our chevron icon until we have an icon pack to work with */
window.customElements.define(
  'wc-accordion',
  class extends HTMLElement {
    private _shadowRoot: ShadowRoot;

    private $container: HTMLDivElement | null;

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({
        mode: 'open',
      });

      this._shadowRoot.appendChild(template.content.cloneNode(true));

      this.$container = this._shadowRoot.querySelector<HTMLDivElement>('.container');
    }

    get expanded() {
      return this.hasAttribute('expanded');
    }

    set expanded(isExpanded) {
      if (isExpanded) {
        this.setAttribute('expanded', 'true');
      } else {
        this.removeAttribute('expanded');
      }
    }

    static get observedAttributes() {
      return ['expanded'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      switch (name) {
        case 'expanded':
          this.$container?.classList[newValue === 'true' ? 'add' : 'remove']('expanded');
          break;
        default:
          break;
      }
    }
  }
);

export {};
