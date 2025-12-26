import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-Image.jpg";
import Image from "next/image"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Travelers exploring scenic mountains"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center px-6">
        <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-10 sm:p-14 shadow-2xl animate-fade-up">
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            Find Your Next  
            <span className="text-primary block">Travel Buddy</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mt-6 max-w-2xl mx-auto">
            Meet travel lovers heading to the same destination.  
            Share your trips, explore together, and make unforgettable memories.
          </p>

          <div className="mt-10">
            <Button
              size="lg"
              className="px-10 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90"
            >
              Find a Travel Buddy
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-2 h-3 bg-white/70 rounded-full animate-scroll-dot" />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 1.1s ease-out forwards;
        }
        @keyframes scroll-dot {
          0% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(5px); }
          100% { opacity: 0; transform: translateY(10px); }
        }
        .animate-scroll-dot {
          animation: scroll-dot 1.4s infinite;
        }
      `}</style>

    </section>
  );
};

export default HeroSection;
