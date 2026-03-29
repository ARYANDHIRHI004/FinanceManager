import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../stores/useAuthStore";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { register, handleSubmit } = useForm();
  const { signupUser, isSigningUp } = useAuthStore();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const handleSignup = async (data) => {
    const success = await signupUser(data);
    if (success) navigate("/accounts");
  };

  // Same animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#080b14] flex items-center justify-center relative overflow-hidden">
      
      {/* Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Blobs */}
      <div className="fixed w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[90px] top-[-100px] left-[-80px]" />
      <div className="fixed w-[320px] h-[320px] bg-blue-500/10 rounded-full blur-[90px] bottom-[-60px] right-[-60px]" />

      {/* Card */}
      <div className="relative z-10 w-[380px] bg-[#0f1320]/85 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Header */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-[11px] text-purple-300 tracking-wider font-mono">
              create account
            </span>
          </div>

          <h1 className="text-xl font-semibold text-white">Join us</h1>
          <p className="text-xs text-gray-400 mt-1">
            Create your account to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="flex flex-col gap-4">

            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullname")}
                placeholder="John Doe"
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                placeholder="yourusername"
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="h-11 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60"
            >
              {isSigningUp ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Create account"
              )}
            </button>
          </div>
        </form>

       
        {/* Footer */}
        <div className="mt-5 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link to={"/login"} className="text-purple-400 hover:text-purple-300">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;