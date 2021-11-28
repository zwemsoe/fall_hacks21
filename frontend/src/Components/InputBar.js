import { Input } from '@chakra-ui/react';
import React from 'react';

function InputBar() {
  return (
    <div>
      <Input
        style={{
          left: 0,
          top: 0,
          alignSelf: 'center',
          maxWidth: '30%',
        }}
        variant="filled"
        placeholder="Simon Fraser University"
      />
    </div>
  );
}

export default InputBar;
