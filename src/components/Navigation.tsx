import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Heart, Users, Shield, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'funds_admin':
        return 'Funds Admin';
      case 'contributor':
        return 'Contributor';
      default:
        return 'Donor';
    }
  };

  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-trust rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">FundConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/campaigns" className="text-foreground hover:text-primary font-medium transition-colors">
              Browse Campaigns
            </Link>
            <Link to="/how-it-works" className="text-foreground hover:text-primary font-medium transition-colors">
              How It Works
            </Link>
            <a href="/#about" className="text-foreground hover:text-primary font-medium transition-colors">
              About Us
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin() && (
                  <Button variant="outline" asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {profile?.full_name?.[0] || user.email?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        {profile?.role && (
                          <Badge variant="outline" className="text-xs">
                            {getRoleLabel(profile.role)}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin() && (
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Log In</Link>
                </Button>
                <Button variant="trust" asChild>
                  <Link to="/auth">Start a Campaign</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/campaigns" 
                className="text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Campaigns
              </Link>
              <Link 
                to="/how-it-works" 
                className="text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <a 
                href="/#about" 
                className="text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <div className="px-2 py-1">
                      <p className="font-medium text-sm">{profile?.full_name || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      {profile?.role && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {getRoleLabel(profile.role)}
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" asChild>
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                    </Button>
                    <Button variant="ghost" onClick={() => { handleSignOut(); setIsMenuOpen(false); }}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                    </Button>
                    <Button variant="trust" asChild>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Start a Campaign</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;