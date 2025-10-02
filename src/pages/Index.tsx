import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Smartphone, Eye, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { CreateAdminButton } from "@/components/CreateAdminButton";
import medicalImage from "@/assets/campaign-medical.jpg";
import educationImage from "@/assets/campaign-education.jpg";
import waterImage from "@/assets/campaign-water.jpg";

const Index = () => {
  // Sample campaigns data
  const featuredCampaigns = [
    {
      id: "1",
      title: "Help Little Sarah Get Life-Saving Surgery",
      description: "8-year-old Sarah needs urgent heart surgery. Her family cannot afford the UGX 15M required for the operation that could save her life.",
      targetAmount: 15000000,
      raisedAmount: 8500000,
      imageUrl: medicalImage,
      location: "Kampala, Uganda",
      daysLeft: 12,
      donorCount: 156,
      category: "Medical"
    },
    {
      id: "2", 
      title: "School Books for Rural Students",
      description: "Help provide textbooks and learning materials for 200 students in Gulu who lack access to quality educational resources.",
      targetAmount: 5000000,
      raisedAmount: 3200000,
      imageUrl: educationImage,
      location: "Gulu, Uganda",
      daysLeft: 8,
      donorCount: 89,
      category: "Education"
    },
    {
      id: "3",
      title: "Clean Water for Karamoja Community",
      description: "Fund a borehole to provide clean, safe drinking water for over 500 families in the Karamoja region.",
      targetAmount: 25000000,
      raisedAmount: 18750000,
      imageUrl: waterImage,
      location: "Karamoja, Uganda",
      daysLeft: 15,
      donorCount: 234,
      category: "Community"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Transparent",
      description: "Track every donation and see exactly how funds are used with real-time updates and receipts."
    },
    {
      icon: Smartphone,
      title: "Mobile Money Ready",
      description: "Donate securely using MTN Mobile Money, Airtel Money, or Stanbic FlexiPay in seconds."
    },
    {
      icon: Eye,
      title: "Community Verified", 
      description: "All campaigns are reviewed and verified by local community members before going live."
    },
    {
      icon: DollarSign,
      title: "Low Fees",
      description: "Minimal platform fees ensure maximum funds reach the intended beneficiaries."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Featured Campaigns Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Campaigns
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover verified campaigns making a real difference in communities across East Africa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="trust" size="lg" asChild>
              <Link to="/campaigns">
                View All Campaigns
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose FundConnect?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for East African communities with trust, transparency, and mobile-first approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-4 shadow-trust">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About FundConnect
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering East African communities through transparent, secure fundraising
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Mission</h3>
              <p className="text-muted-foreground text-lg mb-6">
                FundConnect was born from a simple belief: every person deserves access to the support they need during life's most challenging moments. We've built the first fundraising platform designed specifically for East African communities, incorporating mobile money integration and local verification processes.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                Our platform bridges the gap between those who need help and those willing to help, creating a transparent, secure environment where communities can support each other through healthcare emergencies, educational needs, and community development projects.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-lg shadow-card">
                  <div className="text-2xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Campaigns Funded</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg shadow-card">
                  <div className="text-2xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Lives Impacted</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Why We're Different</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Community Verified</h4>
                    <p className="text-muted-foreground">Local community members verify every campaign before it goes live</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Smartphone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Mobile Money Integration</h4>
                    <p className="text-muted-foreground">Seamless donations through MTN Mobile Money and Airtel Money</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Eye className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">100% Transparent</h4>
                    <p className="text-muted-foreground">Track every donation with real-time updates and receipts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? Need help with your campaign? We're here to support you every step of the way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-4 shadow-trust">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Support Center</h3>
              <p className="text-muted-foreground mb-4">Get help with campaigns, donations, or technical issues</p>
              <Button variant="outline" asChild>
                <Link to="/support">Visit Support Center</Link>
              </Button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-4 shadow-trust">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Partnership Inquiries</h3>
              <p className="text-muted-foreground mb-4">Interested in partnering with FundConnect?</p>
              <p className="text-primary font-semibold">partnerships@fundconnect.org</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-4 shadow-trust">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Media & Press</h3>
              <p className="text-muted-foreground mb-4">Media inquiries and press relations</p>
              <p className="text-primary font-semibold">press@fundconnect.org</p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-trust rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">General Support</p>
                  <p className="text-muted-foreground">support@fundconnect.org</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-trust rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">WhatsApp Support</p>
                  <p className="text-muted-foreground">+256 700 123 456</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-trust rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Office Location</p>
                  <p className="text-muted-foreground">Kampala, Uganda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of donors and campaign creators building stronger communities across East Africa
          </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Button size="lg" variant="compassion" className="text-lg px-8 py-4" asChild>
               <Link to="/campaigns">Start Donating</Link>
             </Button>
             <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white text-white hover:bg-white hover:text-primary" asChild>
               <Link to="/create-campaign">Create Campaign</Link>
             </Button>
           </div>
           <div className="mt-6">
             <CreateAdminButton />
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FundConnect</span>
              </div>
              <p className="text-primary-foreground/80">
                Empowering East African communities through transparent, secure fundraising.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/campaigns" className="hover:text-white transition-colors">Browse Campaigns</Link></li>
                <li><Link to="/create-campaign" className="hover:text-white transition-colors">Start Campaign</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/safety" className="hover:text-white transition-colors">Safety & Trust</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/fees" className="hover:text-white transition-colors">Fee Structure</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 FundConnect. All rights reserved. Built for East African communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;