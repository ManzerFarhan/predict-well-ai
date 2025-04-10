
export interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  normalRange: string;
  status: "normal" | "low" | "high";
  info: string;
}

export interface DiseaseRisk {
  name: string;
  probability: number;
  description: string;
  riskLevel: "low" | "medium" | "high" | "critical";
}

export interface MarkerDistribution {
  name: string;
  normal: number;
  abnormal: number;
}

export interface ChartDiseaseRisk {
  name: string;
  value: number;
  color: string;
}

export interface HealthAnalysis {
  healthScore: number;
  abnormalMarkers: number;
  normalMarkers: number;
  criticalMarkers: number;
  recommendations: string[];
  metrics: HealthMetric[];
  diseaseRisks: DiseaseRisk[];
  chartDiseaseRisks: ChartDiseaseRisk[];
  markerDistribution: MarkerDistribution[];
}
