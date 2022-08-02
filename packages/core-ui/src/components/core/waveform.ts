import WaveSurfer from 'wavesurfer.js';
// @ts-ignore
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';

const template = document.createElement('template');

template.innerHTML = `
<style>
    .container {
      position: relative;
      background-color: var(--container-bg-color);
    }

    .wavesurfer-region {
      border: 2px solid #6A6A6D;
      border-radius: 4px;
      box-sizing: border-box;
    }
</style>

<div class="container">
  <div id="waveform"></div>
  <slot id="controls-slot" name="controls"></slot>
</div>
`;

window.customElements.define(
  'wc-waveform',
  class extends HTMLElement {
    private _shadowRoot: ShadowRoot;

    /** Renders the parent element of the component */
    private $container: HTMLDivElement | null;

    /** Renders the waveform */
    private $waveform: WaveSurfer | null;

    /** Audio loaded in the waveform */
    private $url: string | null;

    /** Audio loaded in the waveform */
    private $waveformConfig: Record<string, any>;

    /** Audio loaded in the waveform */
    private $previewConfig: Record<string, any>;

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({
        mode: 'open',
      });

      this._shadowRoot.appendChild(template.content.cloneNode(true));

      this.$container = this._shadowRoot.querySelector<HTMLDivElement>('.container');
      this.$url = null;
      this.$waveform = null;
      this.$waveformConfig = {
        backend: 'MediaElement',
        height: 200,
        barWidth: 3,
        barHeight: 1, // the height of the wave
        barGap: 1.5,
        barRadius: 3,
        progressColor: '#6A6A6D',
        waveColor: '#B9B9BA',
        cursorWidth: 3,
        cursorColor: 'black',
      };
      this.$previewConfig = {
        id: WaveformRegionIds.PreviewWindow,
        minLength: this.previewMinLength,
        maxLength: this.previewMaxLength,
        color: 'transparent',
        start: 45,
        end: 75,
        loop: true,
        drag: true,
        resize: true,
        responsive: true,
        snapToGridInterval: 1,
        handleStyle: {
          left: {
            backgroundColor: 'transparent',
          },
          right: {
            backgroundColor: 'transparent',
          },
        },
      };
    }

    initWaveform() {
      // @TODO: Figure out dynamic plugins (change settings by input)
      const plugins = this.previewActive
        ? [
            RegionsPlugin.create({
              maxRegions: 2,
              regionsMinLength: 1,
              regions: [this.$previewConfig],
            }),
          ]
        : [];
      this.$waveform = WaveSurfer.create({
        container: this._shadowRoot.querySelector<HTMLElement>('#waveform')!,
        ...this.$waveformConfig,
        plugins,
      });
    }

    connectedCallback() {
      this.initWaveform();
      if (!this.$waveform || !this.$url) {
        return;
      }
      this.$waveform.load(this.$url);

      // Event emitters
      this.$waveform.on('stop', () => this.isPlayingHandler(WaveformEvents.Stop));
      this.$waveform.on('pause', () => this.isPlayingHandler(WaveformEvents.Pause));
      this.$waveform.on('play', () => this.isPlayingHandler(WaveformEvents.Play));
      this.$waveform.on('waveform-ready', this.readyHandler.bind(this));

      // Default behavior
      const playButton = this.findControlSlotElement(WaveformControlIds.Play);
      if (playButton) {
        playButton.addEventListener('click', this.defaultPlayHandler.bind(this));
      }
      const loopButton = this.findControlSlotElement(WaveformControlIds.Loop);
      if (loopButton) {
        loopButton.addEventListener('click', this.defaultLoopHandler.bind(this));
      }
      const stopButton = this.findControlSlotElement(WaveformControlIds.Stop);
      if (stopButton) {
        stopButton.addEventListener('click', this.defaultStopHandler.bind(this));
      }
      const volumeInput = <HTMLInputElement>this.findControlSlotElement(WaveformControlIds.Volume);
      if (volumeInput) {
        volumeInput.addEventListener('input', (e) => this.changeVolumeHandler(e, volumeInput));
        volumeInput.addEventListener('change', (e) => this.changeVolumeHandler(e, volumeInput));
      }
    }

    disconnectedCallback() {
      // Clean up event listeners
      this.$waveform!.unAll();

      const playButton = this.findControlSlotElement(WaveformControlIds.Play);
      if (playButton) {
        playButton.removeEventListener('click', this.defaultPlayHandler.bind(this));
      }
      const loopButton = this.findControlSlotElement(WaveformControlIds.Loop);
      if (loopButton) {
        loopButton.removeEventListener('click', this.defaultLoopHandler.bind(this));
      }
      const stopButton = this.findControlSlotElement(WaveformControlIds.Stop);
      if (stopButton) {
        stopButton.removeEventListener('click', this.defaultStopHandler.bind(this));
      }
      const volumeInput = <HTMLInputElement>this.findControlSlotElement(WaveformControlIds.Volume);
      if (volumeInput) {
        volumeInput.removeEventListener('input', (e) => this.changeVolumeHandler(e, volumeInput));
        volumeInput.removeEventListener('change', (e) => this.changeVolumeHandler(e, volumeInput));
      }
    }

    readyHandler() {
      if (this.previewActive) {
        this.previewPositionHandler();
        this.previewMoveHandler();
      }
      this.dispatchEvent(
        new CustomEvent(WaveformEvents.Ready, {
          bubbles: true,
          cancelable: false,
        })
      );
    }

    changeVolumeHandler(e: Event, volumeInput: HTMLInputElement) {
      if (!e) {
        return;
      }
      const { value } = <HTMLInputElement>e!.target;
      if (!value) {
        return;
      }
      this.$waveform!.setVolume(parseFloat(value));
      volumeInput!.value = value;
    }

    previewPositionHandler() {
      const previewWindow = this.getRegion(WaveformRegionIds.PreviewWindow);
      if (previewWindow) {
        const duration = this.$waveform!.backend.getDuration();
        if (duration < 75) {
          previewWindow.update({ id: WaveformRegionIds.PreviewWindow, start: 0, end: 30 });
        }
      }
    }

    previewMoveHandler() {
      this.$waveform?.on('region-updated', (region) => {
        this.dispatchEvent(
          new CustomEvent(WaveformEvents.RegionUpdated, {
            bubbles: true,
            cancelable: false,
            detail: {
              ...region,
            },
          })
        );
      });
    }

    isPlayingHandler(event: WaveformEvents) {
      this.dispatchEvent(
        new CustomEvent(event, {
          bubbles: true,
          cancelable: false,
        })
      );
    }

    defaultPlayHandler() {
      if (this.$waveform!.isPlaying()) {
        this.$waveform!.pause();
        return;
      }
      const previewWindow = this.getRegion(WaveformRegionIds.PreviewWindow);
      if (previewWindow && previewWindow.loop) {
        const currTime = this.$waveform?.getCurrentTime() || 0;
        if (this.loopActive) {
          previewWindow.playLoop();
          return;
        }
        if (currTime > previewWindow.start && currTime < previewWindow.end) {
          this.$waveform!.playPause();
          return;
        }
      }
      this.$waveform!.playPause();
    }

    defaultLoopHandler() {
      const previewWindow = this.getRegion(WaveformRegionIds.PreviewWindow);
      if (previewWindow) {
        previewWindow.setLoop(!previewWindow.loop);
      }
    }

    defaultStopHandler() {
      this.$waveform!.stop();
    }

    findControlSlotElement(controlId: WaveformControlIds) {
      const slot = this._shadowRoot.querySelector('#controls-slot') as HTMLSlotElement;
      const nodes = slot.assignedNodes();
      if (nodes.length !== 1) {
        return;
      }
      const [controls] = nodes;
      if (controls.nodeName.toLowerCase() !== 'div') {
        throw new Error("Provided node must be an <div slot='controls'> element.");
      }

      // Need to cast childNodes from NodeListOf<ChildNode> to NodeListOf<Element> so TS is happy with querying for id
      const slotChildren = <NodeListOf<Element>>controls.childNodes;
      let controlElement = null;
      for (let child of slotChildren) {
        const hasDirectControlChild = child.id.toLowerCase() === controlId;
        const nestedControlChild = child.querySelector(`#${controlId}`);
        // The child is either the control or the control is nested within it or neither
        controlElement = hasDirectControlChild ? child : nestedControlChild;
        if (controlElement) {
          break;
        }
      }
      return controlElement;
    }

    getRegion(regionName: string) {
      if (!regionName) {
        return;
      }
      return this.$waveform!.regions?.list[regionName];
    }

    get loopActive() {
      return this.getAttribute('loop-active') === 'true';
    }

    set loopActive(active) {
      if (active) {
        this.setAttribute('loop-active', '');
      } else {
        this.removeAttribute('loop-active');
      }
    }

    get previewActive() {
      return this.getAttribute('preview-active') === 'true';
    }

    set previewActive(active) {
      if (active) {
        this.setAttribute('preview-active', '');
      } else {
        this.removeAttribute('preview-active');
      }
    }

    get previewMinLength() {
      return 1;
    }

    get previewMaxLength() {
      return 30;
    }

    get enableDragSelection() {
      return this.getAttribute('enable-drag-selection') === 'true';
    }

    set enableDragSelection(active) {
      if (active) {
        this.setAttribute('enable-drag-selection', '');
      } else {
        this.removeAttribute('enable-drag-selection');
      }
    }

    get enableResize() {
      return this.getAttribute('enable-resize') === 'true';
    }

    set enableResize(active) {
      if (active) {
        this.setAttribute('enable-resize', '');
      } else {
        this.removeAttribute('enable-resize');
      }
    }

    get interact() {
      return this.getAttribute('interact') === 'true';
    }

    set interact(active) {
      if (active) {
        this.setAttribute('interact', '');
      } else {
        this.removeAttribute('interact');
      }
    }

    static get observedAttributes() {
      return [
        'loop-active',
        'url',
        'preview-active',
        'enable-drag-selection',
        'enable-resize',
        'preview-start',
        'preview-end',
        'wave-color',
        'wave-progress-color',
        'interact',
      ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      switch (name) {
        case 'loop-active': {
          this.$container?.classList[newValue === 'true' ? 'add' : 'remove']('loop-active');
          if (newValue && newValue !== 'undefined' && newValue !== 'null') {
            this.$previewConfig = {
              ...this.$previewConfig,
              loop: this.loopActive,
            };
          }
          break;
        }
        case 'url': {
          this.$url = newValue;
          break;
        }
        case 'preview-active': {
          this.$container?.classList[newValue === 'true' ? 'add' : 'remove']('preview-active');
          break;
        }
        case 'enable-drag-selection': {
          this.$container?.classList[newValue === 'true' ? 'add' : 'remove'](
            'enable-drag-selection'
          );
          if (newValue && newValue !== 'undefined' && newValue !== 'null') {
            this.$previewConfig = {
              ...this.$previewConfig,
              drag: this.enableDragSelection,
            };
          }
          break;
        }
        case 'enable-resize': {
          this.$container?.classList[newValue === 'true' ? 'add' : 'remove']('enable-resize');
          if (newValue && newValue !== 'undefined' && newValue !== 'null') {
            this.$previewConfig = {
              ...this.$previewConfig,
              resize: this.enableResize,
            };
          }
          break;
        }
        case 'preview-start': {
          if (newValue && newValue !== 'undefined' && newValue !== 'null') {
            this.$previewConfig = {
              ...this.$previewConfig,
              start: newValue,
            };
          }
          break;
        }
        case 'preview-end': {
          if (newValue && newValue !== 'undefined' && newValue !== 'null') {
            this.$previewConfig = {
              ...this.$previewConfig,
              end: newValue,
            };
          }
          break;
        }
        case 'wave-color': {
          if (newValue && newValue !== 'undefined' && newValue !== 'null') {
            this.$waveformConfig = {
              ...this.$waveformConfig,
              waveColor: newValue,
            };
          }
          break;
        }
        case 'wave-progress-color': {
          if (newValue && newValue !== 'undefined' && newValue !== 'null') {
            this.$waveformConfig = {
              ...this.$waveformConfig,
              progressColor: newValue,
            };
          }
          break;
        }
        case 'interact': {
          this.$container?.classList[newValue === 'true' ? 'add' : 'remove']('interact');
          if (newValue && newValue !== 'undefined' && newValue !== 'null') {
            this.$waveformConfig = {
              ...this.$waveformConfig,
              interact: this.interact,
            };
          }
          break;
        }
        default:
          break;
      }
    }
  }
);

enum WaveformControlIds {
  Play = 'play',
  Loop = 'loop',
  Stop = 'stop',
  Volume = 'volume',
}

enum WaveformRegionIds {
  PreviewWindow = 'preview-window',
}

enum WaveformEvents {
  Play = 'wc-waveform-play',
  Pause = 'wc-waveform-pause',
  Stop = 'wc-waveform-stop',
  Ready = 'wc-waveform-ready',
  RegionUpdated = 'wc-waveform-region-updated',
  Loop = 'wc-waveform-loop',
}

export { WaveformControlIds, WaveformEvents };
