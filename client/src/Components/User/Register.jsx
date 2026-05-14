import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post(
      "/auth/register",
      formData
    );

    toast.success("Registration Successful");

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    const role = res.data.user.role;

    setTimeout(() => {

      if (role === "admin") {
        navigate("/admin");
      }

      else if (role === "support") {
        navigate("/support");
      }

      else if (role === "sales") {
        navigate("/sales");
      }

      else {
        navigate("/customer");
      }

    }, 1000);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 overflow-hidden relative flex items-center justify-center px-0 py-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Main Container */}
      <div className="w-full max-w-7xl grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[0px] overflow-hidden shadow-2xl relative z-10 animate-[fadeIn_1s_ease]">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-start p-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-r border-white/10 relative overflow-hidden">
          <div>
            <div onClick={()=>navigate('/')} className="flex items-center gap-3 cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center">
                <Headphones className="text-cyan-400 w-7 h-7" />
              </div>

              <div>
                <h1 className="text-3xl font-extrabold text-white">AST</h1>
                <p className="text-cyan-300 text-sm">HELPDESK SYSTEM</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-5xl font-extrabold text-white leading-tight">
                Join The <br />
                <span className="text-cyan-400">Future Of Support</span>
              </h2>

              <p className="mt-6 text-slate-300 text-lg leading-8">
                Build better customer relationships with real-time ticket
                management, live support, and modern helpdesk automation.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-5 mt-10">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:translate-x-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <ShieldCheck className="text-cyan-400" />
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  Secure Authentication
                </h3>
                <p className="text-slate-400 text-sm">
                  JWT protected account access
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:translate-x-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <Headphones className="text-cyan-400" />
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  Live Customer Support
                </h3>
                <p className="text-slate-400 text-sm">
                  Real-time chat assistance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-8 md:p-6 flex items-center justify-center">
          <div className="w-full ">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-extrabold text-white">
                Create Account
              </h2>

              <p className="text-slate-400 mt-3">
                Register to access the helpdesk support system
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Name */}
              <div>
                <label className="text-slate-300 text-sm">Full Name <sup>*</sup></label>

                <div className="mt-2 relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-slate-300 text-sm">Email Address <sup>*</sup></label>

                <div className="mt-2 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                      onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-slate-300 text-sm">Password <sup>*</sup></label>

                <div className="mt-2 relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-14 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-all"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
    {/* Role Selection */}
<div>
  <label className="text-slate-300 text-sm font-medium">
    Choose Your Role
  </label>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    
    {/* Customer */}
    <label
      className={`relative cursor-pointer rounded-2xl border p-3 transition-all duration-300 group overflow-hidden ${
        formData.role === "customer"
          ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-500/20"
          : "border-white/10 bg-white/5 hover:border-cyan-400/40"
      }`}
    >
      <input
        type="radio"
        name="role"
        value="customer"
        checked={formData.role === "customer"}
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex items-center justify-between">
        <div className="flex-10">
          <h3 className="text-white font-semibold text-sm">
            Customer
          </h3>

          <p className="text-slate-400 text-xs mt-1">
            Raise & track support tickets
          </p>
        </div>

        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            formData.role === "customer"
              ? "border-cyan-400"
              : "border-slate-500"
          }`}
        >
          {formData.role === "customer" && (
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
          )}
        </div>
      </div>

   
    </label>

    {/* Support */}
    <label
      className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 overflow-hidden ${
        formData.role === "support"
          ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-500/20"
          : "border-white/10 bg-white/5 hover:border-cyan-400/40"
      }`}
    >
      <input
        type="radio"
        name="role"
        value="support"
        checked={formData.role === "support"}
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex items-center justify-between">
        <div className="flex-10">
          <h3 className="text-white font-semibold text-sm">
            Support Agent
          </h3>

          <p className="text-slate-400 text-xs mt-1">
            Manage tickets & live chats
          </p>
        </div>

        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            formData.role === "support"
              ? "border-cyan-400"
              : "border-slate-500"
          }`}
        >
          {formData.role === "support" && (
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
          )}
        </div>
      </div>

     
    </label>

    {/* Sales */}
    <label
      className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 overflow-hidden ${
        formData.role === "sales"
          ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-500/20"
          : "border-white/10 bg-white/5 hover:border-cyan-400/40"
      }`}
    >
      <input
        type="radio"
        name="role"
        value="sales"
        checked={formData.role === "sales"}
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex items-center justify-between">
        <div className="flex-10">
          <h3 className="text-white font-semibold text-sm">
            Sales Team
          </h3>

          <p className="text-slate-400 text-xs mt-1">
            Handle client inquiries & onboarding
          </p>
        </div>

        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            formData.role === "sales"
              ? "border-cyan-400"
              : "border-slate-500"
          }`}
        >
          {formData.role === "sales" && (
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
          )}
        </div>
      </div>

  
    </label>
  </div>

  {/* Dynamic Note */}
  <div className="mt-5 bg-white/5 border border-white/10 rounded-2xl p-4">
    {formData.role === "customer" && (
      <p className="text-sm text-slate-300 leading-7">
        Customers can create support tickets, track issue status,
        chat with support agents, and receive real-time updates.
      </p>
    )}

    {formData.role === "support" && (
      <p className="text-sm text-slate-300 leading-7">
        Support agents can manage assigned tickets, reply to
        customers, update ticket status, and provide live support.
      </p>
    )}

    {formData.role === "sales" && (
      <p className="text-sm text-slate-300 leading-7">
        Sales members can manage customer inquiries, onboarding
        requests, pricing discussions, and lead communication.
      </p>
    )}
  </div>
</div>
              {/* Button */}
              <button
                type="submit"
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-2xl shadow-cyan-500/30"
              >
                Create Account
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-white/10"></div>

                <span className="text-slate-500 text-sm">OR</span>

                <div className="flex-1 h-[1px] bg-white/10"></div>
              </div>

              {/* Login */}
              <div className="text-center">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Register;
