import styles from './Waveform.module.scss';

import {
  FunctionComponent,
  InputHTMLAttributes,
  useState,
  useEffect,
  useRef,
  forwardRef,
} from 'react';

import Lottie from 'react-lottie-player';

import waveformLottie from '@dolbyio/design-system/assets/lottie/waveform-placeholder.json';

import '@dolbyio/core-ui/dist/components/core/waveform';
import { WaveformControlIds, WaveformEvents } from '@dolbyio/core-ui/dist/components/core/waveform';

import { Icon, Icons } from './Icon';
import Slider from './Slider';

interface WaveformProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Audio to load and render. */
  url: string;
  /** Defaults the looping behavior. */
  loopActive?: boolean;
  /** Defaults the looping behavior. */
  onReady?: () => void;
  /** Displays the preview window. */
  previewActive?: boolean;
  /** Only play the preview window. Parsed when previewActive is true. */
  onlyPlayPreview?: boolean;
  /** Toggles draggable preview. Parsed when previewActive is true. */
  isPreviewDraggable?: boolean;
  /** Toggles loop control. Parsed when previewActive is true. */
  hasLoopControl?: boolean;
  /** Toggles resize on preview. Parsed when previewActive is true. */
  isPreviewResizable?: boolean;
  /** Preview window config. Parsed when previewActive is true.  */
  preview?: {
    start?: number;
    end?: number;
  };
  /** Sets the wave color */
  waveColor?: string;
  /** Sets the wave progress color */
  waveProgressColor?: string;
  interact?: boolean;
  /** Fires when the preview window size or location changes. Parsed when previewActive is true. */
  onPreviewWindowChange?: ({ start, end }: { start: number; end: number }) => void;
  /** Fires when the preview window size or location changes. Parsed when previewActive is true. */
  onPlayChange?: (isDoing: boolean, playingEvent: WaveformEvents) => void;
  /** Fires when the Waveform seeks */
  onSeek?: (seekPosition: number) => void;
  /** Loading override */
  isLoading?: boolean;
  preventDefaultControls?: boolean;
  /** Current seek time in audio */
  seekPosition?: number;
  ref?: any;
}

const WaveForm: FunctionComponent<WaveformProps> = forwardRef<HTMLElement, WaveformProps>(
  (props, ref?: any) => {
    const {
      url,
      loopActive = true,
      onReady = () => {},
      previewActive = true,
      onlyPlayPreview = false,
      isPreviewDraggable = true,
      hasLoopControl = true,
      isPreviewResizable = true,
      onPreviewWindowChange = () => {},
      waveColor = '#B9B9BA',
      waveProgressColor = '#6A6A6D',
      preview = {},
      onPlayChange = () => {},
      onSeek = () => {},
      isLoading = false,
      interact = true,
      preventDefaultControls = false,
      seekPosition = 0,
    } = props;
    const [loopActiveState, setLoopActive] = useState(loopActive);
    const [isPlayingState, setIsPlaying] = useState(false);
    const [isReadyState, setIsReady] = useState(false);
    const [seekVal, setSeek] = useState(0);
    const [duration, setDuration] = useState(0);

    let waveformRef = ref;
    if (!waveformRef) {
      waveformRef = useRef();
    }

    const handleSeek = (seekPosition: number) => {
      if (!waveformRef.current || !waveformRef.current.$waveform) {
        return;
      }
      setSeek(seekPosition);
      const progress = seekPosition / duration;
      const toSeek = progress < 1 ? progress : 1;
      waveformRef.current.$waveform.seekTo(toSeek);
    };

    useEffect(() => {
      if (!preventDefaultControls) {
        return;
      }
      // User has prevented default waveform controls and opting for an external control
      handleSeek(seekPosition);
    }, [seekPosition]);

    const handleWaveformSeekInteraction = () => {
      if (!waveformRef.current || !waveformRef.current.$waveform) {
        return;
      }
      const seekPosition = waveformRef.current.$waveform.getCurrentTime();
      setSeek(seekPosition);
      onSeek(seekPosition);
    };

    useEffect(() => {
      if (!waveformRef.current || !waveformRef.current.$waveform) {
        return;
      }
      waveformRef.current.$waveform.on('audioprocess', () => {
        handleWaveformSeekInteraction();
      });
      waveformRef.current.$waveform.on('ready', () => {
        setDuration(waveformRef.current.$waveform.getDuration());
      });
      waveformRef.current.$waveform.on('seek', () => {
        handleWaveformSeekInteraction();
      });
    }, [waveformRef.current]);

    useEffect(() => {
      const onReadyHandler = () => {
        setIsReady(true);
        onReady();
      };

      const onIsPlayingHandler = (isPlaying: boolean, playingEvent: WaveformEvents) => {
        setIsPlaying(isPlaying);
      };

      const onPreviewUpdated = (previewDetails: any) => {
        const {
          detail: { start, end },
        } = previewDetails;
        onPreviewWindowChange({ start, end });
      };

      window.addEventListener(WaveformEvents.Play, () =>
        onIsPlayingHandler(true, WaveformEvents.Play)
      );
      window.addEventListener(WaveformEvents.Pause, () =>
        onIsPlayingHandler(false, WaveformEvents.Pause)
      );
      window.addEventListener(WaveformEvents.Ready, () => onReadyHandler());
      window.addEventListener(WaveformEvents.RegionUpdated, (previewDetails) =>
        onPreviewUpdated(previewDetails)
      );
      return () => {
        window.removeEventListener(WaveformEvents.Play, () =>
          onIsPlayingHandler(true, WaveformEvents.Play)
        );
        window.removeEventListener(WaveformEvents.Pause, () =>
          onIsPlayingHandler(false, WaveformEvents.Pause)
        );
        window.removeEventListener(WaveformEvents.Ready, () => onReadyHandler());
        window.removeEventListener(WaveformEvents.RegionUpdated, (previewDetails: any) =>
          onPreviewUpdated(previewDetails)
        );
      };
    }, []);

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: waveformLottie,
    };

    return (
      <>
        <div
          style={{
            width: '100%',
            justifyContent: 'center',
            display: isLoading || isReadyState ? 'none' : 'flex',
          }}
        >
          <Lottie
            loop
            play={true}
            style={{
              visibility: isLoading || isReadyState ? 'hidden' : 'visible',
              position: 'absolute',
              height: 200,
            }}
            animationData={waveformLottie}
          />
        </div>
        <wc-waveform
          ref={waveformRef}
          style={{ visibility: isReadyState ? 'visible' : 'hidden' }}
          url={url}
          loop-active={loopActiveState}
          preview-active={previewActive}
          enable-drag-selection={isPreviewDraggable}
          enable-resize={isPreviewResizable}
          preview-start={preview?.start}
          preview-end={preview?.end}
          wave-color={waveColor}
          wave-progress-color={waveProgressColor}
          interact={interact}
          className={'Waveform'}
        >
          <WaveformControls
            {...props}
            preventDefaultControls={preventDefaultControls}
            loopActive={loopActiveState}
            isPlaying={isPlayingState}
            onPlayChange={(isDoing, playEvent) => {
              onPlayChange(isDoing, playEvent);
              if (playEvent === WaveformEvents.Loop) {
                setLoopActive(isDoing);
              }
            }}
            onSeek={handleSeek}
            hasLoopControl={hasLoopControl}
            audioDuration={duration}
            seekPosition={seekVal}
          />
        </wc-waveform>
      </>
    );
  }
);

interface WaveformControlProps {
  isPlaying?: boolean;
  loopActive?: boolean;
  preventDefaultControls?: boolean;
  onPlayChange?: (isDoing: boolean, playEvent: WaveformEvents) => void;
  onVolumeChange?: Function;
  onSeek?: (seekPosition: number) => void;
  hasLoopControl?: boolean;
  audioDuration?: number;
  seekPosition?: number;
}

const WaveformControls: FunctionComponent<WaveformControlProps> = ({
  isPlaying = false,
  loopActive = true,
  preventDefaultControls = true,
  onPlayChange = () => {},
  onVolumeChange = () => {},
  onSeek = () => {},
  hasLoopControl = true,
  audioDuration = 0,
  seekPosition = 0,
}) => {
  const [volume, setVolume] = useState<string>();
  const timeString = (timeStamp: number) => {
    let minutes = Math.floor(timeStamp / 60);
    let seconds = Math.ceil(timeStamp % 60);

    let formattedTime = seconds >= 10 ? minutes + ':' + seconds : minutes + ':0' + seconds;

    return formattedTime;
  };
  return (
    <div
      slot={preventDefaultControls ? '' : 'controls'}
      className={`${styles.flex} ${styles.controls}`}
    >
      <div className={`${styles.flex} ${styles['left-controls']}`}>
        <div
          id={WaveformControlIds.Play}
          className={styles.icon}
          onClick={() =>
            onPlayChange(!isPlaying, isPlaying ? WaveformEvents.Pause : WaveformEvents.Play)
          }
        >
          <Icon icon={isPlaying ? Icons.Pause : Icons.Play} />
        </div>
        <div
          id={WaveformControlIds.Stop}
          className={styles.icon}
          onClick={() => onPlayChange(false, WaveformEvents.Stop)}
        >
          <Icon icon={Icons.Stop} />
        </div>
        {hasLoopControl && (
          <div
            id={WaveformControlIds.Loop}
            onClick={() => {
              onPlayChange(!loopActive, WaveformEvents.Loop);
            }}
            className={styles.icon}
          >
            <Icon icon={Icons.Loop} style={{ color: loopActive ? 'black' : '#6A6A6D' }} />
          </div>
        )}
      </div>
      <div className={`${styles.flex} ${styles['middle-controls']}`}>
        <p>{timeString(seekPosition)}</p>
        <div className={styles['slider']}>
          <Slider
            defaultValue={0}
            min={0}
            max={audioDuration}
            value={seekPosition}
            step={0.018868}
            onChange={(value, index) => {
              onSeek(value);
              seekPosition = value;
            }}
          ></Slider>
        </div>
        <p>{timeString(audioDuration)}</p>
      </div>
      <div className={`${styles.flex} ${styles['right-controls']}`}>
        <Icon icon={Icons.Sound} style={{ cursor: 'default' }} className={styles.icon} />
        <input
          id={WaveformControlIds.Volume}
          type="range"
          min="0"
          max="1"
          defaultValue={volume}
          step="0.1"
          value={volume}
          onChange={(d) => {
            if (!d.target) {
              return;
            }
            onVolumeChange(d);
            setVolume(d.target.value);
          }}
        />
      </div>
    </div>
  );
};

export { WaveForm as default, WaveformEvents, WaveformControls, WaveformProps };
