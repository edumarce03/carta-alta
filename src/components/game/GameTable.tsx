import React, { useState, useEffect } from "react";
import { GameHeader } from "./GameHeader";
import { CardsArea } from "./CardsArea";
import { BetColumns } from "./BetColumns";
import { ChipSelector } from "./ChipSelector";
import { DENOMINACIONES_POR_MONTO, TIEMPO_APUESTA } from "../../constants/game";
import type {
  ColumnaApuesta,
  GameTableProps,
  CardData,
} from "../../types/game";

export const GameTable: React.FC<GameTableProps> = ({
  playerName,
  initialBalance,
}) => {
  // Estados del juego
  const [balance, setBalance] = useState(initialBalance);
  const [selectedColumn, setSelectedColumn] = useState<ColumnaApuesta | null>(
    null,
  );
  const [betAmount, setBetAmount] = useState<number>(0);
  const [isBettingPhase, setIsBettingPhase] = useState(true);
  const [timeLeft, setTimeLeft] = useState(TIEMPO_APUESTA);
  const [isRevealed, setIsRevealed] = useState(false);
  const [result, setResult] = useState<ColumnaApuesta | null>(null);
  const [leftCard, setLeftCard] = useState<CardData | null>(null);
  const [rightCard, setRightCard] = useState<CardData | null>(null);

  // Obtener denominaciones disponibles según el monto inicial
  const getDenominations = () => {
    if (initialBalance <= 20) return DENOMINACIONES_POR_MONTO[20];
    if (initialBalance <= 50) return DENOMINACIONES_POR_MONTO[50];
    if (initialBalance <= 100) return DENOMINACIONES_POR_MONTO[100];
    return DENOMINACIONES_POR_MONTO[200];
  };

  // Función para generar una carta aleatoria
  const getRandomCard = (): CardData => {
    const suits: CardData["suit"][] = ["♠", "♥", "♦", "♣"];
    const values: CardData["value"][] = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];

    return { value: randomValue, suit: randomSuit };
  };

  // Timer de 10 segundos
  useEffect(() => {
    if (!isBettingPhase || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRevealCards();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBettingPhase, timeLeft]);

  // Revelar cartas
  const handleRevealCards = () => {
    setIsBettingPhase(false);
    setIsRevealed(false);

    // Generar cartas aleatorias reales
    const randomLeft = getRandomCard();
    const randomRight = getRandomCard();

    setLeftCard(randomLeft);
    setRightCard(randomRight);

    // Determinar resultado basado en las cartas
    // Por ahora usamos aleatorio, luego implementaremos la lógica real
    const resultados: ColumnaApuesta[] = ["rojo", "azul", "empate"];
    const randomResult =
      resultados[Math.floor(Math.random() * resultados.length)];
    setResult(randomResult);

    setIsRevealed(true);

    // Liquidar apuesta después de un breve retraso
    setTimeout(() => {
      handleLiquidateBet(randomResult);
    }, 1000);
  };

  // Liquidar apuesta
  const handleLiquidateBet = (resultado: ColumnaApuesta) => {
    // Si no seleccionó columna o monto, pierde automáticamente
    if (!selectedColumn || betAmount === 0) {
      setTimeout(() => resetRound(), 2000);
      return;
    }

    let ganancia = 0;
    if (selectedColumn === resultado) {
      if (resultado === "empate") {
        ganancia = betAmount * 11;
      } else {
        ganancia = betAmount * 2;
      }
      setBalance((prev) => prev + ganancia);
    } else {
      setBalance((prev) => prev - betAmount);
    }

    setTimeout(() => {
      resetRound();
    }, 3000);
  };

  // Resetear ronda
  const resetRound = () => {
    setSelectedColumn(null);
    setBetAmount(0);
    setIsBettingPhase(true);
    setTimeLeft(TIEMPO_APUESTA);
    setIsRevealed(false);
    setResult(null);
    setLeftCard(null);
    setRightCard(null);

    // Verificar si el juego terminó
    if (balance <= 0) {
      alert("💀 ¡Has perdido todo tu saldo! El juego ha terminado.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <GameHeader playerName={playerName} balance={balance} />

      <div className="max-w-4xl mx-auto p-4">
        {/* Temporizador */}
        <div className="text-center py-2">
          <div className="inline-block px-4 py-1 bg-white/5 rounded-full">
            <span className="text-sm text-gray-400">
              ⏱ Tiempo restante:
              <span
                className={`ml-2 font-bold ${timeLeft <= 3 ? "text-red-400" : "text-white"}`}
              >
                {timeLeft}s
              </span>
            </span>
          </div>
          {isBettingPhase && (
            <p className="text-xs text-gray-500 mt-1">
              Selecciona columna y monto antes de que termine el tiempo
            </p>
          )}
        </div>

        {/* Zona de cartas */}
        <CardsArea
          leftCard={leftCard}
          rightCard={rightCard}
          isRevealed={isRevealed}
        />

        {/* Columnas de apuestas */}
        <div className="mt-6">
          <BetColumns
            selectedColumn={selectedColumn}
            onSelectColumn={setSelectedColumn}
            isBettingPhase={isBettingPhase}
            isRevealed={isRevealed}
            result={result}
          />
        </div>

        {/* Selector de fichas */}
        {isBettingPhase && (
          <div className="mt-8 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                {selectedColumn
                  ? "Selecciona el monto a apostar"
                  : "Primero selecciona una columna"}
              </p>
              {selectedColumn && (
                <ChipSelector
                  denominations={getDenominations()}
                  selectedAmount={betAmount}
                  onSelectAmount={setBetAmount}
                  balance={balance}
                />
              )}
            </div>
          </div>
        )}

        {/* Estado de la apuesta - resumen */}
        {isBettingPhase && selectedColumn && betAmount > 0 && (
          <div className="text-center mt-4">
            <div className="inline-block px-4 py-2 bg-white/5 rounded-lg border border-white/10">
              <span className="text-sm text-gray-400">
                Apuesta:{" "}
                <span className="text-yellow-400 font-bold">
                  S/ {betAmount}
                </span>{" "}
                a{" "}
                <span className="font-bold">
                  {selectedColumn === "rojo" && "🔴 Rojo"}
                  {selectedColumn === "azul" && "🔵 Azul"}
                  {selectedColumn === "empate" && "⚪ Empate"}
                </span>
              </span>
            </div>
          </div>
        )}

        {/* Estado de espera */}
        {!isBettingPhase && !isRevealed && (
          <div className="text-center text-yellow-400 mt-4">
            ⏳ Revelando cartas...
          </div>
        )}

        {/* Resultado */}
        {isRevealed && result && (
          <div className="text-center mt-4">
            <div
              className={`
              inline-block px-6 py-2 rounded-lg font-bold text-lg
              ${result === "rojo" ? "bg-red-500/20 text-red-400" : ""}
              ${result === "azul" ? "bg-blue-500/20 text-blue-400" : ""}
              ${result === "empate" ? "bg-yellow-500/20 text-yellow-400" : ""}
            `}
            >
              {result === "rojo" && "🔴 ¡Gana Rojo!"}
              {result === "azul" && "🔵 ¡Gana Azul!"}
              {result === "empate" && "⚪ ¡Empate!"}
            </div>
            {selectedColumn && betAmount > 0 ? (
              selectedColumn === result ? (
                <p className="text-green-400 text-sm mt-2">
                  🎉 ¡Ganaste S/{" "}
                  {result === "empate" ? betAmount * 11 : betAmount * 2}!
                  {result === "empate" ? " (x11)" : " (x2)"}
                </p>
              ) : (
                <p className="text-red-400 text-sm mt-2">
                  😢 Perdiste S/ {betAmount}
                </p>
              )
            ) : (
              <p className="text-gray-400 text-sm mt-2">
                ⏭ No realizaste apuesta esta ronda
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
