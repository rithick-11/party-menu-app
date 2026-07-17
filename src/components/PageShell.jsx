const PageShell = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06070c] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-14 top-1/3 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_15%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.08),_transparent_25%),linear-gradient(180deg,_rgba(15,23,42,0.28),_rgba(7,11,18,0.55)_60%,_rgba(7,11,18,0.9))]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        {children}
      </div>
    </div>
  )
}

export default PageShell
