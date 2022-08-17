import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '../core/RadioGroup';

type Props = {
  sampleRates: number[];
  defaultSampleRate: number;
  channelCounts: number[];
  defaultChannelCount: number;
  sampleSizes: number[];
  defaultSampleSize: number;
  onChangeSampleRate?: (sampleRate: number) => void;
  onChangeChannelCount?: (channelCount: number) => void;
  onChangeSampleSize?: (sampleSize: number) => void;
};

const AudioConfigurator = ({
  sampleRates,
  defaultSampleRate,
  channelCounts,
  defaultChannelCount,
  sampleSizes,
  defaultSampleSize,
  onChangeSampleRate,
  onChangeChannelCount,
  onChangeSampleSize,
}: Props) => {
  return (
    <>
      <RadioGroup
        values={sampleRates}
        defaultValue={defaultSampleRate}
        name="Sample Rate"
        onChangeValue={onChangeSampleRate}
      />
      <RadioGroup
        values={channelCounts}
        defaultValue={defaultChannelCount}
        name="Channel Count"
        onChangeValue={onChangeChannelCount}
      />
      <RadioGroup
        values={sampleSizes}
        defaultValue={defaultSampleSize}
        name="Sample Size"
        onChangeValue={onChangeSampleSize}
      />
    </>
  );
};

AudioConfigurator.propTypes = {
  sampleRates: PropTypes.arrayOf(PropTypes.number).isRequired,
  defaultSampleRate: PropTypes.number.isRequired,
  channelCounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  defaultChannelCount: PropTypes.number.isRequired,
  sampleSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  defaultSampleSize: PropTypes.number.isRequired,
  onChangeSampleRate: PropTypes.func,
  onChangeChannelCount: PropTypes.func,
  onChangeSampleSize: PropTypes.func,
};

AudioConfigurator.defaultProps = {
  onChangeSampleRate: undefined,
  onChangeChannelCount: undefined,
  onChangeSampleSize: undefined,
};

export default AudioConfigurator;
