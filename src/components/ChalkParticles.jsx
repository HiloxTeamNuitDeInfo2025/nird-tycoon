export default function ChalkParticles({ count = 14 }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b3d20] via-[#1a4d2e] to-[#0f5529] opacity-90" />
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${18 + Math.random() * 12}s`,
          }}
        />
      ))}
    </>
  );
}