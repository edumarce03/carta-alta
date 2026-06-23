import React from "react";
import type { CardData } from "../../types/game";

interface CardsAreaProps {
  leftCard: CardData | null;
  rightCard: CardData | null;
  isRevealed: boolean;
}

// Mapeo de palos a letras para la API
const suitMap: Record<CardData["suit"], string> = {
  "♠": "S", // Spades
  "♥": "H", // Hearts
  "♦": "D", // Diamonds
  "♣": "C", // Clubs
};

// Mapeo de valores a letras/números para la API
const rankMap: Record<CardData["value"], string> = {
  A: "A",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "0", // La API usa 0 para 10
  J: "J",
  Q: "Q",
  K: "K",
};

export const CardsArea: React.FC<CardsAreaProps> = ({
  leftCard,
  rightCard,
  isRevealed,
}) => {
  // Función para obtener la URL de la imagen de una carta
  const getCardImageUrl = (card: CardData | null): string => {
    if (!card) {
      return "https://deckofcardsapi.com/static/img/back.png";
    }

    const rank = rankMap[card.value];
    const suit = suitMap[card.suit];

    // Formato: https://deckofcardsapi.com/static/img/AS.png
    return `https://deckofcardsapi.com/static/img/${rank}${suit}.png`;
  };

  // Renderizar una carta
  const renderCard = (card: CardData | null, isRevealed: boolean) => {
    if (!isRevealed) {
      return (
        <img
          src="https://deckofcardsapi.com/static/img/back.png"
          alt="Dorso de la carta"
          className="w-32 h-48 object-contain transition-all duration-500"
        />
      );
    }

    const imageUrl = getCardImageUrl(card);
    return (
      <img
        src={imageUrl}
        alt={card ? `${card.value}${card.suit}` : "Carta"}
        className="w-32 h-48 object-contain transition-all duration-500"
      />
    );
  };

  return (
    <div className="flex justify-center items-center gap-16 py-8">
      {/* Carta izquierda (Rojo) */}
      <div className="text-center">
        <div className="text-sm text-red-400 mb-2 font-semibold">🔴 Rojo</div>
        <div className="flex items-center justify-center">
          {renderCard(leftCard, isRevealed)}
        </div>
      </div>

      {/* VS */}
      <div className="text-4xl font-bold text-gray-600 select-none">VS</div>

      {/* Carta derecha (Azul) */}
      <div className="text-center">
        <div className="text-sm text-blue-400 mb-2 font-semibold">🔵 Azul</div>
        <div className="flex items-center justify-center">
          {renderCard(rightCard, isRevealed)}
        </div>
      </div>
    </div>
  );
};
