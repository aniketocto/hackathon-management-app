import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-center text-sm">
          Made with <span className="text-red-500"></span> by Aniket Khambal
        </p>
        {/* <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ff9d] hover:text-cyan-400"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ff9d] hover:text-cyan-400"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ff9d] hover:text-cyan-400"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ff9d] hover:text-cyan-400"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
