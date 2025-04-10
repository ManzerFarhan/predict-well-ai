
import { Appointment } from "@/types/health";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  User, 
  FileText,
  Video,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList = ({ appointments }: AppointmentsListProps) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((current) => ({
      ...current,
      [id]: !current[id]
    }));
  };

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="h-3 w-3" />;
      case "completed":
        return <Clock className="h-3 w-3" />;
      case "cancelled":
        return <Clock className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-medical-600" />
          Your Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No appointments scheduled</h3>
            <p className="text-sm text-gray-500 mb-4">You don't have any upcoming appointments</p>
            <Button>Schedule New Appointment</Button>
          </div>
        ) : (
          <div className="divide-y">
            {appointments.map((appointment) => (
              <Collapsible
                key={appointment.id}
                open={openItems[appointment.id]}
                onOpenChange={() => toggleItem(appointment.id)}
                className="py-3"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-medical-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{appointment.doctorName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {appointment.doctorSpecialty}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-xs px-2 py-1 rounded-full border flex items-center gap-1", getStatusColor(appointment.status))}>
                      {getStatusIcon(appointment.status)}
                      <span className="capitalize">{appointment.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-13 pl-13 flex items-center gap-6 my-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm">{appointment.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                </div>
                
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="mt-1 p-0 h-auto text-xs text-medical-600 hover:text-medical-700 hover:bg-transparent">
                    {openItems[appointment.id] ? "Show less" : "View details"}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-3 space-y-3">
                  {appointment.notes && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center mb-1">
                        <FileText className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm font-medium">Notes</span>
                      </div>
                      <p className="text-sm text-gray-600">{appointment.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      Join Video
                    </Button>
                    
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Reschedule
                    </Button>
                    
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                      Cancel
                    </Button>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>Medical Center, 123 Health St., New York, NY</span>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
