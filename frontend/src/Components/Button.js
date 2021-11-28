import { Button } from '@chakra-ui/react';
import React from 'react';

function StyledButton({ text, onClick, isLoading }) {
  return (
    <div>
      <Button
        style={{
          position: 'relative',
          left: 0,
          top: 0,
          alignSelf: 'center',
        }}
        height="40px"
        width="120px"
        textColor="black"
        onClick={onClick}
        isLoading={isLoading}
      >
        {text}
      </Button>
    </div>
  );
}

export default StyledButton;
