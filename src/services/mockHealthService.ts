
import { HealthAnalysis } from "@/types/health";

// This function simulates an API call that would normally be made to a backend
// where the actual machine learning model would process the blood test report
export const analyzeBloodTest = async (file: File): Promise<HealthAnalysis> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data that would be returned from our AI model
      resolve({
        healthScore: 78,
        abnormalMarkers: 4,
        normalMarkers: 12,
        criticalMarkers: 1,
        recommendations: [
          "Consult with your healthcare provider about your elevated glucose levels.",
          "Consider a low-sodium diet to help manage blood pressure.",
          "Regular physical activity (150 minutes/week) is recommended.",
          "Schedule a follow-up in 3 months to monitor cholesterol levels."
        ],
        metrics: [
          {
            id: "glu",
            name: "Glucose",
            value: "140",
            unit: "mg/dL",
            normalRange: "70-99 mg/dL",
            status: "high",
            info: "Blood sugar levels higher than normal range may indicate prediabetes or diabetes."
          },
          {
            id: "chol",
            name: "Total Cholesterol",
            value: "210",
            unit: "mg/dL",
            normalRange: "<200 mg/dL",
            status: "high",
            info: "Elevated cholesterol increases risk of heart disease and stroke."
          },
          {
            id: "hdl",
            name: "HDL Cholesterol",
            value: "55",
            unit: "mg/dL",
            normalRange: ">40 mg/dL",
            status: "normal",
            info: "HDL is 'good' cholesterol that helps remove other forms of cholesterol from your bloodstream."
          },
          {
            id: "ldl",
            name: "LDL Cholesterol",
            value: "130",
            unit: "mg/dL",
            normalRange: "<100 mg/dL",
            status: "high",
            info: "LDL is 'bad' cholesterol that can build up in your arteries."
          },
          {
            id: "trig",
            name: "Triglycerides",
            value: "120",
            unit: "mg/dL",
            normalRange: "<150 mg/dL",
            status: "normal",
            info: "Triglycerides are a type of fat found in your blood."
          },
          {
            id: "hgb",
            name: "Hemoglobin",
            value: "14.2",
            unit: "g/dL",
            normalRange: "13.5-17.5 g/dL",
            status: "normal",
            info: "Hemoglobin is a protein in your red blood cells that carries oxygen to your body's organs and tissues."
          },
          {
            id: "wbc",
            name: "White Blood Cells",
            value: "6.8",
            unit: "10³/µL",
            normalRange: "4.5-11.0 10³/µL",
            status: "normal",
            info: "White blood cells help your body fight infection."
          },
          {
            id: "plt",
            name: "Platelets",
            value: "250",
            unit: "10³/µL",
            normalRange: "150-450 10³/µL",
            status: "normal",
            info: "Platelets help your blood clot."
          },
          {
            id: "crp",
            name: "C-Reactive Protein",
            value: "4.2",
            unit: "mg/L",
            normalRange: "<3.0 mg/L",
            status: "high",
            info: "CRP is a marker of inflammation in the body. Elevated levels may indicate infection or chronic inflammation."
          },
          {
            id: "bun",
            name: "Blood Urea Nitrogen",
            value: "15",
            unit: "mg/dL",
            normalRange: "7-20 mg/dL",
            status: "normal",
            info: "BUN is a waste product filtered by the kidneys. It measures kidney function."
          },
          {
            id: "cre",
            name: "Creatinine",
            value: "0.9",
            unit: "mg/dL",
            normalRange: "0.6-1.2 mg/dL",
            status: "normal",
            info: "Creatinine is a waste product that comes from normal wear and tear on muscles."
          },
          {
            id: "gfr",
            name: "GFR",
            value: "90",
            unit: "mL/min/1.73m²",
            normalRange: ">90 mL/min/1.73m²",
            status: "normal",
            info: "GFR measures how well your kidneys are filtering blood."
          },
          {
            id: "alt",
            name: "ALT",
            value: "35",
            unit: "U/L",
            normalRange: "7-56 U/L",
            status: "normal",
            info: "ALT is an enzyme found primarily in the liver. Elevated levels may indicate liver damage."
          },
          {
            id: "ast",
            name: "AST",
            value: "30",
            unit: "U/L",
            normalRange: "10-40 U/L",
            status: "normal",
            info: "AST is an enzyme found in the liver, heart, and muscles. Elevated levels may indicate tissue damage."
          },
          {
            id: "tsh",
            name: "TSH",
            value: "4.8",
            unit: "mIU/L",
            normalRange: "0.4-4.0 mIU/L",
            status: "high",
            info: "TSH regulates thyroid hormone production. Elevated levels may indicate hypothyroidism."
          },
          {
            id: "a1c",
            name: "HbA1c",
            value: "6.5",
            unit: "%",
            normalRange: "<5.7%",
            status: "high",
            info: "HbA1c measures average blood sugar levels over the past 2-3 months. Elevated levels indicate prediabetes or diabetes."
          },
          {
            id: "vit-d",
            name: "Vitamin D",
            value: "22",
            unit: "ng/mL",
            normalRange: "30-80 ng/mL",
            status: "low",
            info: "Vitamin D is important for bone health and immune function. Low levels are common and may require supplementation."
          }
        ],
        diseaseRisks: [
          {
            name: "Type 2 Diabetes",
            probability: 68,
            description: "Your elevated glucose and HbA1c levels suggest an increased risk for Type 2 Diabetes.",
            riskLevel: "high"
          },
          {
            name: "Cardiovascular Disease",
            probability: 52,
            description: "Your cholesterol profile indicates a moderate risk of cardiovascular disease.",
            riskLevel: "medium"
          },
          {
            name: "Hypothyroidism",
            probability: 45,
            description: "Elevated TSH levels may indicate subclinical hypothyroidism.",
            riskLevel: "medium"
          },
          {
            name: "Vitamin D Deficiency",
            probability: 75,
            description: "Your vitamin D levels are below the recommended range, indicating deficiency.",
            riskLevel: "high"
          },
          {
            name: "Chronic Inflammation",
            probability: 38,
            description: "Slightly elevated CRP suggests low-grade inflammation.",
            riskLevel: "medium"
          },
          {
            name: "Kidney Disease",
            probability: 15,
            description: "Your kidney function markers are within normal ranges.",
            riskLevel: "low"
          },
          {
            name: "Liver Disease",
            probability: 12,
            description: "Your liver enzyme levels are normal, indicating healthy liver function.",
            riskLevel: "low"
          },
          {
            name: "Anemia",
            probability: 8,
            description: "Your hemoglobin levels are normal, indicating low risk for anemia.",
            riskLevel: "low"
          }
        ],
        chartDiseaseRisks: [
          { name: "Diabetes", value: 68, color: "#f87171" },
          { name: "Heart Disease", value: 52, color: "#facc15" },
          { name: "Thyroid Issues", value: 45, color: "#facc15" },
          { name: "Vitamin D Deficiency", value: 75, color: "#ef4444" },
          { name: "Inflammation", value: 38, color: "#facc15" }
        ],
        markerDistribution: [
          { name: "Metabolic", normal: 2, abnormal: 3 },
          { name: "Cardiovascular", normal: 3, abnormal: 1 },
          { name: "Blood", normal: 3, abnormal: 0 },
          { name: "Liver", normal: 2, abnormal: 0 },
          { name: "Kidney", normal: 2, abnormal: 0 },
          { name: "Hormonal", normal: 0, abnormal: 1 }
        ]
      });
    }, 4000); // Simulate 4-second processing time
  });
};
