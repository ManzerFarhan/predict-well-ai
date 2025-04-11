
import { PatientProfile as PatientProfileType } from "@/types/health";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { 
  User, 
  Droplets, 
  HeartPulse, 
  AlertCircle, 
  Pill,
  CalendarDays,
  Scale,
  Ruler
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PatientProfileSectionProps {
  profile: PatientProfileType;
}

const PatientProfileSection = ({ profile }: PatientProfileSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Patient Profile</h2>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="bg-medical-100 rounded-full p-3 mr-4">
                  <User className="h-10 w-10 text-medical-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{profile.name}</h3>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarDays className="h-4 w-4 mr-1 text-gray-500" />
                      {profile.age} years
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-1 text-gray-500" />
                      {profile.gender}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Droplets className="h-8 w-8 text-red-500 mr-3 p-1 bg-red-50 rounded-md" />
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Type</p>
                    <p className="font-medium text-lg">{profile.bloodType}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Scale className="h-8 w-8 text-blue-500 mr-3 p-1 bg-blue-50 rounded-md" />
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium text-lg">{profile.weight}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Ruler className="h-8 w-8 text-green-500 mr-3 p-1 bg-green-50 rounded-md" />
                  <div>
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="font-medium text-lg">{profile.height}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="font-medium">Allergies</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {profile.allergies.length > 0 ? (
                    profile.allergies.map((allergy, index) => (
                      <Badge key={index} variant="outline" className="bg-amber-50">
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No known allergies</p>
                  )}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <HeartPulse className="h-5 w-5 text-medical-500 mr-2" />
                  <p className="font-medium">Medical Conditions</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {profile.conditions.length > 0 ? (
                    profile.conditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="bg-medical-50">
                        {condition}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No medical conditions</p>
                  )}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Pill className="h-5 w-5 text-indigo-500 mr-2" />
                  <p className="font-medium">Current Medications</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {profile.medications.length > 0 ? (
                    profile.medications.map((medication, index) => (
                      <Badge key={index} variant="outline" className="bg-indigo-50">
                        {medication}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No current medications</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfileSection;
