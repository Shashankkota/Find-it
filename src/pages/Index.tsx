import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, TrendingUp, Users, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Item } from "@/types/item";
import Header from "@/components/Header";
import ItemCard from "@/components/ItemCard";
import { useState } from "react";
import ItemModal from "@/components/ItemModal";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [items] = useLocalStorage<Item[]>('lostFoundItems', []);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
  const lostCount = items.filter(item => item.type === 'lost').length;
  const foundCount = items.filter(item => item.type === 'found').length;
  const recentItems = items.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Find What's
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Lost</span>,
                  Return What's
                  <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"> Found</span>
                </h1>
                <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                  Connect with your community to reunite lost items with their owners. 
                  Every item has a story, and every return makes a difference.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/submit">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    <Plus className="h-5 w-5 mr-2" />
                    Report an Item
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Search className="h-5 w-5 mr-2" />
                    Browse Items
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 pt-8">
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive" className="px-3 py-1">
                    {lostCount} Lost
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    {foundCount} Found
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{items.length} Total Reports</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="People helping each other find lost items"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How FindIt Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple steps to help reunite lost items with their rightful owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-soft hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Report Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Quickly report lost or found items with detailed descriptions, 
                  locations, and contact information.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Search & Browse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Search through our database of items using keywords, 
                  categories, and location filters.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Connect & Return</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect directly with item owners or finders to arrange 
                  safe returns and reunions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Items */}
      {recentItems.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Recent Reports</h2>
                <p className="text-muted-foreground">Latest items reported by the community</p>
              </div>
              <Link to="/browse">
                <Button variant="outline">
                  View All Items
                  <TrendingUp className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Help Build a Caring Community
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Every item you report and every search you make helps create stronger 
            connections in our community. Be part of the solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/submit">
              <Button variant="hero" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Report Your First Item
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" size="lg">
                <MapPin className="h-5 w-5 mr-2" />
                Explore Lost Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Index;
