import React, { Fragment, FunctionComponent, ReactNode } from 'react';
import ReactSlider from 'react-slider';
import styles from './Slider.module.scss';
interface SliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  value?: number;
  step?: number;
  onChange?: (value: number, index: number) => void;
}

const Slider: FunctionComponent<SliderProps> = ({
  min,
  max,
  defaultValue,
  value,
  step,
  onChange,
}) => {
  return (
    <ReactSlider
      className={styles['mmappSlider']}
      thumbClassName={styles['mmappSlider-thumb']}
      trackClassName={styles['mmappSlider-track']}
      defaultValue={defaultValue}
      value={value}
      step={step}
      onChange={onChange}
      min={min}
      max={max}
    />
  );
};

export { Slider as default, SliderProps };
