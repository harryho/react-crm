import React from 'react';
// import PropTypes from 'prop-types';
import './button.css';
// import * as CSS from 'csstype';

export interface ButtonProps {
  /**
     * Is this the principal call to action on the page?
     */
  primary: boolean;
  /**
   * What style to use
   */
  style: React.CSSProperties | undefined;
  /**
   * How large should the button be?
   */
  size: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary = false, size = 'medium', ...buttonProps }: ButtonProps) => {
  const {
    label,
    style,
    ...props
  } = buttonProps;

  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={style}
      {...props}
    >
      {label}
    </button>
  );
};

