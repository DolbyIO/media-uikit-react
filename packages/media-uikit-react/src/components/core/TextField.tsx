import '@dolbyio/core-ui/dist/components/core/text-field';
import React, { FunctionComponent, InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** The label content, shown above the input field. */
  label?: string;
  /** The caption content, shown below the input field. */
  caption?: string;
  /** If true, the component is displayed in an error state. */
  error?: boolean;
}

const TextField: FunctionComponent<TextFieldProps> = ({ label, caption, error, ...props }) => {
  return (
    <wc-text-field label={label} caption={caption} error={error}>
      <input slot="input" type="text" {...props} />
    </wc-text-field>
  );
};

export { TextField as default, TextFieldProps };
