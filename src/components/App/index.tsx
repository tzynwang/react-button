import React, { memo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import Button from '@Components/Common/Button';

function App(): React.ReactElement {
  /* Main */
  return (
    <div
      className={cn(
        css({
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
        })
      )}
    >
      <Button label="normal button" />
      <Button label="disabled button" disabled />
    </div>
  );
}

export default memo(App);
