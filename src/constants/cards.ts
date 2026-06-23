// src/constants/cards.ts
export const CARD_VALUE_MAP = {
  A: "a",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10",
  J: "j",
  Q: "q",
  K: "k",
} as const;

export const CARD_SUIT_MAP = {
  "♠": "S",
  "♥": "H",
  "♦": "D",
  "♣": "C",
} as const;
