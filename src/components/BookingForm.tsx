
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock, FileText } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  doctorId: string;
  onComplete: () => void;
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
];

const BookingForm = ({ doctorId, onComplete }: BookingFormProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [includeReport, setIncludeReport] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const doctors = {
    "dr-smith": { name: "Dr. Sarah Smith", specialty: "Cardiologist" },
    "dr-patel": { name: "Dr. Raj Patel", specialty: "Endocrinologist" },
    "dr-johnson": { name: "Dr. Michael Johnson", specialty: "Hematologist" },
    "dr-chen": { name: "Dr. Lisa Chen", specialty: "Nephrologist" },
    "dr-rodriguez": { name: "Dr. Carlos Rodriguez", specialty: "Gastroenterologist" },
  };
  
  const selectedDoctor = doctors[doctorId as keyof typeof doctors];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !timeSlot || !name || !email || !phone) return;
    
    setIsLoading(true);
    
    // In a real application, this would call an API to book the appointment
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1500);
  };

  const isFormValid = date && timeSlot && name && email && phone;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Book an Appointment</CardTitle>
        <CardDescription>
          Consultation with {selectedDoctor.name}, {selectedDoctor.specialty}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium">
                Select Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today || 
                             date.getDay() === 0 || 
                             date.getDay() === 6;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium">
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={timeSlot === time ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setTimeSlot(time)}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs">{time}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium">
              Your Information
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                placeholder="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium">
              Consultation Details
            </label>
            <Textarea
              placeholder="Briefly describe your health concerns or questions for the doctor"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="include-report" 
              checked={includeReport}
              onCheckedChange={(checked) => setIncludeReport(!!checked)}
            />
            <label
              htmlFor="include-report"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
            >
              <span>Include my health report with appointment</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    <FileText className="h-3.5 w-3.5 mr-1" />
                    Preview Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Health Report Summary</DialogTitle>
                    <DialogDescription>
                      This report will be shared with the doctor before your consultation
                    </DialogDescription>
                  </DialogHeader>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <ReportPreview />
                  </div>
                </DialogContent>
              </Dialog>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Booking"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Simple report preview component
const ReportPreview = () => {
  return (
    <div className="space-y-3">
      <div className="font-semibold text-lg">Health Risk Assessment</div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded border">
          <div className="text-sm font-medium">Diabetes Risk</div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">28%</span>
            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Medium Risk</span>
          </div>
        </div>
        <div className="bg-white p-3 rounded border">
          <div className="text-sm font-medium">Cardiovascular Risk</div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">15%</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Low Risk</span>
          </div>
        </div>
      </div>
      
      <div className="font-semibold text-lg mt-4">Key Biomarkers</div>
      <div className="bg-white rounded border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Marker</th>
              <th className="px-4 py-2 text-right">Value</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Glucose</td>
              <td className="px-4 py-2 text-right">110 mg/dL</td>
              <td className="px-4 py-2"><span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">High</span></td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Total Cholesterol</td>
              <td className="px-4 py-2 text-right">185 mg/dL</td>
              <td className="px-4 py-2"><span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Normal</span></td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Blood Pressure</td>
              <td className="px-4 py-2 text-right">140/90 mmHg</td>
              <td className="px-4 py-2"><span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">High</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingForm;
