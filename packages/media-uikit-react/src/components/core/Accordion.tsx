import '@dolbyio/core-ui/dist/components/core/accordian';
import React, { FunctionComponent, ReactNode } from 'react';

interface AccordionProps {
  /** If true, expands the accordion, otherwise collapses it. */
  expanded?: boolean;
  /** TODO: */
  heading?: ReactNode;
  children?: any;
}

const Accordion: FunctionComponent<AccordionProps> = ({ children, heading, expanded }) => (
  <wc-accordion expanded={expanded}>
    <div slot="heading">{heading}</div>
    <div slot="content">{children}</div>
  </wc-accordion>
);

export { Accordion as default, AccordionProps };
