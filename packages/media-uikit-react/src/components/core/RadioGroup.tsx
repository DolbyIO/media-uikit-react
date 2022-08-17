import React, { useState } from 'react';
import PropTypes from 'prop-types';

type Props = {
  name: string;
  values: number[];
  defaultValue: number;
  onChangeValue?: (value: number) => void;
  displayTitle?: boolean;
};

/**
 * Primary RadioGroup control, only support number type in this stage
 */
const RadioGroup = ({
  name,
  values,
  defaultValue,
  onChangeValue,
  displayTitle,
  ...props
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  if (values.length === 0) return <span />;
  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {displayTitle && <h4>{name}</h4>}
      {Array.from(new Set(values)).map((v) => (
        <label htmlFor={String(v)} key={v}>
          <input
            type="radio"
            name={name}
            value={v}
            id={String(v)}
            checked={value === v}
            onChange={(e) => {
              const newValue = Number((e.target as HTMLInputElement).value);
              setValue(newValue);
              if (onChangeValue) onChangeValue(newValue);
            }}
          />
          {v}
        </label>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  // Unique name of the group
  name: PropTypes.string.isRequired,
  // Each value must be unique, this component will remove duplicate values
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  // No option will be selected if defaultValue is not in the values array
  defaultValue: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func,
  displayTitle: PropTypes.bool,
};

RadioGroup.defaultProps = {
  onChangeValue: undefined,
  displayTitle: true,
};

export default RadioGroup;
