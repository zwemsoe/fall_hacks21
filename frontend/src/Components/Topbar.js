import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Avatars from './Avatars';

export default function Topbar({ setShowLeaderBoard }) {
  const handleClick = () => {
    setShowLeaderBoard();
  };

  return (
    <Box
      w={'100%'}
      h={16}
      justifyContent="space-between"
      alignItems="center"
      display="flex"
    >
      <Avatars />
      <Button variant="link" onClick={handleClick} mr={4}>
        {'Leaderboard 🏆'}
      </Button>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Box>
  );
}
