import { Animal } from "../types";

export interface HerdMetrics {
  totalHerd: number;
  healthyCount: number;
  healthyPercentage: number;
  vaccinationsDue: number;
  dailyMilkLiters: number;
  monthlyRevenueFormatted: string;
  herdHealthIndexFormatted: string;
  averageWeightKg: number;
}

export function calculateRealtimeHerdMetrics(animals: Animal[]): HerdMetrics {
  const totalHerd = animals.length;
  if (totalHerd === 0) {
    return {
      totalHerd: 0,
      healthyCount: 0,
      healthyPercentage: 100,
      vaccinationsDue: 0,
      dailyMilkLiters: 0,
      monthlyRevenueFormatted: "₹0",
      herdHealthIndexFormatted: "100%",
      averageWeightKg: 0,
    };
  }

  const healthyCount = animals.filter(
    (a) => a.status === "Healthy" || a.healthScore >= 90
  ).length;

  const healthyPercentage = Math.round((healthyCount / totalHerd) * 100);

  const vaccinationsDue = animals.filter(
    (a) => a.vaccinationStatus !== "Up to Date"
  ).length;

  const totalHealthScoreSum = animals.reduce((sum, a) => sum + (a.healthScore || 90), 0);
  const avgHealthScore = Math.round(totalHealthScoreSum / totalHerd);

  const totalWeightSum = animals.reduce((sum, a) => sum + (a.weight || 350), 0);
  const averageWeightKg = Math.round(totalWeightSum / totalHerd);

  // Estimate daily milk yield based on active cows (average 6.5L/day per cow)
  const femaleCattleCount = animals.filter(
    (a) => a.species === "Cattle" && a.gender === "Female"
  ).length;

  const dailyMilkLiters = femaleCattleCount > 0 ? femaleCattleCount * 14 : totalHerd * 8;
  const monthlyLiters = dailyMilkLiters * 30;
  
  // A2/A1 organic milk average price in India: ₹60-₹75 per liter
  const estimatedMonthlyRevRupees = monthlyLiters * 68;

  let monthlyRevenueFormatted = `₹${(estimatedMonthlyRevRupees / 1000).toFixed(1)}k`;
  if (estimatedMonthlyRevRupees >= 100000) {
    monthlyRevenueFormatted = `₹${(estimatedMonthlyRevRupees / 100000).toFixed(2)}L`;
  }

  return {
    totalHerd,
    healthyCount,
    healthyPercentage,
    vaccinationsDue,
    dailyMilkLiters,
    monthlyRevenueFormatted,
    herdHealthIndexFormatted: `${avgHealthScore}%`,
    averageWeightKg,
  };
}
