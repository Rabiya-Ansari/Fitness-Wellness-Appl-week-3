import React from "react";

function Footer({ darkMode }) {
  return (
    <footer
      className={`mt-16 py-8 border-t text-center transition-colors duration-300 ${
        darkMode
          ? "border-gray-700 bg-gray-800 text-gray-300"
          : "border-gray-300 bg-white text-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[#27A5DE]">FitTracker</span>. 
          Track your fitness journey with confidence.
        </p>
      </div>
    </footer>
  );
}

export default Footer;