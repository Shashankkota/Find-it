import { Button } from "@/components/ui/button";
import { Search, Plus, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-card border-b shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Search className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">FindIt</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/browse" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/browse' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Browse Items
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/browse">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Search className="h-4 w-4" />
                Browse
              </Button>
            </Link>
            <Link to="/submit">
              <Button variant="hero" size="sm">
                <Plus className="h-4 w-4" />
                Report Item
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;