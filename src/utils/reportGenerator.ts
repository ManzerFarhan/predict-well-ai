
import { HealthAnalysis } from "@/types/health";

export const generatePDF = (analysis: HealthAnalysis) => {
  // In a real implementation, this would use a library like jsPDF or pdfmake
  // to generate a proper PDF file with the analysis data
  
  // For this mockup, we'll create and download a JSON file with the analysis data
  const jsonData = JSON.stringify(analysis, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  // Create a download link and trigger it
  const link = document.createElement("a");
  link.href = url;
  link.download = `health_report_${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
