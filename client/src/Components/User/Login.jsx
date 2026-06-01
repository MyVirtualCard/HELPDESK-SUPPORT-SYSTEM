import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Headphones,
  Ticket,
} from "lucide-react";

import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();

const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
  email: "",
  password: "",
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

    setLoading(true);

    const res = await API.post(
      "/auth/login",
      formData
    );

    // ========================
    // SAVE AUTH
    // ========================

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    // ========================
    // SUCCESS TOAST
    // ========================

    toast.success(
      `Welcome ${res.data.user.name}`
    );

    // ========================
    // ROLE NAVIGATION
    // ========================

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
        navigate("/customer-dashboard");
      }

    }, 1000);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Login failed"
    );

  } finally {

    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 overflow-hidden relative flex items-center justify-center px-2 sm:px-4 sm:py-10 py-0">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Main Card */}
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 sm:rounded-[40px] rounded-md overflow-hidden shadow-2xl relative z-10 animate-[fadeIn_0.8s_ease] h-full">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-r border-white/10 relative overflow-hidden">

          {/* Logo */}
          <div>
            <div onClick={()=>navigate('/')} className="cursor-pointer flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-400/20 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-cyan-400" />
              </div>

              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-wide">
                  AST
                </h1>

                <p className="text-cyan-300 text-sm tracking-widest">
                  HELPDESK SYSTEM
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mt-20">
              <h2 className="text-5xl font-extrabold text-white leading-tight">
                Welcome Back <br />
                <span className="text-cyan-400">
                  Support Team
                </span>
              </h2>

              <p className="mt-6 text-slate-300 text-lg leading-8">
                Manage support tickets, communicate with customers,
                and monitor your helpdesk operations from one place.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-5 mt-10">

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:translate-x-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <Ticket className="text-cyan-400" />
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  Ticket Management
                </h3>

                <p className="text-slate-400 text-sm">
                  Handle customer issues efficiently
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:translate-x-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <ShieldCheck className="text-cyan-400" />
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  Secure Access
                </h3>

                <p className="text-slate-400 text-sm">
                  Protected role-based authentication
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-4 sm:p-8 md:p-14 flex items-center justify-center">

          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="text-center lg:text-left">
              <Link to={'/'} className="text-4xl font-extrabold text-white">
                Sign In
              </Link>

              <p className="text-slate-400 mt-3">
                Login to access your helpdesk dashboard
              </p>
            </div>

            {/* Form */}
            <form   onSubmit={handleSubmit} className="mt-10 space-y-6">

              {/* Email */}
              <div>
                <label className="text-slate-300 text-sm">
                  Email Address
                </label>

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
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 text-sm">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-cyan-400 text-sm hover:text-cyan-300 transition-all"
                  >
                    Forgot Password?
                  </button>
                </div>

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
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-all"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-cyan-400"
                  />

                  <span className="text-slate-400 text-sm">
                    Remember me
                  </span>
                </label>

                <div className="text-sm text-slate-500">
                  Secure Login
                </div>
              </div>

              {/* Button */}
          <button
  type="submit"
  disabled={loading}
  className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-3"
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>

      Logging in...
    </>
  ) : (
    "Login Now"
  )}
</button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-white/10"></div>

                <span className="text-slate-500 text-sm">
                  OR
                </span>

                <div className="flex-1 h-[1px] bg-white/10"></div>
              </div>

              {/* Register */}
              <div className="text-center">
                <p className="text-slate-400">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Create Account
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
              transform: scale(0.96);
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

export default Login;