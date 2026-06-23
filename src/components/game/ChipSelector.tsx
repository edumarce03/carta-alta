import React from "react";

interface ChipSelectorProps {
  denominations: number[];
  selectedAmount: number;
  onSelectAmount: (amount: number) => void;
  balance: number;
}

export const ChipSelector: React.FC<ChipSelectorProps> = ({
  denominations,
  selectedAmount,
  onSelectAmount,
  balance,
}) => {
  // Filtrar denominaciones que no excedan el saldo
  const availableDenominations = denominations.filter((d) => d <= balance);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {availableDenominations.map((denom) => (
        <button
          key={denom}
          onClick={() => onSelectAmount(denom)}
          className={`
            px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200
            ${
              selectedAmount === denom
                ? "bg-yellow-500 text-black ring-2 ring-yellow-400/50 scale-105"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
            }
          `}
        >
          S/ {denom}
        </button>
      ))}
      {availableDenominations.length === 0 && (
        <p className="text-sm text-red-400">Saldo insuficiente</p>
      )}
    </div>
  );
};
