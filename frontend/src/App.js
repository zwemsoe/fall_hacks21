import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react';
import React, { useState } from 'react';
import Game from './Components/Game';
import GameOver from './Components/GameOver';
import InputBar from './Components/InputBar';
import Leaderboard from './Components/Leaderboard';
import NameInput from './Components/NameInput';
import Topbar from './Components/Topbar';
import URLInput from './Components/URLInput';
import {
  addUserReq,
  createScopeReq,
  updateScoreReq,
  resetScopeReq,
} from './api/endpoints';

function App() {
  const [name, setName] = useState('');
  const [wiki, setWiki] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [user, setUser] = useState();
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');

  const incrementScore = () => {
    setScore(score => score + 1);
  };

  const toggleShowLeaderboard = () =>
    setShowLeaderBoard(showLeaderBoard => !showLeaderBoard);

  const verifyNotEmpty = input => {
    return !!input;
  };

  const handleUsernameChange = () => {
    if (verifyNotEmpty(name)) {
      addUserReq({ name }).then(res => {
        setUser(res.user);
      });
    }
  };

  const handleWikiChange = async () => {
    setGameLoading(true);
    if (verifyNotEmpty(wiki)) {
      try {
        const res = await createScopeReq({ title: wiki, id: user.id });
        setError('');
        setUser(res.user);
        setGameStarted(true);
      } catch (err) {
        setError("This page doesn't exist");
        setGameStarted(false);
      }
    }
    setGameLoading(false);
  };

  const handleGameOver = () => {
    updateScoreReq({ id: user.id, scoreToAdd: score }).then(data => {
      setUser(data.user);
      setGameStarted(false);
      setGameOver(true);
    });
  };

  const restartGame = () => {
    resetScopeReq({ id: user.id }).then(res => {
      setUser(res?.user);
      setGameStarted(false);
      setGameOver(false);
      setWiki('');
      setScore(0);
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Topbar setShowLeaderBoard={toggleShowLeaderboard} />
          <Leaderboard
            isOpen={showLeaderBoard}
            onClose={() => setShowLeaderBoard(false)}
          />

          {user?.name ? (
            user?.scope ? (
              <>
                {gameStarted && (
                  <Game
                    wiki={wiki}
                    userId={user.id}
                    handleGameOver={handleGameOver}
                    incrementScore={incrementScore}
                  />
                )}
                {gameOver && (
                  <GameOver score={score} restartGame={restartGame} />
                )}
              </>
            ) : (
              <URLInput
                error={error}
                wiki={wiki}
                setWiki={setWiki}
                handleWiki={handleWikiChange}
                isLoading={gameLoading}
              />
            )
          ) : (
            <NameInput
              name={name}
              setName={setName}
              handleUsernameChange={handleUsernameChange}
            />
          )}
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
