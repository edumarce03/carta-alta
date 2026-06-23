import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { MONTOS_INICIALES } from "../../constants/game";
import type { MontoInicial, GameSetupProps } from "../../types/game";

export const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState("");
  const [selectedMonto, setSelectedMonto] = useState<MontoInicial>(20);
  const [errors, setErrors] = useState({ name: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    if (!playerName.trim()) {
      setErrors({ name: "El nombre es obligatorio" });
      return;
    }

    if (playerName.trim().length < 2) {
      setErrors({ name: "El nombre debe tener al menos 2 caracteres" });
      return;
    }

    // Iniciar juego
    onStartGame(playerName.trim(), selectedMonto);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card central con fondo semi-transparente */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              🎴 Carta Alta
            </h1>
            <p className="text-gray-400 text-sm">
              Ingresa tus datos para comenzar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre del jugador */}
            <Input
              label="Nombre del jugador"
              placeholder="Ej: Edu"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setErrors({ name: "" });
              }}
              error={errors.name}
              autoFocus
            />

            {/* Selección de monto inicial */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Monto inicial
              </label>
              <div className="grid grid-cols-2 gap-3">
                {MONTOS_INICIALES.map((monto) => (
                  <button
                    key={monto}
                    type="button"
                    onClick={() => setSelectedMonto(monto)}
                    className={`
                      py-3 px-4 rounded-lg font-semibold text-sm
                      transition-all duration-200
                      ${
                        selectedMonto === monto
                          ? "bg-red-600 text-white ring-2 ring-red-500/50"
                          : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                      }
                    `}
                  >
                    S/ {monto}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón Aceptar */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-lg"
            >
              Aceptar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
