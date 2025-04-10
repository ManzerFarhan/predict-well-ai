
import { PatientProfile, Appointment } from "@/types/health";

// Sample patient profile for demonstration
export const getMockPatientProfile = (): PatientProfile => {
  return {
    id: "p12345",
    name: "Alex Johnson",
    age: 42,
    gender: "Male",
    bloodType: "O+",
    height: "5'11\"",
    weight: "175 lbs",
    allergies: ["Penicillin", "Pollen"],
    conditions: ["Hypertension", "Asthma"],
    medications: ["Lisinopril 10mg", "Albuterol"]
  };
};

// Sample appointments for demonstration
export const getMockAppointments = (): Appointment[] => {
  return [
    {
      id: "apt-001",
      doctorName: "Dr. Sarah Williams",
      doctorSpecialty: "Cardiologist",
      date: "Apr 15, 2025",
      time: "10:30 AM",
      status: "scheduled",
      notes: "Follow-up on recent blood pressure readings and medication adjustment."
    },
    {
      id: "apt-002",
      doctorName: "Dr. Michael Chen",
      doctorSpecialty: "Pulmonologist",
      date: "Apr 22, 2025",
      time: "2:15 PM",
      status: "scheduled",
      notes: "Annual asthma checkup and inhaler prescription renewal."
    },
    {
      id: "apt-003",
      doctorName: "Dr. Emily Rodriguez",
      doctorSpecialty: "General Practitioner",
      date: "Mar 30, 2025",
      time: "9:00 AM",
      status: "completed",
      notes: "Regular health checkup. Blood samples taken for analysis."
    }
  ];
};
