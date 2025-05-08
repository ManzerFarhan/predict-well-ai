
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentsList from "@/components/AppointmentsList";
import BookingForm from "@/components/BookingForm";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Appointments = () => {
  const [showBooking, setShowBooking] = useState(false);
  
  // Empty appointments array for AppointmentsList
  const emptyAppointments = [];
  
  // Required props for BookingForm
  const bookingProps = {
    doctorId: "dr-smith",
    onComplete: () => setShowBooking(false)
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Appointments</h1>
        
        {!showBooking ? (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Waiting for Your Appointments</h3>
                <p className="text-gray-500 max-w-md mb-6">
                  You don't have any scheduled appointments yet. Book a consultation with one of our specialists to get started.
                </p>
                <Button onClick={() => setShowBooking(true)}>Book an Appointment</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled doctor consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentsList appointments={emptyAppointments} />
              </CardContent>
            </Card>
            
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>Schedule a new consultation with a specialist</CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm {...bookingProps} />
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Appointments;
