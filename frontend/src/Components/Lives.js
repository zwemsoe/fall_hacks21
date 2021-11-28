import { Icon } from '@chakra-ui/react';
import { Box, Center, HStack } from '@chakra-ui/layout';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function Lives({ lives = 3 }) {
  return (
    <Box p={8}>
      <Center>
        <HStack spacing="10px">
          <Icon
            as={FaHeart}
            w={6}
            h={6}
            color={lives >= 1 ? 'red.500' : 'gray.400'}
          />
          <Icon
            as={FaHeart}
            w={6}
            h={6}
            color={lives >= 2 ? 'red.500' : 'gray.400'}
          />
          <Icon
            as={FaHeart}
            w={6}
            h={6}
            color={lives >= 3 ? 'red.500' : 'gray.400'}
          />
        </HStack>
      </Center>
    </Box>
  );
}
