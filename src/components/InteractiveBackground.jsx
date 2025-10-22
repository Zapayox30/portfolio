const InteractiveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050510]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.12),_transparent_60%)]" />

      <div className="pointer-events-none absolute left-1/2 top-[-25%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-400/30 via-transparent to-transparent blur-3xl opacity-80 animate-[spin_60s_linear_infinite]" />
      <div className="pointer-events-none absolute right-[-15%] bottom-[-25%] h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-purple-500/25 via-transparent to-transparent blur-3xl opacity-70 animate-[spin_70s_linear_infinite_reverse]" />

      <div className="absolute inset-0 opacity-25 mix-blend-screen bg-[url('data:image/svg+xml,%3Csvg width=\'260\' height=\'260\' viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3ClinearGradient id=\'g\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:rgba(59,130,246,0.14);stop-opacity:1\'/%3E%3Cstop offset=\'100%25\' style=\'stop-color:rgba(168,85,247,0.06);stop-opacity:1\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill=\'url(%23g)\' d=\'M46.9,-63.2C59.8,-53.7,68.8,-39.9,75.3,-24.4C81.8,-9,85.7,8.1,81.4,24.8C77.2,41.5,64.7,57.7,48.8,66.7C32.9,75.6,13.7,77.4,-2.9,81.1C-19.6,84.7,-39.2,90.1,-52.7,82.2C-66.2,74.3,-73.6,53.1,-78.8,32.6C-83.9,12.1,-86.8,-7.7,-80.6,-23.4C-74.4,-39.1,-59.1,-50.7,-43.7,-59.4C-28.2,-68.2,-14.1,-74.1,0.5,-74.8C15.1,-75.4,30.3,-70.8,46.9,-63.2Z\' transform=\'translate(100 100) scale(1)\'/%3E%3C/svg%3E')]" />
    </div>
  )
}

export default InteractiveBackground
