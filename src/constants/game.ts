import type { MontoInicial } from "../types/game";

export const MONTOS_INICIALES: MontoInicial[] = [20, 50, 100, 200];

export const DENOMINACIONES_POR_MONTO: Record<MontoInicial, number[]> = {
  20: [5, 10, 20],
  50: [5, 10, 20, 25],
  100: [5, 10, 20, 25, 50],
  200: [5, 10, 20, 25, 50, 100],
};
