import { Box, Text } from '@chakra-ui/layout';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { leaderBoardReq } from '../api/endpoints';

export default function Leaderboard({ isOpen, onClose }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const { users } = await leaderBoardReq();
      setData(users);
      setLoading(false);
    })();
  }, [isOpen]);

  const renderLeaderboard = () =>
    data.map(({ name, score }, i) => (
      <Tr>
        <Td>{i + 1}</Td>
        <Td>{name}</Td>
        <Td isNumeric>{score}</Td>
      </Tr>
    ));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box p={8}>
            {loading && <Text>{'Loading ⌛'}</Text>}
            {!loading && data.length ? (
              <Table variant="striped" colorScheme="teal">
                <TableCaption>People with the highest scores</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Rank #</Th>
                    <Th>Username</Th>
                    <Th isNumeric>Score</Th>
                  </Tr>
                </Thead>
                <Tbody>{renderLeaderboard()}</Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Rank #</Th>
                    <Th>Username</Th>
                    <Th isNumeric>Score</Th>
                  </Tr>
                </Tfoot>
              </Table>
            ) : (
              <Text>{'No gamers found 😭'}</Text>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
