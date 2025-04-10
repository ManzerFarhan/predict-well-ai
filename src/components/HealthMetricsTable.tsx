
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  normalRange: string;
  status: "normal" | "low" | "high";
  info: string;
}

interface HealthMetricsTableProps {
  metrics: HealthMetric[];
}

const HealthMetricsTable = ({ metrics }: HealthMetricsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-500";
      case "low":
        return "text-orange-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal":
        return "Normal";
      case "low":
        return "Low";
      case "high":
        return "High";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Biomarker</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead>Normal Range</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.id}>
              <TableCell className="flex items-center gap-1 font-medium">
                {metric.name}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">{metric.info}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-right">
                {metric.value} {metric.unit}
              </TableCell>
              <TableCell>{metric.normalRange}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    metric.status
                  )} bg-opacity-10`}
                >
                  {getStatusText(metric.status)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HealthMetricsTable;
