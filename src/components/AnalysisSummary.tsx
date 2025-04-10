
import { Check, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalysisSummaryProps {
  healthScore: number;
  abnormalMarkers: number;
  normalMarkers: number;
  criticalMarkers: number;
  recommendations: string[];
}

const AnalysisSummary = ({
  healthScore,
  abnormalMarkers,
  normalMarkers,
  criticalMarkers,
  recommendations,
}: AnalysisSummaryProps) => {
  const getHealthScoreColor = () => {
    if (healthScore >= 80) return "text-green-500";
    if (healthScore >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Analysis Summary</CardTitle>
        <CardDescription>
          Overview of your health based on blood test analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-md">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
              <span className={`text-2xl font-bold ${getHealthScoreColor()}`}>
                {healthScore}
              </span>
            </div>
            <div>
              <h4 className="font-medium">Health Score</h4>
              <p className="text-sm text-muted-foreground">
                Based on your test results
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-green-50 rounded-md">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Normal</span>
              </div>
              <p className="text-xl font-bold text-green-700">{normalMarkers}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-md">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Abnormal</span>
              </div>
              <p className="text-xl font-bold text-yellow-700">{abnormalMarkers}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-md">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Critical</span>
              </div>
              <p className="text-xl font-bold text-red-700">{criticalMarkers}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisSummary;
