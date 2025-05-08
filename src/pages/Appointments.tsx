
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentsList from "@/components/AppointmentsList";
import BookingForm from "@/components/BookingForm";

const Appointments = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Appointments</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled doctor consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentsList />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
              <CardDescription>Schedule a new consultation with a specialist</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
