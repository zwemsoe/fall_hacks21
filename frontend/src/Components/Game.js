import { useEffect, useState } from 'react';
import { Box, Center, VStack, Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { checkAnswerReq, getRandomKeywordReq } from '../api/endpoints';
import Lives from './Lives';

export default function Game({
  wiki = 'wiki',
  userId,
  handleGameOver,
  incrementScore,
}) {
  const [keyword, setKeyword] = useState('Loading... ⌛');
  const [lives, setLives] = useState(3);

  const decrementLive = () => {
    if (!(lives - 1)) handleGameOver();
    else setLives(lives => lives - 1);
  };

  const getNewKeyword = async () => {
    const data = await getRandomKeywordReq({ id: userId });
    setKeyword(data?.keyword);
  };

  useEffect(() => {
    getNewKeyword();
  }, []);

  const checkAnswer = async answer => {
    const { correct } = await checkAnswerReq({
      keyword,
      included: answer,
      id: userId,
    });
    if (correct) {
      incrementScore();
    } else {
      decrementLive();
    }
    getNewKeyword();
  };

  return (
    <Box p={8}>
      <VStack spacing="24px">
        <Center>{`Does this link exist on ${wiki} wikipedia page?`}</Center>
        <Center bg="tomato" h="400px" w="400px" color="white">
          {keyword}
        </Center>
        <Center>
          <Stack direction="row" spacing={4}>
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={() => checkAnswer(true)}
            >
              Yes
            </Button>
            <Button
              colorScheme="gray"
              variant="solid"
              onClick={() => checkAnswer(false)}
            >
              No
            </Button>
          </Stack>
        </Center>
      </VStack>
      <Center>
        <Lives lives={lives} />
      </Center>
    </Box>
  );
}
