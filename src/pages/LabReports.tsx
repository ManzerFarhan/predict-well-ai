
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HealthMetricsTable from "@/components/HealthMetricsTable";
import PredictionCharts from "@/components/PredictionCharts";

const LabReports = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Lab Reports & Tests</h1>
        
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
                <HealthMetricsTable />
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
                <PredictionCharts />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LabReports;
