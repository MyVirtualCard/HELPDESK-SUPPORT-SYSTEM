import React from "react";
import { Link } from "react-router-dom";
import { Headphones, ShieldCheck, Ticket, MessageCircle } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 md:px-6 py-6 relative z-10">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
          AST <span className="text-cyan-400">HELPDESK</span>
        </h1>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-xl bg-cyan-400 text-black font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-14 min-h-[85vh] flex flex-col-reverse lg:flex-row items-center justify-between relative z-10">
        
        {/* Left Content */}
        <div className="max-w-2xl text-center lg:text-left animate-[fadeInUp_1s_ease]">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-6">
            <Headphones className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-cyan-300">
              Professional Customer Support System
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Smart Helpdesk <br />
            <span className="text-cyan-400">Support Platform</span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg leading-8 max-w-xl">
            Manage customer tickets, live chat, support requests, and team
            collaboration in one powerful modern platform.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/40"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl border border-slate-600 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 mt-14">
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl hover:scale-105 transition-all duration-300">
              <h2 className="text-3xl font-bold text-cyan-400">24/7</h2>
              <p className="text-slate-400 text-sm mt-2">Support</p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl hover:scale-105 transition-all duration-300">
              <h2 className="text-3xl font-bold text-cyan-400">100%</h2>
              <p className="text-slate-400 text-sm mt-2">Secure</p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl hover:scale-105 transition-all duration-300">
              <h2 className="text-3xl font-bold text-cyan-400">Live</h2>
              <p className="text-slate-400 text-sm mt-2">Chat</p>
            </div>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="relative mb-16 lg:mb-0 flex items-center justify-center">
          
          <div className="relative w-[350px] h-[350px]">
            
            {/* Main Card */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-float">
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold">
                    Helpdesk Dashboard
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Real-time Support System
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center">
                  <ShieldCheck className="text-cyan-400" />
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-slate-900/60 p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Ticket className="text-cyan-400" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Ticket Management</h4>
                    <p className="text-sm text-slate-400">
                      Track & resolve customer issues
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <MessageCircle className="text-cyan-400" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Live Chat Support</h4>
                    <p className="text-sm text-slate-400">
                      Real-time communication
                    </p>
                  </div>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[85%] animate-pulse rounded-full"></div>
                </div>

                <p className="text-right text-sm text-cyan-300">
                  System Performance 85%
                </p>
              </div>
            </div>

            {/* Floating Small Card */}
            <div className="absolute -bottom-8 -left-8 bg-cyan-400 text-black px-6 py-4 rounded-2xl font-bold shadow-2xl animate-bounce">
              +128 Active Tickets
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Home;