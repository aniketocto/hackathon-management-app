import { GithubIcon } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex justify-around items-center">
        <p className="text-center text-sm">
          Made by Aniket Khambal
        </p>
         <div className="flex space-x-4">
          
          <a
            href="https://github.com/aniketocto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ff9d] hover:text-cyan-400"
          >
            <GithubIcon />
          </a>
          
        </div> 
      </div>
    </footer>
  );
};

export default Footer;
