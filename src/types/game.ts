export type MontoInicial = 20 | 50 | 100 | 200;

export interface Player {
  name: string;
  balance: number;
}

export interface GameSetupProps {
  onStartGame: (playerName: string, initialBalance: number) => void;
}
