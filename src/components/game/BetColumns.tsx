import React from "react";
import { COLUMNAS } from "../../constants/game";
import type { ColumnaApuesta } from "../../types/game";

interface BetColumnsProps {
  selectedColumn: ColumnaApuesta | null;
  onSelectColumn: (column: ColumnaApuesta) => void;
  isBettingPhase: boolean;
  isRevealed: boolean;
  result?: ColumnaApuesta | null;
}

export const BetColumns: React.FC<BetColumnsProps> = ({
  selectedColumn,
  onSelectColumn,
  isBettingPhase,
  isRevealed,
  result,
}) => {
  const getColumnStyles = (columnId: ColumnaApuesta) => {
    const isSelected = selectedColumn === columnId;
    const isWinner = result === columnId;
    const isLoser = result && result !== columnId && isRevealed;

    let styles = "border-2 transition-all duration-300 ";

    if (isSelected && isBettingPhase) {
      styles += "border-yellow-400 bg-yellow-400/10 scale-105 ";
    } else if (isWinner && isRevealed) {
      styles +=
        "border-green-400 bg-green-400/10 shadow-green-400/20 shadow-lg ";
    } else if (isLoser && isRevealed) {
      styles += "border-red-400/30 bg-red-400/5 opacity-50 ";
    } else {
      styles += "border-white/10 hover:border-white/30 hover:bg-white/5 ";
    }

    if (!isBettingPhase && !isRevealed) {
      styles += "opacity-50 cursor-not-allowed ";
    }

    if (isSelected && !isBettingPhase && !isRevealed) {
      styles += "border-yellow-400/50 bg-yellow-400/5 ";
    }

    return styles;
  };

  return (
    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
      {COLUMNAS.map((col) => {
        const isSelected = selectedColumn === col.id;
        const isWinner = result === col.id;

        return (
          <div
            key={col.id}
            onClick={() => {
              if (isBettingPhase) {
                onSelectColumn(col.id);
              }
            }}
            className={`
              p-6 rounded-xl text-center cursor-pointer
              ${getColumnStyles(col.id)}
            `}
          >
            <div className="text-2xl mb-2">{col.label}</div>
            {isSelected && isBettingPhase && (
              <div className="text-xs text-yellow-400">⬆ Seleccionado</div>
            )}
            {isWinner && isRevealed && (
              <div className="text-sm text-green-400 font-bold">🏆 GANADOR</div>
            )}
            {result && result !== col.id && isRevealed && (
              <div className="text-sm text-red-400/50">❌ Perdedor</div>
            )}
          </div>
        );
      })}
    </div>
  );
};
