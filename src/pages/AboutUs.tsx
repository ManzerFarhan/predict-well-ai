
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About Us</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>PredictWell AI</CardTitle>
              <CardDescription>Our mission and technology</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                PredictWell AI is an innovative health prediction platform that uses advanced machine learning algorithms to predict 
                health conditions based on medical test data. Our primary focus is diabetes prediction using the Pima Indians Diabetes Dataset.
              </p>
              
              <h3 className="text-xl font-semibold mt-4">Our Research Dataset</h3>
              <p>
                The Pima Indians Diabetes Dataset is a well-known dataset in machine learning and healthcare research. It contains 
                diagnostic measurements for 768 adult female patients of Pima Indian heritage, with binary outcomes indicating whether 
                the patient developed diabetes within five years of the initial measurements.
              </p>
              <p>
                This dataset includes key health indicators such as:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Blood glucose levels</li>
                <li>Blood pressure</li>
                <li>Body mass index (BMI)</li>
                <li>Age</li>
                <li>Insulin levels</li>
                <li>And other relevant markers</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-4">Blood Test Prediction System</h3>
              <p>
                Our blood test prediction system analyzes your test results against clinically established normal ranges and uses 
                advanced algorithms to identify potential health risks. The system provides:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Analysis of key blood markers</li>
                <li>Risk assessment for various health conditions</li>
                <li>Personalized health recommendations</li>
                <li>Trend analysis of your health metrics over time</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-4">Our Team</h3>
              <p>
                PredictWell AI was developed by a dedicated group of BTech second year students specializing in Artificial Intelligence 
                and Data Science. This project represents the culmination of their coursework in machine learning, data analysis, 
                and healthcare informatics.
              </p>
              <p>
                The team applied their knowledge of:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Machine learning algorithms and neural networks</li>
                <li>Data preprocessing and feature engineering</li>
                <li>Healthcare analytics and biostatistics</li>
                <li>User experience design for healthcare applications</li>
              </ul>
              <p>
                Throughout the development process, the students worked closely with faculty advisors and healthcare professionals to 
                ensure the accuracy and reliability of their prediction models. Their innovative approach to diabetes risk assessment 
                demonstrates the potential for AI-driven solutions in preventive healthcare.
              </p>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>
                  <strong>Note:</strong> PredictWell AI is intended for educational and informational purposes only. 
                  It is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
