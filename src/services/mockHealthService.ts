import { HealthAnalysis } from "@/types/health";

// This function simulates an API call that would normally be made to a backend
// where the actual machine learning model would process the blood test report
export const analyzeBloodTest = async (file: File): Promise<HealthAnalysis> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate different analysis based on the file name
      const fileName = file.name.toLowerCase();
      
      // Default analysis (original)
      let analysis: HealthAnalysis = {
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
      };
      
      // Variant 1: Diabetic profile
      if (fileName.includes("diabetes") || fileName.includes("glucose")) {
        analysis = {
          ...analysis,
          healthScore: 62,
          abnormalMarkers: 6,
          normalMarkers: 10,
          criticalMarkers: 2,
          recommendations: [
            "Urgent consultation with an endocrinologist is recommended.",
            "Monitor blood glucose levels daily.",
            "Follow a low-carbohydrate diet as advised by a nutritionist.",
            "Begin or continue regular moderate exercise (30 minutes daily)."
          ],
          metrics: [
            {
              id: "glu",
              name: "Glucose",
              value: "210",
              unit: "mg/dL",
              normalRange: "70-99 mg/dL",
              status: "high",
              info: "Blood sugar levels significantly higher than normal range, indicating diabetes."
            },
            {
              id: "a1c",
              name: "HbA1c",
              value: "8.2",
              unit: "%",
              normalRange: "<5.7%",
              status: "high",
              info: "HbA1c indicates average blood glucose levels over the past 3 months. Your level indicates diabetes."
            },
            {
              id: "chol",
              name: "Total Cholesterol",
              value: "245",
              unit: "mg/dL",
              normalRange: "<200 mg/dL",
              status: "high",
              info: "Elevated cholesterol increases risk of heart disease and stroke."
            },
            {
              id: "hdl",
              name: "HDL Cholesterol",
              value: "38",
              unit: "mg/dL",
              normalRange: ">40 mg/dL",
              status: "low",
              info: "HDL is 'good' cholesterol. Low levels increase cardiovascular risk."
            },
            {
              id: "ldl",
              name: "LDL Cholesterol",
              value: "155",
              unit: "mg/dL",
              normalRange: "<100 mg/dL",
              status: "high",
              info: "LDL is 'bad' cholesterol that can build up in your arteries."
            },
            {
              id: "trig",
              name: "Triglycerides",
              value: "220",
              unit: "mg/dL",
              normalRange: "<150 mg/dL",
              status: "high",
              info: "Elevated triglycerides often associated with diabetes and increased heart disease risk."
            },
            {
              id: "crp",
              name: "C-Reactive Protein",
              value: "5.8",
              unit: "mg/L",
              normalRange: "<3.0 mg/L",
              status: "high",
              info: "Elevated CRP indicates inflammation, common in diabetic patients."
            },
            // Include other metrics from the original dataset (keep as normal)
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
              id: "bun",
              name: "Blood Urea Nitrogen",
              value: "18",
              unit: "mg/dL",
              normalRange: "7-20 mg/dL",
              status: "normal",
              info: "BUN is a waste product filtered by the kidneys. It measures kidney function."
            },
            {
              id: "cre",
              name: "Creatinine",
              value: "1.1",
              unit: "mg/dL",
              normalRange: "0.6-1.2 mg/dL",
              status: "normal",
              info: "Creatinine is a waste product that comes from normal wear and tear on muscles."
            },
            {
              id: "gfr",
              name: "GFR",
              value: "85",
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
              value: "3.8",
              unit: "mIU/L",
              normalRange: "0.4-4.0 mIU/L",
              status: "normal",
              info: "TSH regulates thyroid hormone production."
            },
            {
              id: "vit-d",
              name: "Vitamin D",
              value: "28",
              unit: "ng/mL",
              normalRange: "30-80 ng/mL",
              status: "low",
              info: "Vitamin D is important for bone health and immune function. Low levels are common and may require supplementation."
            }
          ],
          diseaseRisks: [
            {
              name: "Type 2 Diabetes",
              probability: 92,
              description: "Your glucose and HbA1c levels strongly indicate Type 2 Diabetes.",
              riskLevel: "critical"
            },
            {
              name: "Cardiovascular Disease",
              probability: 78,
              description: "Diabetic patients with high cholesterol have increased cardiovascular risk.",
              riskLevel: "high"
            },
            {
              name: "Diabetic Nephropathy",
              probability: 45,
              description: "Kidney complications are common in diabetic patients. Regular monitoring advised.",
              riskLevel: "medium"
            },
            {
              name: "Diabetic Retinopathy",
              probability: 38,
              description: "Eye complications may develop with long-standing diabetes.",
              riskLevel: "medium"
            },
            {
              name: "Vitamin D Deficiency",
              probability: 70,
              description: "Your vitamin D levels are below the recommended range, indicating deficiency.",
              riskLevel: "high"
            },
            {
              name: "Chronic Inflammation",
              probability: 65,
              description: "Elevated CRP suggests chronic inflammation, common in diabetes.",
              riskLevel: "high"
            },
            {
              name: "Kidney Disease",
              probability: 25,
              description: "Your kidney function markers are slightly outside normal ranges.",
              riskLevel: "medium"
            },
            {
              name: "Liver Disease",
              probability: 12,
              description: "Your liver enzyme levels are normal, indicating healthy liver function.",
              riskLevel: "low"
            }
          ],
          chartDiseaseRisks: [
            { name: "Diabetes", value: 92, color: "#ef4444" },
            { name: "Heart Disease", value: 78, color: "#f87171" },
            { name: "Kidney Issues", value: 45, color: "#facc15" },
            { name: "Eye Issues", value: 38, color: "#facc15" },
            { name: "Inflammation", value: 65, color: "#f87171" }
          ],
          markerDistribution: [
            { name: "Metabolic", normal: 0, abnormal: 5 },
            { name: "Cardiovascular", normal: 2, abnormal: 2 },
            { name: "Blood", normal: 3, abnormal: 0 },
            { name: "Liver", normal: 2, abnormal: 0 },
            { name: "Kidney", normal: 2, abnormal: 0 },
            { name: "Hormonal", normal: 1, abnormal: 0 }
          ]
        };
      }
      
      // Variant 2: Heart disease profile
      else if (fileName.includes("heart") || fileName.includes("cardio") || fileName.includes("cholesterol")) {
        analysis = {
          ...analysis,
          healthScore: 68,
          abnormalMarkers: 5,
          normalMarkers: 11,
          criticalMarkers: 1,
          recommendations: [
            "Consult with a cardiologist regarding your cholesterol profile.",
            "Consider statin therapy as per your doctor's advice.",
            "Follow a heart-healthy diet low in saturated fats.",
            "Engage in moderate aerobic exercise for 30 minutes, 5 days per week.",
            "Reduce sodium intake to help manage blood pressure."
          ],
          metrics: [
            {
              id: "chol",
              name: "Total Cholesterol",
              value: "265",
              unit: "mg/dL",
              normalRange: "<200 mg/dL",
              status: "high",
              info: "Significantly elevated cholesterol increases risk of heart disease and stroke."
            },
            {
              id: "hdl",
              name: "HDL Cholesterol",
              value: "32",
              unit: "mg/dL",
              normalRange: ">40 mg/dL",
              status: "low",
              info: "Low HDL ('good' cholesterol) increases risk of heart disease."
            },
            {
              id: "ldl",
              name: "LDL Cholesterol",
              value: "180",
              unit: "mg/dL",
              normalRange: "<100 mg/dL",
              status: "high",
              info: "LDL ('bad' cholesterol) is significantly elevated, increasing risk of plaque formation."
            },
            {
              id: "trig",
              name: "Triglycerides",
              value: "210",
              unit: "mg/dL",
              normalRange: "<150 mg/dL",
              status: "high",
              info: "Elevated triglycerides contribute to atherosclerosis and heart disease."
            },
            {
              id: "crp",
              name: "C-Reactive Protein",
              value: "4.8",
              unit: "mg/L",
              normalRange: "<3.0 mg/L",
              status: "high",
              info: "Elevated CRP indicates inflammation, a risk factor for heart disease."
            },
            {
              id: "glu",
              name: "Glucose",
              value: "105",
              unit: "mg/dL",
              normalRange: "70-99 mg/dL",
              status: "high",
              info: "Slightly elevated blood sugar, indicating prediabetes."
            },
            // Normal metrics
            {
              id: "hgb",
              name: "Hemoglobin",
              value: "14.8",
              unit: "g/dL",
              normalRange: "13.5-17.5 g/dL",
              status: "normal",
              info: "Hemoglobin is a protein in your red blood cells that carries oxygen to your body's organs and tissues."
            },
            {
              id: "wbc",
              name: "White Blood Cells",
              value: "7.2",
              unit: "10³/µL",
              normalRange: "4.5-11.0 10³/µL",
              status: "normal",
              info: "White blood cells help your body fight infection."
            },
            {
              id: "plt",
              name: "Platelets",
              value: "280",
              unit: "10³/µL",
              normalRange: "150-450 10³/µL",
              status: "normal",
              info: "Platelets help your blood clot."
            },
            {
              id: "bun",
              name: "Blood Urea Nitrogen",
              value: "16",
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
              value: "95",
              unit: "mL/min/1.73m²",
              normalRange: ">90 mL/min/1.73m²",
              status: "normal",
              info: "GFR measures how well your kidneys are filtering blood."
            },
            {
              id: "alt",
              name: "ALT",
              value: "32",
              unit: "U/L",
              normalRange: "7-56 U/L",
              status: "normal",
              info: "ALT is an enzyme found primarily in the liver. Elevated levels may indicate liver damage."
            },
            {
              id: "ast",
              name: "AST",
              value: "28",
              unit: "U/L",
              normalRange: "10-40 U/L",
              status: "normal",
              info: "AST is an enzyme found in the liver, heart, and muscles. Elevated levels may indicate tissue damage."
            },
            {
              id: "tsh",
              name: "TSH",
              value: "3.5",
              unit: "mIU/L",
              normalRange: "0.4-4.0 mIU/L",
              status: "normal",
              info: "TSH regulates thyroid hormone production."
            },
            {
              id: "a1c",
              name: "HbA1c",
              value: "5.9",
              unit: "%",
              normalRange: "<5.7%",
              status: "high",
              info: "HbA1c measures average blood sugar levels over the past 2-3 months. Your level indicates prediabetes."
            },
            {
              id: "vit-d",
              name: "Vitamin D",
              value: "28",
              unit: "ng/mL",
              normalRange: "30-80 ng/mL",
              status: "low",
              info: "Vitamin D is important for bone health and immune function. Low levels are common and may require supplementation."
            }
          ],
          diseaseRisks: [
            {
              name: "Cardiovascular Disease",
              probability: 82,
              description: "Your cholesterol profile indicates a high risk of cardiovascular disease.",
              riskLevel: "high"
            },
            {
              name: "Atherosclerosis",
              probability: 75,
              description: "High LDL and low HDL increase risk of arterial plaque formation.",
              riskLevel: "high"
            },
            {
              name: "Metabolic Syndrome",
              probability: 68,
              description: "Combination of lipid abnormalities and glucose intolerance suggests metabolic syndrome.",
              riskLevel: "high"
            },
            {
              name: "Type 2 Diabetes",
              probability: 42,
              description: "Borderline glucose and HbA1c indicate prediabetes.",
              riskLevel: "medium"
            },
            {
              name: "Hypertension",
              probability: 65,
              description: "Lipid abnormalities are often associated with hypertension.",
              riskLevel: "high"
            },
            {
              name: "Stroke",
              probability: 58,
              description: "Your cholesterol profile increases stroke risk.",
              riskLevel: "medium"
            },
            {
              name: "Vitamin D Deficiency",
              probability: 70,
              description: "Your vitamin D levels are below the recommended range, indicating deficiency.",
              riskLevel: "high"
            },
            {
              name: "Liver Disease",
              probability: 12,
              description: "Your liver enzyme levels are normal, indicating healthy liver function.",
              riskLevel: "low"
            }
          ],
          chartDiseaseRisks: [
            { name: "Heart Disease", value: 82, color: "#ef4444" },
            { name: "Atherosclerosis", value: 75, color: "#f87171" },
            { name: "Metabolic Syndrome", value: 68, color: "#f87171" },
            { name: "Hypertension", value: 65, color: "#f87171" },
            { name: "Stroke", value: 58, color: "#facc15" }
          ],
          markerDistribution: [
            { name: "Metabolic", normal: 1, abnormal: 1 },
            { name: "Cardiovascular", normal: 0, abnormal: 4 },
            { name: "Blood", normal: 3, abnormal: 0 },
            { name: "Liver", normal: 2, abnormal: 0 },
            { name: "Kidney", normal: 2, abnormal: 0 },
            { name: "Hormonal", normal: 1, abnormal: 0 }
          ]
        };
      }
      
      // Variant 3: Liver/Kidney issues
      else if (fileName.includes("liver") || fileName.includes("kidney") || fileName.includes("renal")) {
        analysis = {
          ...analysis,
          healthScore: 65,
          abnormalMarkers: 5,
          normalMarkers: 11,
          criticalMarkers: 1,
          recommendations: [
            "Consult with a nephrologist about your kidney function.",
            "Consider a liver panel follow-up test.",
            "Limit alcohol consumption completely until liver enzymes normalize.",
            "Follow a kidney-friendly diet low in sodium and protein.",
            "Stay well-hydrated with at least 2-3 liters of water daily."
          ],
          metrics: [
            {
              id: "alt",
              name: "ALT",
              value: "95",
              unit: "U/L",
              normalRange: "7-56 U/L",
              status: "high",
              info: "ALT is significantly elevated, indicating possible liver damage."
            },
            {
              id: "ast",
              name: "AST",
              value: "85",
              unit: "U/L",
              normalRange: "10-40 U/L",
              status: "high",
              info: "AST is elevated, suggesting liver inflammation or damage."
            },
            {
              id: "bun",
              name: "Blood Urea Nitrogen",
              value: "28",
              unit: "mg/dL",
              normalRange: "7-20 mg/dL",
              status: "high",
              info: "Elevated BUN indicates potential kidney dysfunction."
            },
            {
              id: "cre",
              name: "Creatinine",
              value: "1.5",
              unit: "mg/dL",
              normalRange: "0.6-1.2 mg/dL",
              status: "high",
              info: "Elevated creatinine suggests reduced kidney function."
            },
            {
              id: "gfr",
              name: "GFR",
              value: "58",
              unit: "mL/min/1.73m²",
              normalRange: ">90 mL/min/1.73m²",
              status: "low",
              info: "GFR below 60 indicates moderate kidney disease."
            },
            // Other metrics (normal)
            {
              id: "glu",
              name: "Glucose",
              value: "98",
              unit: "mg/dL",
              normalRange: "70-99 mg/dL",
              status: "normal",
              info: "Blood sugar levels within normal range."
            },
            {
              id: "chol",
              name: "Total Cholesterol",
              value: "195",
              unit: "mg/dL",
              normalRange: "<200 mg/dL",
              status: "normal",
              info: "Cholesterol levels are within normal range."
            },
            {
              id: "hdl",
              name: "HDL Cholesterol",
              value: "45",
              unit: "mg/dL",
              normalRange: ">40 mg/dL",
              status: "normal",
              info: "HDL is 'good' cholesterol that helps remove other forms of cholesterol from your bloodstream."
            },
            {
              id: "ldl",
              name: "LDL Cholesterol",
              value: "115",
              unit: "mg/dL",
              normalRange: "<100 mg/dL",
              status: "high",
              info: "LDL is 'bad' cholesterol that can build up in your arteries."
            },
            {
              id: "trig",
              name: "Triglycerides",
              value: "148",
              unit: "mg/dL",
              normalRange: "<150 mg/dL",
              status: "normal",
              info: "Triglycerides are a type of fat found in your blood."
            },
            {
              id: "hgb",
              name: "Hemoglobin",
              value: "13.8",
              unit: "g/dL",
              normalRange: "13.5-17.5 g/dL",
              status: "normal",
              info: "Hemoglobin is a protein in your red blood cells that carries oxygen to your body's organs and tissues."
            },
            {
              id: "wbc",
              name: "White Blood Cells",
              value: "7.2",
              unit: "10³/µL",
              normalRange: "4.5-11.0 10³/µL",
              status: "normal",
              info: "White blood cells help your body fight infection."
            },
            {
              id: "plt",
              name: "Platelets",
              value: "185",
              unit: "10³/µL",
              normalRange: "150-450 10³/µL",
              status: "normal",
              info: "Platelets help your blood clot."
            },
            {
              id: "tsh",
              name: "TSH",
              value: "3.2",
              unit: "mIU/L",
              normalRange: "0.4-4.0 mIU/L",
              status: "normal",
              info: "TSH regulates thyroid hormone production."
            },
            {
              id: "a1c",
              name: "HbA1c",
              value: "5.6",
              unit: "%",
              normalRange: "<5.7%",
              status: "normal",
              info: "HbA1c measures average blood sugar levels over the past 2-3 months."
            },
            {
              id: "vit-d",
              name: "Vitamin D",
              value: "26",
              unit: "ng/mL",
              normalRange: "30-80 ng/mL",
              status: "low",
              info: "Vitamin D is important for bone health and immune function. Low levels are common and may require supplementation."
            },
            {
              id: "crp",
              name: "C-Reactive Protein",
              value: "2.8",
              unit: "mg/L",
              normalRange: "<3.0 mg/L",
              status: "normal",
              info: "CRP is a marker of inflammation in the body."
            }
          ],
          diseaseRisks: [
            {
              name: "Chronic Kidney Disease",
              probability: 75,
              description: "Your kidney function tests indicate moderate chronic kidney disease.",
              riskLevel: "high"
            },
            {
              name: "Liver Disease",
              probability: 82,
              description: "Elevated liver enzymes suggest liver inflammation or damage.",
              riskLevel: "high"
            },
            {
              name: "Hepatitis",
              probability: 45,
              description: "Liver enzyme pattern is consistent with viral or alcoholic hepatitis.",
              riskLevel: "medium"
            },
            {
              name: "Fatty Liver Disease",
              probability: 68,
              description: "Your results are consistent with non-alcoholic fatty liver disease.",
              riskLevel: "high"
            },
            {
              name: "Cardiovascular Disease",
              probability: 38,
              description: "Kidney disease increases cardiovascular risk.",
              riskLevel: "medium"
            },
            {
              name: "Vitamin D Deficiency",
              probability: 72,
              description: "Your vitamin D levels are below the recommended range, indicating deficiency.",
              riskLevel: "high"
            },
            {
              name: "Anemia",
              probability: 25,
              description: "Kidney disease can contribute to anemia.",
              riskLevel: "medium"
            },
            {
              name: "Type 2 Diabetes",
              probability: 15,
              description: "Your glucose metabolism appears normal.",
              riskLevel: "low"
            }
          ],
          chartDiseaseRisks: [
            { name: "Kidney Disease", value: 75, color: "#f87171" },
            { name: "Liver Disease", value: 82, color: "#ef4444" },
            { name: "Fatty Liver", value: 68, color: "#f87171" },
            { name: "Hepatitis", value: 45, color: "#facc15" },
            { name: "Cardiovascular", value: 38, color: "#facc15" }
          ],
          markerDistribution: [
            { name: "Metabolic", normal: 2, abnormal: 0 },
            { name: "Cardiovascular", normal: 3, abnormal: 1 },
            { name: "Blood", normal: 3, abnormal: 0 },
            { name: "Liver", normal: 0, abnormal: 2 },
            { name: "Kidney", normal: 0, abnormal: 3 },
            { name: "Hormonal", normal: 1, abnormal: 0 }
          ]
        };
      }
      
      // If no specific pattern is detected, use the default analysis
      resolve(analysis);
    }, 4000); // Simulate 4-second processing time
  });
};
