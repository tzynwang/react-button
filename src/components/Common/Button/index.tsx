import React, { memo, createRef, useCallback, useEffect } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import type { ButtonProps } from './types';

const rippleAnimation = keyframes`
to {
  transform: scale(1.5);
  opacity: 0;
}
`;
const defaultButtonStyle = css({
  minWidth: '40px',
  minHeight: '28px',
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-block',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '14px',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  letterSpacing: '.5px',
  textTransform: 'uppercase',
  backgroundColor: '#4e342e',
  color: '#fff',
  transition: 'background-color .2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#362420',
  },
});
const disabledButtonStyle = css({
  backgroundColor: 'rgba(113, 92, 87, .4)',
  cursor: 'default',
  pointerEvents: 'none',
});
const rippleSpanStyle = css({
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, .3)',
  transform: 'scale(0)',
  animation: `${rippleAnimation} .7s ease`,
});

function Button(props: ButtonProps): React.ReactElement {
  /* States */
  const {
    label,
    disableRipple = false,
    className,
    disabled,
    type,
    ...rest
  } = props;
  const buttonRef = createRef<HTMLButtonElement>();
  const rippleRef = createRef<HTMLSpanElement>();

  /* Function */
  const playRipple = useCallback(
    (e: MouseEvent): void => {
      if (disableRipple) return;
      const target = e.currentTarget as HTMLButtonElement;
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;
      const ripple = rippleRef.current;
      if (ripple) {
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - (target.offsetLeft + radius)}px`;
        ripple.style.top = `${e.clientY - (target.offsetTop + radius)}px`;
        ripple.classList.add(rippleSpanStyle);
      }
    },
    [disableRipple, rippleRef]
  );
  const removeRipple = useCallback((): void => {
    const ripple = rippleRef.current;
    if (ripple) {
      ripple.classList.remove(rippleSpanStyle);
    }
  }, [rippleRef]);

  /* Hooks */
  useEffect(() => {
    const button = buttonRef.current;
    button?.addEventListener('click', playRipple);
    button?.addEventListener('animationend', removeRipple);
    return () => {
      button?.removeEventListener('click', playRipple);
      button?.removeEventListener('animationend', removeRipple);
    };
  }, [buttonRef, playRipple, removeRipple]);

  /* Main */
  return (
    <button
      className={cn(
        defaultButtonStyle,
        disabled && disabledButtonStyle,
        className
      )}
      disabled={disabled}
      ref={buttonRef}
      type={type ? type : 'button'}
      {...rest}
    >
      {label ? label : 'button'}
      <span role="presentation" ref={rippleRef} />
    </button>
  );
}

export default memo(Button);
