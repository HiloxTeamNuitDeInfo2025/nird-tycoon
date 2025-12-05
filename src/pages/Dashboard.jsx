import { useState } from "react";
import ChalkParticles from "../components/ChalkParticles";
import Chatbot from "../components/Chatbot";
import GameArea from "../components/GameArea";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("game");



  return (
    <div className="min-h-screen bg-[#0b3d20] overflow-hidden relative font-determination">
      <ChalkParticles count={18} />

      {/*NAVBAR */}
      <div className="relative z-20 bg-[#0f5529] border-b-8 border-[#1a4d2e]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#d4a373] tracking-tighter">
            ECO-SCHOOL TYCOON
          </h1>

          {/* Right side */}
          <div className="flex items-center gap-8 text-[#e8e4d0]">

            {/* Tabs */}
            <div className="flex bg-[#1a4d2e] rounded-full p-1 border border-[#8b7b5e]/50">
              <button
                onClick={() => setActiveTab("game")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === "game" ? "bg-[#d4a373] text-[#0f5529]" : "hover:text-white"
                }`}
              >
                GAME
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === "chat" ? "bg-[#d4a373] text-[#0f5529]" : "hover:text-white"
                }`}
              >
                CHAT
              </button>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="text-sm font-bold hover:text-red-400 transition-colors"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mt-12 px-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === "game" && <GameArea />}
          {activeTab === "chat" && <Chatbot />}
        </div>
      </div>
    </div>
  );
}