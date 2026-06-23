import React, { useState } from "react";
import { GameSetup } from "./components/setup/GameSetup";
import { GameTable } from "./components/game/GameTable";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [balance, setBalance] = useState(0);

  const handleStartGame = (name: string, initialBalance: number) => {
    setPlayerName(name);
    setBalance(initialBalance);
    setIsGameStarted(true);
  };

  if (!isGameStarted) {
    return <GameSetup onStartGame={handleStartGame} />;
  }

  return <GameTable playerName={playerName} initialBalance={balance} />;
}

export default App;
