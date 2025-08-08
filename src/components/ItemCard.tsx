import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Phone, Mail } from "lucide-react";
import { Item } from "@/types/item";

interface ItemCardProps {
  item: Item;
  onClick: () => void;
}

const ItemCard = ({ item, onClick }: ItemCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="group hover:shadow-glow transition-all duration-300 cursor-pointer border-border hover:border-primary/20" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <Badge 
              variant={item.type === 'lost' ? 'destructive' : 'secondary'}
              className="mt-1"
            >
              {item.type === 'lost' ? 'Lost' : 'Found'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{item.location}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(item.date)}</span>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {item.contactPhone && <Phone className="h-3 w-3" />}
              {item.contactEmail && <Mail className="h-3 w-3" />}
              <span>Contact available</span>
            </div>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;