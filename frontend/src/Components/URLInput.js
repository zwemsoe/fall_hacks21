import React from 'react';
import { Center } from '@chakra-ui/layout';
import StyledButton from './Button';
import { Input } from '@chakra-ui/input';

function URLInput({ setWiki, wiki, handleWiki, isLoading = false, error }) {
  return (
    <div>
      <Center color="red">{error}</Center>
      <Input
        style={{
          left: 0,
          top: 0,
          alignSelf: 'center',
          maxWidth: '30%',
        }}
        value={wiki}
        onChange={e => setWiki(e.target.value)}
        variant="filled"
        placeholder="Simon Fraser University"
      />
      <StyledButton text="Start" onClick={handleWiki} isLoading={isLoading} />
    </div>
  );
}

export default URLInput;
