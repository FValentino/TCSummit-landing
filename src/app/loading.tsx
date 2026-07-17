export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002c6b]">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-[#03f5ff]/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-[#03f5ff] rounded-full animate-spin" />
        </div>

        <p className="text-[#03f5ff] font-[family-name:var(--font-orbitron)] text-sm tracking-wider">
          Cargando...
        </p>
      </div>
    </div>
  );
}
