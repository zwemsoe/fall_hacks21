import { Button } from '@chakra-ui/react';
import { Box, Center, VStack, Stack } from '@chakra-ui/layout';
import React from 'react';

export default function GameOver({ score = 0, restartGame }) {
  return (
    <Box p={8}>
      <VStack spacing="24px">
        <Center>Game over!</Center>
        <Center>You scored {score}.</Center>
        <Center>
          <Button colorScheme="yellow" variant="solid" onClick={restartGame}>
            Play again!
          </Button>
        </Center>
      </VStack>
    </Box>
  );
}
