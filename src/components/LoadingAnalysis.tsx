
import { Progress } from "@/components/ui/progress";
import { Search, FileText, LineChart, ListChecks } from "lucide-react";
import { useEffect, useState } from "react";

const LoadingAnalysis = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { icon: FileText, text: "Processing report data..." },
    { icon: Search, text: "Detecting biomarkers..." },
    { icon: LineChart, text: "Analyzing health patterns..." },
    { icon: ListChecks, text: "Generating predictions..." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 0.5, 100);
        
        // Update step based on progress
        if (newProgress < 25) setCurrentStep(0);
        else if (newProgress < 50) setCurrentStep(1);
        else if (newProgress < 75) setCurrentStep(2);
        else setCurrentStep(3);
        
        return newProgress;
      });
    }, 150);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const Step = ({ icon: Icon, text, isActive }: { icon: any, text: string, isActive: boolean }) => (
    <div className={`flex items-center gap-3 p-3 rounded-md transition-all ${
      isActive ? "bg-medical-50 text-medical-700" : "text-muted-foreground"
    }`}>
      <div className={`p-2 rounded-full ${
        isActive ? "bg-medical-100" : "bg-gray-100"
      }`}>
        <Icon className={`h-5 w-5 ${
          isActive ? "text-medical-500 animate-pulse-slow" : ""
        }`} />
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-medical-50 rounded-full mb-4">
          <LineChart className="h-8 w-8 text-medical-500 animate-pulse-slow" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Analyzing Your Health Data</h2>
        <p className="text-muted-foreground">
          Our AI is processing your blood test report to generate personalized health insights
        </p>
      </div>
      
      <div className="w-full mb-6">
        <Progress value={progress} className="h-2 mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Processing...</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      
      <div className="w-full space-y-2">
        {steps.map((step, index) => (
          <Step
            key={index}
            icon={step.icon}
            text={step.text}
            isActive={index === currentStep}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingAnalysis;
