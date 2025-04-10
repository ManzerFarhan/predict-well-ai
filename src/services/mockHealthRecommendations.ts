
import { HealthRecommendation } from "@/types/health";

const mockRecommendations: Record<string, HealthRecommendation> = {
  "High Cholesterol": {
    disease: "High Cholesterol",
    medications: [
      {
        name: "Statins",
        dosage: "Varies by medication",
        description: "Reduces cholesterol production in the liver (e.g., Atorvastatin, Simvastatin)"
      },
      {
        name: "Ezetimibe",
        dosage: "10mg daily",
        description: "Decreases cholesterol absorption in the intestine"
      },
      {
        name: "Bile acid sequestrants",
        dosage: "Varies by medication",
        description: "Binds to bile acids, forcing the liver to use cholesterol"
      }
    ],
    exercises: [
      {
        name: "Aerobic exercises",
        frequency: "30 minutes, 5 days/week",
        description: "Brisk walking, jogging, cycling, or swimming to improve heart health"
      },
      {
        name: "Resistance training",
        frequency: "2-3 times/week",
        description: "Weight training to increase muscle mass and improve metabolic rate"
      }
    ],
    lifestyle: [
      "Follow a heart-healthy diet rich in fruits, vegetables, and whole grains",
      "Limit saturated fats and avoid trans fats",
      "Increase soluble fiber intake from oats, beans, and fruits",
      "Add omega-3 fatty acids from fish or supplements to your diet",
      "Maintain a healthy weight and waist circumference"
    ]
  },
  "Diabetes": {
    disease: "Diabetes",
    medications: [
      {
        name: "Metformin",
        dosage: "500-2000mg daily",
        description: "First-line medication that reduces glucose production in the liver"
      },
      {
        name: "GLP-1 receptor agonists",
        dosage: "Varies by medication",
        description: "Stimulates insulin secretion and slows digestion (e.g., Semaglutide)"
      },
      {
        name: "SGLT2 inhibitors",
        dosage: "Varies by medication",
        description: "Prevents glucose reabsorption in kidneys (e.g., Empagliflozin)"
      }
    ],
    exercises: [
      {
        name: "Combined cardio and strength training",
        frequency: "150 minutes/week",
        description: "Helps improve insulin sensitivity and glucose control"
      },
      {
        name: "Walking after meals",
        frequency: "10-15 minutes after each meal",
        description: "Helps lower post-meal blood sugar spikes"
      }
    ],
    lifestyle: [
      "Monitor blood glucose regularly",
      "Follow a consistent carbohydrate intake pattern",
      "Choose low glycemic index foods",
      "Limit added sugars and processed carbohydrates",
      "Stay well-hydrated throughout the day"
    ]
  },
  "Hypertension": {
    disease: "Hypertension",
    medications: [
      {
        name: "ACE inhibitors",
        dosage: "Varies by medication",
        description: "Relaxes blood vessels by blocking angiotensin (e.g., Lisinopril)"
      },
      {
        name: "Calcium channel blockers",
        dosage: "Varies by medication",
        description: "Prevents calcium from entering heart and blood vessel cells (e.g., Amlodipine)"
      },
      {
        name: "Diuretics",
        dosage: "Varies by medication",
        description: "Helps the body eliminate sodium and water (e.g., Hydrochlorothiazide)"
      }
    ],
    exercises: [
      {
        name: "Regular aerobic activity",
        frequency: "30 minutes, 5 days/week",
        description: "Brisk walking, swimming, or cycling to reduce blood pressure"
      },
      {
        name: "Isometric exercises",
        frequency: "3 times/week",
        description: "Handgrip exercises or wall sits that help lower blood pressure"
      }
    ],
    lifestyle: [
      "Reduce sodium intake to less than 2,300mg per day",
      "Follow the DASH diet (rich in fruits, vegetables, and low-fat dairy)",
      "Limit alcohol consumption",
      "Practice stress-reduction techniques like meditation",
      "Monitor your blood pressure regularly at home"
    ]
  },
  "Anemia": {
    disease: "Anemia",
    medications: [
      {
        name: "Iron supplements",
        dosage: "60-120mg elemental iron daily",
        description: "Ferrous sulfate, ferrous gluconate, or ferrous fumarate to raise hemoglobin levels"
      },
      {
        name: "Vitamin C",
        dosage: "250-500mg with iron",
        description: "Enhances iron absorption when taken together"
      },
      {
        name: "Vitamin B12",
        dosage: "1000-2000mcg daily",
        description: "For B12 deficiency anemia, oral or injectable form"
      }
    ],
    exercises: [
      {
        name: "Light to moderate exercise",
        frequency: "Start with 10-15 minutes, 3 days/week",
        description: "Walking or swimming, gradually increasing as energy improves"
      },
      {
        name: "Deep breathing exercises",
        frequency: "5-10 minutes, twice daily",
        description: "Improves oxygen delivery to tissues"
      }
    ],
    lifestyle: [
      "Consume iron-rich foods (red meat, spinach, beans, fortified cereals)",
      "Pair iron-rich foods with vitamin C sources to enhance absorption",
      "Avoid coffee, tea, and calcium supplements with meals (they inhibit iron absorption)",
      "Get adequate rest and sleep",
      "Manage underlying conditions that may cause anemia"
    ]
  },
  "Thyroid Disorder": {
    disease: "Thyroid Disorder",
    medications: [
      {
        name: "Levothyroxine",
        dosage: "Varies based on lab results",
        description: "Synthetic thyroid hormone for hypothyroidism (e.g., Synthroid)"
      },
      {
        name: "Methimazole",
        dosage: "Varies based on lab results",
        description: "Reduces thyroid hormone production for hyperthyroidism"
      },
      {
        name: "Selenium supplements",
        dosage: "200mcg daily",
        description: "May help with autoimmune thyroid conditions"
      }
    ],
    exercises: [
      {
        name: "Low-impact exercise",
        frequency: "30 minutes, 5 days/week",
        description: "Walking, swimming, or yoga depending on energy levels"
      },
      {
        name: "Strength training",
        frequency: "2-3 times/week",
        description: "Helps maintain bone density, especially important for hyperthyroidism"
      }
    ],
    lifestyle: [
      "Take thyroid medication consistently at the same time each day",
      "Wait 30-60 minutes before eating after taking thyroid medication",
      "Monitor iodine intake through diet",
      "Get adequate sleep and manage stress",
      "Have thyroid levels checked regularly as recommended by your doctor"
    ]
  },
  "General Health": {
    disease: "General Health",
    medications: [
      {
        name: "Multivitamin",
        dosage: "Once daily",
        description: "Fills potential nutrient gaps in the diet"
      },
      {
        name: "Vitamin D3",
        dosage: "1000-2000 IU daily",
        description: "Supports immune function and bone health"
      },
      {
        name: "Omega-3 supplements",
        dosage: "1000-2000mg daily",
        description: "Supports heart and brain health"
      }
    ],
    exercises: [
      {
        name: "Balanced exercise routine",
        frequency: "150 minutes moderate activity/week",
        description: "Combination of cardio, strength training, flexibility, and balance exercises"
      },
      {
        name: "Daily movement",
        frequency: "Every 1-2 hours during waking hours",
        description: "Breaking up sedentary time with short movement breaks"
      }
    ],
    lifestyle: [
      "Maintain a balanced diet rich in whole foods",
      "Stay hydrated by drinking adequate water throughout the day",
      "Get 7-9 hours of quality sleep each night",
      "Manage stress through mindfulness, meditation, or other techniques",
      "Limit alcohol and avoid tobacco products"
    ]
  }
};

export const getHealthRecommendations = async (disease: string): Promise<HealthRecommendation> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return specific disease recommendations or fallback to general health
  return mockRecommendations[disease] || mockRecommendations["General Health"];
};
