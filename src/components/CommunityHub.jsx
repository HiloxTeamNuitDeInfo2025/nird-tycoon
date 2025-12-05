import { ExternalLink, RotateCcw, X } from "lucide-react";

export default function CommunityHub({
  finalScore,
  daysUsed,
  credibility,
  budgetLeft,
  chosenTools = [],
  onClose,
}) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-6 relative">
      {/* Optional close button (top-right) */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:scale-110 transition"
        >
          <X className="w-8 h-8 text-[#8b7b5e]" />
        </button>
      )}

      <div className="max-w-4xl mx-auto text-center">
        {/* Victory Title */}
        <h1 className="text-5xl md:text-7xl font-black text-[#1a4d2e] mb-10 leading-tight">
          {finalScore >= 80 ? "THE VILLAGE RESISTED!" : "WE WILL BE BACK STRONGER!"}
        </h1>

        {/* Score Card */}
        <div className="bg-[#e8e4d0 rounded-3xl border-8 border-[#8b7b5e] p-10 shadow-2xl mb-12">
          <div className="text-6xl md:text-7xl font-black text-[#1a4d2e] mb-4">
            {finalScore}<span className="text-4xl text-[#d4a373]">/90</span> NIRD
          </div>
          <div className="text-xl md:text-2xl text-[#1a4d2e]/80 space-y-2">
            <p>{daysUsed} days • {credibility}% credibility • €{budgetLeft.toLocaleString()} left</p>
          </div>
        </div>

        {/* Chosen Tools – Elegant Grid */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d2e] mb-8">
          Your school now runs free
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto mb-12">
          {chosenTools.length === 0 ? (
            <p className="col-span-full text-xl italic text-orange-600">No free tools chosen…</p>
          ) : (
            chosenTools.map((tool, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl px-6 py-8 shadow-lg border-4 border-[#d4a373] font-bold text-[#1a4d2e] text-lg hover:scale-105 hover:shadow-2xl transition transform"
              >
                {tool}
              </div>
            ))
          )}
        </div>

        {/* Action Buttons – Clean & Spacious */}
        <div className="flex flex-col items-center gap-8">
          {/* Join NIRD Community */}
          <a
            href="https://nird.forge.apps.education.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-12 py-6 bg-[#1a4d2e] text-[#e8e4d0] font-black text-2xl rounded-full hover:bg-[#2a6d42] transition shadow-xl"
          >
            Join the Real NIRD Community
            <ExternalLink className="w-7 h-7 group-hover:translate-x-1 transition" />
          </a>


          {/* Play Again */}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-3 gap-4 px-12 py-6 bg-orange-600 text-white font-black text-2xl rounded-full hover:bg-orange-700 transition shadow-xl hover:scale-105"
          >
            <RotateCcw className="w-7 h-7" />
            Play Again • Train More Résistants
          </button>
        </div>

        {/* Motivational footer */}
        <p className="mt-16 text-xl md:text-2xl text-[#1a4d2e]/70 font-medium italic">
          Tonight we played.<br />
          <span className="text-orange-700 font-black">Tomorrow we liberate schools for real.</span>
        </p>
      </div>
    </div>
  );
}