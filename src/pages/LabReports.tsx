import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HealthMetricsTable from "@/components/HealthMetricsTable";
import PredictionCharts from "@/components/PredictionCharts";
import { FileX } from "lucide-react";
import { Button } from "@/components/ui/button";

const LabReports = () => {
  // Empty data to avoid errors
  const emptyMetrics = {
    bloodMarkers: []
  };
  
  const emptyPredictions = {
    diseaseRisks: [],
    markerDistribution: []
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Lab Reports & Tests</h1>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileX className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Lab Reports Yet</h3>
              <p className="text-gray-500 max-w-md mb-6">
                No lab reports are uploaded yet, neither any lab tests has been conducted. Schedule a test to get started with your health monitoring.
              </p>
              <Button>Schedule a Lab Test</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Keep the original tabs structure, but hidden for now */}
        <div className="hidden">
          <Tabs defaultValue="bloodwork" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="bloodwork">Bloodwork Results</TabsTrigger>
              <TabsTrigger value="predictions">Health Predictions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bloodwork">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Test Results</CardTitle>
                  <CardDescription>Your latest blood work analysis from May 5, 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <HealthMetricsTable metrics={emptyMetrics} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="predictions">
              <Card>
                <CardHeader>
                  <CardTitle>Health Predictions</CardTitle>
                  <CardDescription>AI-powered health risk predictions based on your test results</CardDescription>
                </CardHeader>
                <CardContent>
                  <PredictionCharts {...emptyPredictions} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default LabReports;
