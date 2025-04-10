
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import HealthRiskCard from "@/components/HealthRiskCard";
import HealthMetricsTable from "@/components/HealthMetricsTable";
import AnalysisSummary from "@/components/AnalysisSummary";
import PredictionCharts from "@/components/PredictionCharts";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import HealthChatbot from "@/components/HealthChatbot";
import { analyzeBloodTest } from "@/services/mockHealthService";
import { HealthAnalysis } from "@/types/health";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, RefreshCw, UserPlus, FileText } from "lucide-react";
import { generatePDF } from "@/utils/reportGenerator";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<HealthAnalysis | null>(null);

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsAnalyzing(true);
    setAnalysis(null);
    
    try {
      const result = await analyzeBloodTest(uploadedFile);
      setAnalysis(result);
      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Error analyzing file:", error);
      toast.error("Failed to analyze file", {
        description: "Please try again with a different file format."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysis(null);
  };

  const handleDownloadReport = () => {
    if (!analysis) return;
    
    // Show toast to indicate download started
    toast.success("Preparing your health report...");
    
    // In a real implementation, this would generate a PDF report
    setTimeout(() => {
      generatePDF(analysis);
      toast.success("Report downloaded successfully!");
    }, 1000);
  };

  const handleBookConsultation = () => {
    navigate("/doctor-consultation");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Health Prediction Dashboard
            </h1>
            <p className="text-muted-foreground">
              Upload your blood test report to get AI-powered health insights and disease risk assessment
            </p>
          </div>

          {!file && !analysis && (
            <div className="max-w-2xl mx-auto">
              <FileUpload onFileUpload={handleFileUpload} />
              
              <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Sample Report Format</h3>
                <p className="text-xs text-blue-700 mb-3">
                  For best results, ensure your blood test report includes the following common markers:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Glucose", "HbA1c", "Cholesterol", "HDL", "LDL", "Triglycerides", 
                    "Hemoglobin", "White Blood Cells", "Platelets", "Creatinine", "GFR", "TSH"].map((marker) => (
                    <div key={marker} className="text-xs bg-white py-1 px-2 rounded border border-blue-100">
                      {marker}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <LoadingAnalysis />
          )}

          {analysis && !isAnalyzing && (
            <>
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5 text-medical-500" />
                    <h2 className="font-medium">{file?.name}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Uploaded on {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    New Analysis
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadReport}
                    className="border-medical-500 text-medical-700 hover:bg-medical-50"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button onClick={handleBookConsultation}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Book Doctor Consultation
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-1">
                  <AnalysisSummary 
                    healthScore={analysis.healthScore}
                    abnormalMarkers={analysis.abnormalMarkers}
                    normalMarkers={analysis.normalMarkers}
                    criticalMarkers={analysis.criticalMarkers}
                    recommendations={analysis.recommendations}
                  />
                </div>
                <div className="lg:col-span-2">
                  <PredictionCharts 
                    diseaseRisks={analysis.chartDiseaseRisks}
                    markerDistribution={analysis.markerDistribution}
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">Disease Risk Assessment</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {analysis.diseaseRisks.slice(0, 4).map((risk) => (
                  <HealthRiskCard
                    key={risk.name}
                    title={risk.name}
                    probability={risk.probability}
                    description={risk.description}
                    riskLevel={risk.riskLevel}
                  />
                ))}
              </div>

              <h2 className="text-xl font-semibold mb-4">Blood Test Markers</h2>
              <HealthMetricsTable metrics={analysis.metrics} />

              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleBookConsultation}
                  className="bg-medical-600 hover:bg-medical-700"
                  size="lg"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Book Doctor Consultation to Discuss Results
                </Button>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800 mb-1">Disclaimer</h3>
                <p className="text-xs text-yellow-700">
                  This health prediction is for informational purposes only and does not constitute medical advice.
                  Always consult with a healthcare professional for proper diagnosis and treatment.
                </p>
              </div>
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="font-bold text-medical-500">Predict<span className="text-medical-700">Well</span></span>
              <span className="text-xs text-gray-500">AI</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 PredictWell AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <HealthChatbot />
    </div>
  );
};

export default Index;
