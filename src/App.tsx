import React, { useState } from "react";
import { GameSetup } from "./components/setup/GameSetup";

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

  // Temporal - luego reemplazaremos con GameTable
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-3xl">Bienvenido {playerName}</h1>
        <p className="text-gray-400">Saldo: S/ {balance}</p>
        <p className="text-sm text-gray-500 mt-4">Próximo: Mesa de juego</p>
      </div>
    </div>
  );
}

export default App;
