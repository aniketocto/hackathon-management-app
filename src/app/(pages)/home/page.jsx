import Link from "next/link";
import { Button } from "../../components/ui/button";
import React from "react";

const LandingPage = () => {
  return (
    <div className="container mx-auto px-6 md:py-20">
      <div className="text-center">
        <h2 className="mt-10  sm:mt-16 text-3xl sm:text-6xl lg:text-7xl text-neonGreen text-center font-extrabold animate-glitch text-shadow-neon">
          HACK THE FUTURE
        </h2>
        <p className="text-xl mt-5 mb-8">
          Join the elite. Code the impossible. Break the boundaries.
        </p>
        <Link href="/">
          <Button className="bg-transparent h-16 border border-neonGreen text-white text-2xl hover:shadow-hover-neon hover:text-neonGreen shadow-neon">
            Register Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
