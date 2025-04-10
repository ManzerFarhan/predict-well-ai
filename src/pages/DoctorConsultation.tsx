
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import DoctorCard from "@/components/DoctorCard";
import BookingForm from "@/components/BookingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const DoctorConsultation = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [step, setStep] = useState<"select-doctor" | "book-appointment">("select-doctor");

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setStep("book-appointment");
  };

  const handleBackToSelection = () => {
    setSelectedDoctor(null);
    setStep("select-doctor");
  };

  const handleBookingComplete = () => {
    toast.success("Appointment booked successfully!", {
      description: "You will receive a confirmation email shortly.",
    });
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="p-0 h-auto"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> 
                Back to Dashboard
              </Button>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Doctor Consultation
            </h1>
            <p className="text-muted-foreground">
              Connect with a specialist to discuss your health report and get personalized advice
            </p>
          </div>

          {step === "select-doctor" && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Available Specialists</h2>
                <p className="text-muted-foreground mb-6">
                  Select a doctor who specializes in your areas of concern
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DoctorCard
                    id="dr-smith"
                    name="Dr. Sarah Smith"
                    specialty="Cardiologist"
                    experience="15 years"
                    rating={4.9}
                    image="/doctor-1.jpg"
                    availability="Available today"
                    onSelect={handleDoctorSelect}
                  />
                  <DoctorCard
                    id="dr-patel"
                    name="Dr. Raj Patel"
                    specialty="Endocrinologist"
                    experience="12 years"
                    rating={4.7}
                    image="/doctor-2.jpg"
                    availability="Available tomorrow"
                    onSelect={handleDoctorSelect}
                  />
                  <DoctorCard
                    id="dr-johnson"
                    name="Dr. Michael Johnson"
                    specialty="Hematologist"
                    experience="20 years"
                    rating={4.8}
                    image="/doctor-3.jpg"
                    availability="Available today"
                    onSelect={handleDoctorSelect}
                  />
                  <DoctorCard
                    id="dr-chen"
                    name="Dr. Lisa Chen"
                    specialty="Nephrologist"
                    experience="10 years"
                    rating={4.6}
                    image="/doctor-4.jpg"
                    availability="Available in 2 days"
                    onSelect={handleDoctorSelect}
                  />
                  <DoctorCard
                    id="dr-rodriguez"
                    name="Dr. Carlos Rodriguez"
                    specialty="Gastroenterologist"
                    experience="18 years"
                    rating={4.9}
                    image="/doctor-5.jpg"
                    availability="Available tomorrow"
                    onSelect={handleDoctorSelect}
                  />
                </div>
              </div>

              <Card className="bg-blue-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-blue-800">
                    Why Consult a Doctor?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                        <Calendar className="h-3 w-3 text-blue-600" />
                      </span>
                      <span>Discuss your test results with a qualified specialist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                        <Clock className="h-3 w-3 text-blue-600" />
                      </span>
                      <span>Get personalized treatment recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                        <Calendar className="h-3 w-3 text-blue-600" />
                      </span>
                      <span>Develop a comprehensive health improvement plan</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {step === "book-appointment" && selectedDoctor && (
            <div className="mb-6">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBackToSelection}
                className="mb-4"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> 
                Back to Doctor Selection
              </Button>
              <BookingForm 
                doctorId={selectedDoctor} 
                onComplete={handleBookingComplete} 
              />
            </div>
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
    </div>
  );
};

export default DoctorConsultation;
