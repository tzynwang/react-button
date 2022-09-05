import React, { memo, createRef, useCallback, useEffect } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import type { ButtonProps } from './types';

const rippleAnimation = keyframes`
to {
  transform: scale(2);
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
  fontSize: 'inherit',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  backgroundColor: '#4e342e',
  color: '#fff',
  cursor: 'pointer',
});

function Button(props: ButtonProps): React.ReactElement {
  /* States */
  const { label, disableRipple = false, type, className, ...rest } = props;
  const buttonRef = createRef<HTMLButtonElement>();

  /* Function */
  const playRipple = useCallback(
    (e: MouseEvent): void => {
      if (disableRipple) return;
      const target = e.currentTarget as HTMLButtonElement;
      const rippleSpan = document.createElement('span');
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;
      rippleSpan.style.width = rippleSpan.style.height = `${diameter}px`;
      rippleSpan.style.left = `${e.clientX - (target.offsetLeft + radius)}px`;
      rippleSpan.style.top = `${e.clientY - (target.offsetTop + radius)}px`;
      rippleSpan.classList.add(
        css({
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, .3)',
          opacity: 1,
          transform: 'scale(0)',
          animation: `${rippleAnimation} .6s ease`,
        })
      );
      target.appendChild(rippleSpan);
    },
    [disableRipple]
  );
  const removeRippleSpan = useCallback((): void => {
    buttonRef.current?.childNodes.forEach((child) => {
      if (child.nodeType === 1) {
        child.remove();
      }
    });
  }, [buttonRef]);

  /* Hooks */
  useEffect(() => {
    const button = buttonRef.current;
    button?.addEventListener('click', playRipple);
    button?.addEventListener('animationend', removeRippleSpan);
    return () => {
      button?.removeEventListener('click', playRipple);
      button?.removeEventListener('animationend', removeRippleSpan);
    };
  }, [buttonRef, playRipple, removeRippleSpan]);

  /* Main */
  return (
    <button
      type={type ? type : 'button'}
      className={cn(defaultButtonStyle, className)}
      ref={buttonRef}
      {...rest}
    >
      {label ? label : 'button'}
    </button>
  );
}

export default memo(Button);
