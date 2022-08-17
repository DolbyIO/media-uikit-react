/**
 * These types enable IntelliSense support for custom HTML elements in React and suppresses build errors that would otherwise result
 */

import { DOMAttributes, MutableRefObject } from 'react';
import { AccordionProps, TextFieldProps, WaveformProps } from './components/core';

export {};

export type CustomElement<T> = Partial<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T & DOMAttributes<T> & { children: any; ref: MutableRefObject<any> }
>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      ['wc-accordion']: CustomElement<AccordionProps>;
      ['wc-text-field']: CustomElement<TextFieldProps>;
      ['wc-waveform']: CustomElement<WaveformProps>;
    }

    // @ts-ignore
    module '*.svg' {
      const content: any;
      export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
      export default content;
    }

    // @ts-ignore
    module '*.css' {
      const content: { [className: string]: string };
      export default content;
    }

    // @ts-ignore
    module '*.scss' {
      const content: { [className: string]: string };
      export default content;
    }
  }
}
