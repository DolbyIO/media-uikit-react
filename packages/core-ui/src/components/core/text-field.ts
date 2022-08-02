const template = document.createElement('template');

template.innerHTML = `
<style>
    .container {
      position: relative;
      background-color: var(--container-bg-color);
    }

    .label {
      position: absolute;
      top: 0;
      left: 12px;
      padding: 0 var(--spacing-4);
      background-color: inherit;
      color: var(--text-input__label__color);
      font-size: 0.75em;
      transform: translateY(-50%);
    }

    .label:empty {
      display: none;
    }

    .caption {
      margin: var(--spacing-8) 0;
      color: var(--text-input__caption__color);
      font-size: 0.75em;
      letter-spacing: -0.02em;
    }

    .caption:empty {
      display: none;
    }

    .error .caption {
      color: var(--info-error);
    }

    .error ::slotted(input) {
      border: solid 1px var(--info-error);
    }

    ::slotted(input) {
      border: solid 1px var(--text-input__input__border-color);
      border-radius: 10px;
      padding: var(--spacing-16);
      color: var(--text-input__input__color);
      font-size: 0.9375em;
      letter-spacing: -0.02em;
      outline: none;
    }

    ::slotted(input:focus) {
      border: solid 1px var(--text-input__input-focus__border-color);
    }

    ::slotted(input::placeholder) {
      color: var(--text-input__input--placeholder__color);
    }
</style>

<div class="container">
  <span class="label"></span>
  <slot id="input-slot" name="input"></slot>
  <div class="caption"></div>
</div>
`;

window.customElements.define(
  'wc-text-field',
  class extends HTMLElement {
    private _shadowRoot: ShadowRoot;

    /** Renders the caption text (if provided) */
    private $caption: HTMLDivElement | null;

    /** Renders the parent element of the component */
    private $container: HTMLDivElement | null;

    /** Renders the label text (if provided) */
    private $label: HTMLSpanElement | null;

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({
        mode: 'open',
      });

      this._shadowRoot.appendChild(template.content.cloneNode(true));

      this.$caption = this._shadowRoot.querySelector<HTMLDivElement>('.caption');

      this.$container = this._shadowRoot.querySelector<HTMLDivElement>('.container');

      this.$label = this._shadowRoot.querySelector<HTMLDivElement>('.label');
    }

    connectedCallback() {
      const slot = this._shadowRoot.querySelector('#input-slot') as HTMLSlotElement;

      const nodes = slot.assignedNodes();

      if (nodes.length !== 1) {
        throw new Error(
          'Exactly one input node must be provided. Did you remember to assign it to the slot using "slot=\'input\'"?'
        );
      }

      const [input] = nodes;

      if (input.nodeName.toLowerCase() !== 'input') {
        throw new Error('Provided node must be an <input> element.');
      }
    }

    get error() {
      return this.getAttribute('error') === 'true';
    }

    set error(isError) {
      if (isError) {
        this.setAttribute('error', '');
      } else {
        this.removeAttribute('error');
      }
    }

    get caption() {
      return this.getAttribute('caption');
    }

    set caption(value) {
      if (value) {
        this.setAttribute('caption', value);
      } else {
        this.removeAttribute('caption');
      }
    }

    static get observedAttributes() {
      return ['caption', 'error', 'label'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      switch (name) {
        case 'caption':
          if (this.$caption) {
            this.$caption.innerText = newValue;
          }
          break;
        case 'error': {
          this.$container?.classList[newValue === 'true' ? 'add' : 'remove']('error');
          break;
        }
        case 'label': {
          if (this.$label) {
            this.$label.innerText = newValue;
          }
          break;
        }
        default:
          break;
      }
    }
  }
);

export {};
