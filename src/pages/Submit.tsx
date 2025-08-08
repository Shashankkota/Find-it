import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Item, ItemFormData } from "@/types/item";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Submit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useLocalStorage<Item[]>('lostFoundItems', []);
  
  const [formData, setFormData] = useState<ItemFormData>({
    type: 'lost',
    name: '',
    description: '',
    location: '',
    date: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    category: ''
  });

  const categories = [
    'Electronics',
    'Jewelry',
    'Clothing',
    'Bags & Wallets',
    'Keys',
    'Documents',
    'Sports Equipment',
    'Books',
    'Toys',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.location || !formData.date || !formData.contactName || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.contactPhone && !formData.contactEmail) {
      toast({
        title: "Contact Information Required",
        description: "Please provide either a phone number or email address.",
        variant: "destructive"
      });
      return;
    }

    const newItem: Item = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    setItems(prev => [newItem, ...prev]);
    
    toast({
      title: "Item Reported Successfully!",
      description: `Your ${formData.type} item "${formData.name}" has been added to our database.`
    });

    navigate('/browse');
  };

  const handleInputChange = (field: keyof ItemFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Report an Item</h1>
          <p className="text-muted-foreground mt-2">
            Help reunite lost items with their owners or report something you've found.
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">What are you reporting?</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value: 'lost' | 'found') => handleInputChange('type', value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lost" id="lost" />
                    <Label htmlFor="lost">I lost something</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="found" id="found" />
                    <Label htmlFor="found">I found something</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., iPhone 14, Blue Wallet, Car Keys"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a detailed description including color, size, brand, distinctive features..."
                  rows={4}
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Central Park, Starbucks on 5th Ave, University Library"
                  required
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">Date {formData.type === 'lost' ? 'Lost' : 'Found'} *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    placeholder="Full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email Address</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  * At least one contact method (phone or email) is required
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" variant="hero">
                <Save className="h-4 w-4 mr-2" />
                Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Submit;