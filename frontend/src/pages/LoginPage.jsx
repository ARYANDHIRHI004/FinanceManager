import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../stores/useAuthStore";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const handleLogin = async (data) => {
    const success = await loginUser(data);
    if (success) navigate("/accounts");
  };

  // Animated particle background (unchanged)
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
    <div className="min-h-screen bg-[#080b14] flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Blobs */}
      <div className="fixed w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[90px] top-[-100px] left-[-80px]" />
      <div className="fixed w-[320px] h-[320px] bg-blue-500/10 rounded-full blur-[90px] bottom-[-60px] right-[-60px]" />

      {/* Card */}
      <div className="relative z-10 w-[360px] bg-[#0f1320]/85 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Header */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-[11px] text-purple-300 tracking-wider font-mono">
              secure login
            </span>
          </div>

          <h1 className="text-xl font-semibold text-white">Welcome back</h1>
          <p className="text-xs text-gray-400 mt-1">
            Sign in to continue to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-4">
            
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">
                Email or Username
              </label>
              <input
                type="text"
                {...register("usernameOrEmail")}
                placeholder="you@example.com"
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
              disabled={isLoggingIn}
              className="h-11 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60"
            >
              {isLoggingIn ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-5">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] text-gray-500 font-mono tracking-wider">
            or continue with
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* OAuth */}
        <div className="flex flex-col gap-2">
          
          <button className="h-10 rounded-lg border border-white/10 bg-white/5 text-gray-300 text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition">
            {/* Google Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Login with Google
          </button>

          <button className="h-10 rounded-lg border border-white/10 bg-white/5 text-gray-300 text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition">
            {/* GitHub Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Login with GitHub
          </button>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-purple-400 hover:text-purple-300">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;