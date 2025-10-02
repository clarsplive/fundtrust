import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Community helping each other"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/80"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Empower
            <span className="text-accent-light"> Communities</span>
            <br />
            Through
            <span className="text-secondary-light"> Giving</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Connect with genuine causes across East Africa. Support healthcare, education, 
            and emergency needs through secure mobile money donations.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-secondary-light" />
              <span>100% Transparent</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-secondary-light" />
              <span>Community Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-secondary-light" />
              <span>Mobile Money Secure</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" variant="compassion" className="text-lg px-8 py-4" asChild>
              <Link to="/campaigns">
                Browse Campaigns
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/create-campaign">Start a Campaign</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-light mb-2">
                UGX 2.5M+
              </div>
              <div className="text-white/80">
                Funds Raised
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-light mb-2">
                1,200+
              </div>
              <div className="text-white/80">
                Lives Impacted
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-light mb-2">
                98%
              </div>
              <div className="text-white/80">
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary/20 rounded-full animate-pulse hidden lg:block"></div>
    </section>
  );
};

export default Hero;