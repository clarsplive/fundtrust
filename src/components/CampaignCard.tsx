import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  imageUrl: string;
  location: string;
  daysLeft: number;
  donorCount: number;
  category: string;
}

const CampaignCard = ({
  id,
  title,
  description,
  targetAmount,
  raisedAmount,
  imageUrl,
  location,
  daysLeft,
  donorCount,
  category
}: CampaignCardProps) => {
  const progress = (raisedAmount / targetAmount) * 100;
  const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-trust transition-all duration-300 transform hover:-translate-y-1 bg-card">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button className="bg-card/80 backdrop-blur-sm p-2 rounded-full hover:bg-card transition-colors">
            <Heart className="w-4 h-4 text-muted-foreground hover:text-accent-coral" />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-card-foreground mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(raisedAmount)}
            </span>
            <span className="text-sm text-muted-foreground">
              of {formatCurrency(targetAmount)}
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-2" />
          <div className="text-sm text-muted-foreground">
            {Math.round(progress)}% funded
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{donorCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{daysLeft} days</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1" asChild>
            <Link to={`/campaign/${id}`}>Learn More</Link>
          </Button>
          <Button variant="compassion" className="flex-1" asChild>
            <Link to={`/campaign/${id}/donate`}>Donate Now</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CampaignCard;