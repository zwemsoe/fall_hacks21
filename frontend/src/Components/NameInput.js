import { React, useState, useRef } from 'react';
import StyledButton from './Button';
import { Input } from '@chakra-ui/input';

export default function NameInput({ setName, name, handleUsernameChange }) {
  return (
    <div>
      <Input
        style={{
          left: 0,
          top: 0,
          alignSelf: 'center',
          maxWidth: '30%',
        }}
        value={name}
        onChange={e => setName(e.target.value)}
        variant="filled"
        placeholder="Enter username"
      />
      <StyledButton text="Enter" onClick={handleUsernameChange} />
    </div>
  );
}
