
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
import PatientProfile from "@/components/PatientProfile";
import AppointmentsList from "@/components/AppointmentsList";
import { analyzeBloodTest } from "@/services/mockHealthService";
import { getMockPatientProfile, getMockAppointments } from "@/services/mockPatientService";
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
  
  const patientProfile = getMockPatientProfile();
  const appointments = getMockAppointments();

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
    
    toast.success("Preparing your health report...");
    
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

          {/* Three-section layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left column - Contains upload section and appointments */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Upload Blood Test Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">Upload Blood Test Report</h2>
                {!file && !analysis && !isAnalyzing && (
                  <FileUpload onFileUpload={handleFileUpload} />
                )}
                
                {isAnalyzing && (
                  <LoadingAnalysis />
                )}
                
                {analysis && !isAnalyzing && (
                  <>
                    <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-5 w-5 text-medical-500" />
                          <h2 className="font-medium">{file?.name}</h2>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Uploaded on {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={handleReset} size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          New Analysis
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleDownloadReport}
                          size="sm"
                          className="border-medical-500 text-medical-700 hover:bg-medical-50"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    
                    <Button onClick={handleBookConsultation} className="w-full">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Book Doctor Consultation
                    </Button>
                  </>
                )}
              </div>
              
              {/* Appointments Section */}
              <AppointmentsList appointments={appointments} />
            </div>
            
            {/* Right column - Patient Profile */}
            <div className="lg:col-span-5">
              <PatientProfile profile={patientProfile} />
              
              {/* Display Analysis Summary if available */}
              {analysis && !isAnalyzing && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Health Analysis</h2>
                  <AnalysisSummary 
                    healthScore={analysis.healthScore}
                    abnormalMarkers={analysis.abnormalMarkers}
                    normalMarkers={analysis.normalMarkers}
                    criticalMarkers={analysis.criticalMarkers}
                    recommendations={analysis.recommendations}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Analysis Results - Show only when there's an analysis */}
          {analysis && !isAnalyzing && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-3">
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
