import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Phone, Mail, User } from "lucide-react";
import { Item } from "@/types/item";

interface ItemModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

const ItemModal = ({ item, isOpen, onClose }: ItemModalProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleContact = (type: 'phone' | 'email') => {
    if (type === 'phone' && item.contactPhone) {
      window.open(`tel:${item.contactPhone}`);
    } else if (type === 'email' && item.contactEmail) {
      window.open(`mailto:${item.contactEmail}?subject=Regarding ${item.type} item: ${item.name}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                {item.name}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={item.type === 'lost' ? 'destructive' : 'secondary'}
                  className="text-sm"
                >
                  {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                </Badge>
                <Badge variant="outline">{item.category}</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-muted-foreground">{item.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Date {item.type === 'lost' ? 'Lost' : 'Found'}</p>
                  <p className="text-muted-foreground">{formatDate(item.date)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Reported by</p>
                  <p className="text-muted-foreground">{item.contactName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {item.contactPhone && (
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => handleContact('phone')}
                >
                  <Phone className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Call</p>
                    <p className="text-sm text-muted-foreground">{item.contactPhone}</p>
                  </div>
                </Button>
              )}

              {item.contactEmail && (
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => handleContact('email')}
                >
                  <Mail className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{item.contactEmail}</p>
                  </div>
                </Button>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Reported on {new Date(item.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="hero" className="flex-1" onClick={onClose}>
              Contact Reporter
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;