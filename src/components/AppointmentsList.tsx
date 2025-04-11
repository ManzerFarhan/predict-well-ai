
import { useState } from "react";
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
  MapPin,
  Edit,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList = ({ appointments: initialAppointments }: AppointmentsListProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Appointment>>({});

  const toggleItem = (id: string) => {
    setOpenItems((current) => ({
      ...current,
      [id]: !current[id]
    }));
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment.id);
    setEditForm(appointment);
  };

  const handleSaveEdit = () => {
    if (!editingAppointment) return;
    
    setAppointments(currentAppointments => 
      currentAppointments.map(appointment => 
        appointment.id === editingAppointment 
          ? { ...appointment, ...editForm } as Appointment
          : appointment
      )
    );
    
    setEditingAppointment(null);
    setEditForm({});
    toast.success("Appointment updated successfully");
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
    setEditForm({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleReschedule = (id: string) => {
    toast.success("Reschedule request submitted", {
      description: "You will receive a confirmation soon."
    });
  };

  const handleCancel = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(currentAppointments => 
        currentAppointments.map(appointment => 
          appointment.id === id 
            ? { ...appointment, status: "cancelled" as const }
            : appointment
        )
      );
      toast.success("Appointment cancelled");
    }
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
                {editingAppointment === appointment.id ? (
                  // Edit form
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Edit Appointment</h3>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-7 px-2 text-green-600" 
                          onClick={handleSaveEdit}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 px-2 text-red-600"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Doctor Name</label>
                        <Input 
                          name="doctorName"
                          value={editForm.doctorName || ''}
                          onChange={handleInputChange}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Specialty</label>
                        <Input 
                          name="doctorSpecialty"
                          value={editForm.doctorSpecialty || ''}
                          onChange={handleInputChange}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Date</label>
                        <Input 
                          name="date"
                          value={editForm.date || ''}
                          onChange={handleInputChange}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Time</label>
                        <Input 
                          name="time"
                          value={editForm.time || ''}
                          onChange={handleInputChange}
                          className="h-8"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs text-gray-500 mb-1 block">Notes</label>
                        <Input 
                          name="notes"
                          value={editForm.notes || ''}
                          onChange={handleInputChange}
                          className="h-8"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Display view
                  <>
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
                      <div className="text-right flex flex-col items-end gap-1">
                        <div className={cn("text-xs px-2 py-1 rounded-full border flex items-center gap-1", getStatusColor(appointment.status))}>
                          {getStatusIcon(appointment.status)}
                          <span className="capitalize">{appointment.status}</span>
                        </div>
                        {appointment.status === "scheduled" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2" 
                            onClick={() => handleEdit(appointment)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        )}
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
                      
                      {appointment.status === "scheduled" && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            Join Video
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleReschedule(appointment.id)}
                          >
                            <Calendar className="h-4 w-4" />
                            Reschedule
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleCancel(appointment.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Medical Center, 123 Health St., New York, NY</span>
                      </div>
                    </CollapsibleContent>
                  </>
                )}
              </Collapsible>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
