import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import ChalkParticles from "../components/ChalkParticles";
import { useAuth } from "../context/AuthContext";

const TITLE = "ECO-SCHOOL TYCOON";

export default function LoginPage() {
  const { isAuthenticated, loading: authLoading, login, register } = useAuth();

  const [view, setView] = useState("intro");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [typedTitle, setTypedTitle] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (view !== "intro" || typingDone) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i <= TITLE.length) setTypedTitle(TITLE.slice(0, i++));
      else {
        setTypingDone(true);
        clearInterval(timer);
      }
    }, 130);
    return () => clearInterval(timer);
  }, [view, typingDone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      isLogin
        ? await login(form.email, form.password)
        : await register(
            form.firstname,
            form.lastname,
            form.email,
            form.password
          );

      Swal.fire({
        icon: "success",
        title: isLogin ? "Welcome back!" : "Mission accepted!",
        timer: 1400,
        showConfirmButton: false,
        background: "#e8e4d0",
        color: "#1a4d2e",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Access denied",
        text: err.response?.data?.message || "Try again",
        background: "#e8e4d0",
        color: "#1a4d2e",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated && !authLoading)
    return <Navigate to="/dashboard" replace />;

  // INTRO
  if (view === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b3d20] overflow-hidden relative font-determination">
        <ChalkParticles />
        <div className="z-10 text-center px-6">
          <div className="inline-block bg-[#0f5529] p-8 rounded-3xl border-8 border-[#1a4d2e] shadow-2xl">
            <div className="bg-[#e8e4d0] rounded-2xl p-12 border-4 border-[#8b7b5e] shadow-inner">
              <h1 className="text-6xl md:text-8xl font-bold text-[#1a4d2e] tracking-tighter leading-tight">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center">
                    <span>{typedTitle.substring(0, 10)}</span>
                    {!typingDone && typedTitle.length < 11 && (
                      <span className="inline-block w-4 h-20 bg-[#1a4d2e] animate-pulse opacity-80 ml-1" />
                    )}
                  </div>
                  {typedTitle.length > 10 && (
                    <div className="flex items-center">
                      <span className="text-[#d4a373] text-6xl md:text-8xl">
                        {typedTitle.substring(10)}
                      </span>
                      {!typingDone && (
                        <span className="inline-block w-4 h-20 bg-[#d4a373] animate-pulse opacity-80 ml-1" />
                      )}
                    </div>
                  )}
                </div>
              </h1>
              <div className="h-1 w-32 bg-[#d4a373] mx-auto rounded-full"></div>

              <div className="mt-10 space-y-3">
                <p className="text-2xl md:text-3xl text-[#1a4d2e] font-bold tracking-wide">
                  WELCOME TO ECO-SCHOOL TYCOON
                </p>
                <p className="text-lg md:text-xl text-[#1a4d2e]/70 font-medium leading-relaxed pt-2">
                  Make choices • Teach values • Shape the future
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-20">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setView("auth");
                  }}
                  className="px-12 py-5 bg-[#d4a373] hover:bg-[#e6c08e] text-[#0f5529] font-bold text-2xl rounded-xl border-4 border-[#8b7b5e] shadow-lg hover:shadow-xl transition hover:-translate-y-1"
                >
                  CONTINUE MISSION
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setView("auth");
                  }}
                  className="px-12 py-5 bg-[#1a4d2e] hover:bg-[#2a6d42] text-[#e8e4d0] font-bold text-2xl rounded-xl border-4 border-[#4a8b6a] shadow-lg hover:shadow-xl transition hover:-translate-y-1"
                >
                  NEW MISSION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AUTH FORM
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b3d20] overflow-hidden relative font-determination">
      <ChalkParticles count={10} />
    <button
      onClick={() => setView("intro")}
      className="absolute top-6 left-6 z-20 flex items-center gap-2 px-5 py-3 
                bg-[#0f5529]/80 hover:bg-[#1a4d2e] 
                border-4 border-[#d4a373] hover:border-[#e6c08e]
                rounded-lg shadow-lg
                transition-all duration-200 hover:scale-105"
    >
      <span className="text-[#d4a373] hover:text-[#e6c08e] font-bold text-lg tracking-wider">
        ← BACK
      </span>
    </button>

      <div className="z-10 w-full max-w-md px-6">
        <div className="bg-[#e8e4d0] rounded-3xl border-8 border-[#8b7b5e] shadow-2xl p-10">
          <h2 className="text-4xl font-bold text-[#1a4d2e] text-center mb-8">
            {isLogin ? "LOGIN" : "REGISTER"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="FIRST NAME"
                  value={form.firstname}
                  onChange={(e) =>
                    setForm({ ...form, firstname: e.target.value })
                  }
                  className="w-full px-6 py-5 bg-white border-4 border-[#8b7b5e] text-[#1a4d2e] placeholder-[#8b7b5e]/70 text-lg focus:border-[#d4a373] transition"
                  required
                />
                <input
                  type="text"
                  placeholder="LAST NAME"
                  value={form.lastname}
                  onChange={(e) =>
                    setForm({ ...form, lastname: e.target.value })
                  }
                  className="w-full px-6 py-5 bg-white border-4 border-[#8b7b5e] text-[#1a4d2e] placeholder-[#8b7b5e]/70 text-lg focus:border-[#d4a373] transition"
                  required
                />
              </div>
            )}

            <input
              type="email"
              placeholder="EMAIL"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-6 py-5 bg-white border-4 border-[#8b7b5e] text-[#1a4d2e] placeholder-[#8b7b5e]/70 text-lg focus:border-[#d4a373] transition"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="PASSWORD"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-6 py-5 pr-16 bg-white border-4 border-[#8b7b5e] text-[#1a4d2e] placeholder-[#8b7b5e]/70 text-lg focus:border-[#d4a373] transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b7b5e] hover:text-[#1a4d2e]"
              >
                SHOW
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 bg-[#d4a373] hover:bg-[#e6c08e] text-[#0f5529] font-bold text-2xl rounded-xl border-4 border-[#8b7b5e] shadow-lg hover:shadow-xl transition"
            >
              {isLoading
                ? "LOADING..."
                : isLogin
                ? "ACCESS NETWORK"
                : "ACCEPT MISSION"}
            </button>
          </form>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-6 block w-full text-center text-[#1a4d2e] hover:text-[#d4a373] font-bold underline"
          >
            {isLogin ? "New game?" : "Already have access?"}
          </button>
        </div>
      </div>
    </div>
  );
}
