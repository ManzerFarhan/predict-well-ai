
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
  Pill
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PatientProfileProps {
  profile: PatientProfileType;
}

const PatientProfile = ({ profile }: PatientProfileProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-medical-600" />
          Patient Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <div className="bg-medical-100 rounded-full p-3 mr-4">
                <User className="h-10 w-10 text-medical-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {profile.age} years • {profile.gender}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Droplets className="h-4 w-4 text-red-500 mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-medium">{profile.bloodType}</p>
                </div>
              </div>
              <div className="flex items-center">
                <HeartPulse className="h-4 w-4 text-rose-500 mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Height / Weight</p>
                  <p className="font-medium">{profile.height} / {profile.weight}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-3">
              <div className="flex items-center mb-1">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
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
            
            <div className="mb-3">
              <div className="flex items-center mb-1">
                <HeartPulse className="h-4 w-4 text-medical-500 mr-2" />
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
              <div className="flex items-center mb-1">
                <Pill className="h-4 w-4 text-indigo-500 mr-2" />
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
  );
};

export default PatientProfile;
