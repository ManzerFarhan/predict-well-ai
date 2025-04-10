
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Star } from "lucide-react";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  image: string;
  availability: string;
  onSelect: (doctorId: string) => void;
}

const DoctorCard = ({
  id,
  name,
  specialty,
  experience,
  rating,
  image,
  availability,
  onSelect,
}: DoctorCardProps) => {
  const handleSelect = () => {
    onSelect(id);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-200 relative overflow-hidden">
        <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{availability}</span>
        </div>
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x300/d1d5db/6b7280?text=Doctor+Photo&font=roboto";
          }}
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div>
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-sm text-medical-500">{specialty}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">{experience} exp.</span>
        </div>
        <Button 
          className="w-full mt-2" 
          onClick={handleSelect}
        >
          Book Consultation
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
