import React from "react";

interface GameHeaderProps {
  playerName: string;
  balance: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  playerName,
  balance,
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white/5 border-b border-white/10">
      <div>
        <h2 className="text-xl font-bold text-white">🎴 Carta Alta</h2>
        <p className="text-sm text-gray-400">Jugador: {playerName}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-400">Saldo</p>
        <p className="text-2xl font-bold text-green-400">S/ {balance}</p>
      </div>
    </div>
  );
};
