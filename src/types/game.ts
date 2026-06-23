// src/types/game.ts
export type MontoInicial = 20 | 50 | 100 | 200;
export type ColumnaApuesta = "rojo" | "empate" | "azul";
export type ResultadoJuego = "rojo" | "azul" | "empate";

export interface Player {
  name: string;
  balance: number;
}

export interface Apuesta {
  columna: ColumnaApuesta;
  monto: number;
}

export interface GameSetupProps {
  onStartGame: (playerName: string, initialBalance: number) => void;
}

export interface GameTableProps {
  playerName: string;
  initialBalance: number;
}

// 👇 Nuevo tipo para las cartas
export interface CardData {
  value:
    | "A"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K";
  suit: "♠" | "♥" | "♦" | "♣";
}
