
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HealthRiskCardProps {
  title: string;
  probability: number;
  description: string;
  riskLevel: "low" | "medium" | "high" | "critical";
}

const HealthRiskCard = ({
  title,
  probability,
  description,
  riskLevel,
}: HealthRiskCardProps) => {
  const riskColorMap = {
    low: "bg-risk-low",
    medium: "bg-risk-medium",
    high: "bg-risk-high",
    critical: "bg-risk-critical",
  };

  const riskTextColorMap = {
    low: "text-risk-low",
    medium: "text-risk-medium",
    high: "text-risk-high",
    critical: "text-risk-critical",
  };

  const getRiskLabel = () => {
    switch (riskLevel) {
      case "low":
        return "Low Risk";
      case "medium":
        return "Medium Risk";
      case "high":
        return "High Risk";
      case "critical":
        return "Critical Risk";
      default:
        return "Unknown Risk";
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className={`h-1 ${riskColorMap[riskLevel]}`} />
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-2">
          <div className="flex justify-between items-end mb-1">
            <span className="text-2xl font-bold">{probability}%</span>
            <span className={`text-xs font-medium ${riskTextColorMap[riskLevel]}`}>
              {getRiskLabel()}
            </span>
          </div>
          <Progress
            value={probability}
            className="h-2"
            indicatorClassName={riskColorMap[riskLevel]}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default HealthRiskCard;
