import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, CheckCircle, Heart, Smartphone, DollarSign, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Campaign",
      description: "Tell your story, set your goal, and upload supporting documents. Our team reviews and verifies every campaign.",
      icon: Heart,
      features: ["Free campaign creation", "Photo and document upload", "Community verification", "Goal setting tools"]
    },
    {
      number: "02", 
      title: "Share with Community",
      description: "Share your campaign link with family, friends, and social media to reach potential donors across East Africa.",
      icon: Users,
      features: ["Social media sharing", "Email invitations", "WhatsApp integration", "Community networks"]
    },
    {
      number: "03",
      title: "Receive Mobile Donations",
      description: "Donors contribute securely using MTN Mobile Money, Airtel Money, or bank transfers with instant notifications.",
      icon: Smartphone,
      features: ["Mobile Money support", "Bank transfers", "Instant notifications", "Real-time tracking"]
    },
    {
      number: "04",
      title: "Transparent Fund Management", 
      description: "Track every donation in real-time and provide updates to your donors with receipts and progress reports.",
      icon: Shield,
      features: ["Real-time tracking", "Automatic receipts", "Progress updates", "Fund protection"]
    }
  ];

  const donorSteps = [
    {
      title: "Browse Verified Campaigns",
      description: "Explore campaigns that have been verified by our community review process.",
      icon: Eye
    },
    {
      title: "Choose Your Amount",
      description: "Donate any amount from UGX 1,000 using mobile money or bank transfer.",
      icon: DollarSign
    },
    {
      title: "Get Instant Receipt",
      description: "Receive immediate confirmation and tax-deductible receipt for your donation.",
      icon: CheckCircle
    },
    {
      title: "Track Impact",
      description: "Follow the campaign progress and see exactly how your donation makes a difference.",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How FundConnect Works
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Simple, secure, and transparent fundraising designed specifically for East African communities
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="compassion" className="text-lg px-8 py-4" asChild>
              <Link to="/auth">Start a Campaign</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/campaigns">Browse Campaigns</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Campaign Creators */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              For Campaign Creators
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Launch your fundraising campaign in 4 simple steps
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl font-bold text-primary mr-4">{step.number}</span>
                    <div className="w-12 h-12 bg-gradient-trust rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-lg mb-6">{step.description}</p>
                  <ul className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-primary mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-muted/30 rounded-2xl p-8 h-64 flex items-center justify-center">
                    <step.icon className="w-24 h-24 text-primary/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Donors */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              For Donors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Support verified campaigns with confidence and transparency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {donorSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-4 shadow-trust">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trust & Security
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your safety and security are our top priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-4 shadow-trust">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Verified Campaigns</h3>
              <p className="text-muted-foreground">Every campaign goes through our community verification process before going live.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-4 shadow-trust">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Secure Payments</h3>
              <p className="text-muted-foreground">All transactions are encrypted and processed through secure mobile money gateways.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-4 shadow-trust">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Full Transparency</h3>
              <p className="text-muted-foreground">Track every donation and see exactly how funds are used with real-time updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands making a difference across East Africa
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="compassion" className="text-lg px-8 py-4" asChild>
              <Link to="/auth">
                Create Campaign
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/campaigns">Browse Campaigns</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;