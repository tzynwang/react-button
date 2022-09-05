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
        })
      )}
    >
      <Button />
    </div>
  );
}

export default memo(App);
