import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Item } from "@/types/item";
import { useItems } from "@/hooks/useItems";
import ItemCard from "@/components/ItemCard";
import Header from "@/components/Header";
import ItemModal from "@/components/ItemModal";

const Browse = () => {
  const navigate = useNavigate();
  const { items, loading, error } = useItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [items, searchTerm, typeFilter, categoryFilter]);

  const lostCount = items.filter(item => item.type === 'lost').length;
  const foundCount = items.filter(item => item.type === 'found').length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Browse Items</h1>
              <p className="text-muted-foreground mt-2">
                Search through {items.length} reported items
              </p>
            </div>
            
            <div className="flex gap-4">
              <Badge variant="destructive" className="px-3 py-1">
                {lostCount} Lost
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                {foundCount} Found
              </Badge>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-card p-6 rounded-lg shadow-soft space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for items, descriptions, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-3">
                <Select value={typeFilter} onValueChange={(value: 'all' | 'lost' | 'found') => setTypeFilter(value)}>
                  <SelectTrigger className="w-[120px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="lost">Lost Only</SelectItem>
                    <SelectItem value="found">Found Only</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {(searchTerm || typeFilter !== 'all' || categoryFilter !== 'all') && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Showing {filteredItems.length} results</span>
                {(searchTerm || typeFilter !== 'all' || categoryFilter !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setTypeFilter('all');
                      setCategoryFilter('all');
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading items...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Error loading items: {error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {items.length === 0 ? "No items reported yet" : "No items match your search"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {items.length === 0 
                  ? "Be the first to report a lost or found item!"
                  : "Try adjusting your search terms or filters to find what you're looking for."
                }
              </p>
              <Button 
                variant="hero" 
                onClick={() => navigate('/submit')}
              >
                Report an Item
              </Button>
            </div>
          </div>
        )}

        {/* Item Detail Modal */}
        {selectedItem && (
          <ItemModal
            item={selectedItem}
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Browse;