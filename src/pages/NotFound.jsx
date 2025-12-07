import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-5">
      
      {/* Animated Plant */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-6">
        <div className="stem"></div>
        <div className="leaf leaf-left"></div>
        <div className="leaf leaf-right"></div>
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-green-700 tracking-wide">
        404
      </h1>

      <p className="text-lg text-gray-600 mt-3 text-center max-w-md">
        Looks like this page has not grown yet!  
        Please go back and try again 🌱
      </p>

      {/* Button */}
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-all"
      >
        Go Home
      </a>

      {/* Animation Styles */}
      <style>{`
        .stem {
          width: 6px;
          height: 70px;
          background: #32a852;
          border-radius: 3px;
          animation: grow 2s ease-out forwards;
        }

        .leaf {
          width: 40px;
          height: 20px;
          background: #32a852;
          border-radius: 20px 20px 0 20px;
          position: absolute;
          top: 20px;
          opacity: 0;
          animation: fadeIn 1.5s ease-out forwards;
        }

        .leaf-left {
          transform: rotate(-35deg);
          left: -20px;
          animation-delay: 1s;
        }

        .leaf-right {
          transform: rotate(35deg);
          right: -20px;
          animation-delay: 1.2s;
        }

        @keyframes grow {
          0% { height: 0; }
          100% { height: 70px; }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>

  )
}
