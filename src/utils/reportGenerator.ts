
import { HealthAnalysis } from "@/types/health";
import jsPDF from "jspdf";

export const generatePDF = (analysis: HealthAnalysis) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 91, 140); // Medical blue
  doc.text("Health Analysis Report", 105, 20, { align: "center" });
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: "center" });
  
  // Add health score section
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Health Score Assessment", 20, 45);
  
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);
  doc.text(`Overall Health Score: ${analysis.healthScore}/100`, 20, 55);
  doc.text(`Normal Markers: ${analysis.normalMarkers}`, 20, 65);
  doc.text(`Abnormal Markers: ${analysis.abnormalMarkers}`, 20, 75);
  doc.text(`Critical Markers: ${analysis.criticalMarkers}`, 20, 85);
  
  // Add disease risks section
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Disease Risk Assessment", 20, 100);
  
  let yPosition = 110;
  analysis.diseaseRisks.forEach(risk => {
    const riskColors: Record<string, [number, number, number]> = {
      low: [0, 128, 0],      // Green
      medium: [255, 140, 0],  // Orange
      high: [220, 53, 69],    // Red
      critical: [136, 8, 8]   // Dark red
    };
    
    doc.setFontSize(12);
    doc.setTextColor(riskColors[risk.riskLevel][0], riskColors[risk.riskLevel][1], riskColors[risk.riskLevel][2]);
    doc.text(`${risk.name}: ${(risk.probability * 100).toFixed(1)}% - ${risk.riskLevel.toUpperCase()} RISK`, 20, yPosition);
    
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    
    // Handle text wrapping for description
    const splitDescription = doc.splitTextToSize(risk.description, 170);
    doc.text(splitDescription, 20, yPosition + 5);
    
    yPosition += 10 + (splitDescription.length * 5);
  });
  
  // Add recommendations
  yPosition += 10;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Recommendations", 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  
  analysis.recommendations.forEach(recommendation => {
    doc.text(`• ${recommendation}`, 20, yPosition);
    yPosition += 7;
  });
  
  // Add disclaimer
  yPosition = Math.max(yPosition, 250);
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("DISCLAIMER: This health prediction is for informational purposes only and does not constitute medical advice.", 105, yPosition, { align: "center" });
  doc.text("Always consult with a healthcare professional for proper diagnosis and treatment.", 105, yPosition + 4, { align: "center" });
  
  // Save the PDF
  doc.save(`health_report_${new Date().toISOString().split("T")[0]}.pdf`);
};
