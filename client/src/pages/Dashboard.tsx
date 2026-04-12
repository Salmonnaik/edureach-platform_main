// EduReach College — Admin Dashboard
// Tailwind CSS · TypeScript · No extra dependencies

const stats = [
  { label: "Total Applications", value: "2,847", change: "+12.4%", up: true, icon: "📋" },
  { label: "Enrolled Students", value: "1,392", change: "+8.1%",  up: true, icon: "🎓" },
  { label: "Placement Rate",    value: "92%",   change: "+3.2%",  up: true, icon: "💼" },
  { label: "Revenue (₹ Cr)",   value: "18.4",  change: "-1.8%",  up: false, icon: "📈" },
];

const recentApplications = [
  { name: "Aditya Nair",     program: "B.Tech CSE",      status: "Accepted",  date: "22 Mar 2026", score: 94 },
  { name: "Deepa Krishnan",  program: "MBA Tech Mgmt",   status: "Pending",   date: "21 Mar 2026", score: 81 },
  { name: "Rahul Mehta",     program: "B.Tech ECE",      status: "Accepted",  date: "20 Mar 2026", score: 88 },
  { name: "Sneha Patil",     program: "Data Science",    status: "Review",    date: "19 Mar 2026", score: 76 },
  { name: "Kiran Babu",      program: "B.Tech Civil",    status: "Rejected",  date: "18 Mar 2026", score: 61 },
  { name: "Priya Sharma",    program: "B.Tech Mech",     status: "Accepted",  date: "17 Mar 2026", score: 91 },
];

const placements = [
  { company: "Google",     students: 24, pkg: "₹28 LPA", color: "bg-blue-500" },
  { company: "Microsoft",  students: 31, pkg: "₹22 LPA", color: "bg-emerald-500" },
  { company: "Amazon",     students: 18, pkg: "₹19 LPA", color: "bg-amber-500" },
  { company: "Infosys",    students: 54, pkg: "₹8 LPA",  color: "bg-purple-500" },
  { company: "TCS",        students: 67, pkg: "₹7 LPA",  color: "bg-rose-500" },
];

const upcomingEvents = [
  { day: "28", month: "Mar", title: "Annual Placement Drive",     type: "Career",   time: "9:00 AM" },
  { day: "05", month: "Apr", title: "AI Bootcamp — Google",       type: "Workshop", time: "10:00 AM" },
  { day: "12", month: "Apr", title: "Startup Funding Seminar",    type: "Seminar",  time: "2:00 PM" },
  { day: "20", month: "Apr", title: "TechFest 2026",              type: "Cultural", time: "All Day" },
];

const navItems = [
  { icon: "⊞", label: "Dashboard",    active: true },
  { icon: "👤", label: "Students",     active: false },
  { icon: "📋", label: "Applications", active: false },
  { icon: "💼", label: "Placements",   active: false },
  { icon: "📅", label: "Events",       active: false },
  { icon: "🏛️", label: "Courses",      active: false },
  { icon: "💬", label: "Messages",     active: false },
  { icon: "⚙️", label: "Settings",     active: false },
];

const statusStyle: Record<string, string> = {
  Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Pending:  "bg-amber-50  text-amber-700  border border-amber-200",
  Review:   "bg-blue-50   text-blue-700   border border-blue-200",
  Rejected: "bg-rose-50   text-rose-700   border border-rose-200",
};

const eventTypeStyle: Record<string, string> = {
  Career:   "bg-amber-500/15 text-amber-600",
  Workshop: "bg-blue-500/15  text-blue-600",
  Seminar:  "bg-purple-500/15 text-purple-600",
  Cultural: "bg-emerald-500/15 text-emerald-600",
};

const Dashboard = () => {
  const maxStudents = Math.max(...placements.map((p) => p.students));

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">

      {/* ── Sidebar ──────────────────────────────── */}
      <aside className="w-64 bg-slate-900 flex flex-col shrink-0 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/8">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-slate-900 font-bold text-lg font-serif shrink-0">
            E
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-none">
              Edu<span className="text-amber-400">Reach</span>
            </div>
            <div className="text-slate-500 text-[10px] font-mono mt-1 tracking-wider uppercase">
              Admin Portal
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left group
                ${item.active
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/6"
                }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
              {item.active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </button>
          ))}
        </nav>

        {/* User card */}
        <div className="mx-3 mb-4 p-4 rounded-xl bg-white/5 border border-white/8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-slate-900 font-bold text-sm shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-medium truncate">Admin Dean</div>
            <div className="text-slate-500 text-[10px] font-mono truncate">admin@edureach.ac.in</div>
          </div>
          <button className="text-slate-500 hover:text-white ml-auto text-lg transition-colors">⋯</button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-serif text-slate-900 text-xl font-bold leading-none">
              Dashboard
            </h1>
            <p className="text-slate-400 text-xs font-mono mt-1">
              Monday, 23 March 2026 · Academic Year 2025–26
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search students, applications…"
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 w-64 transition-all duration-200"
              />
            </div>
            {/* Notif bell */}
            <button className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-amber-50 hover:border-amber-300 border border-transparent flex items-center justify-center text-slate-500 hover:text-amber-600 transition-all duration-200">
              🔔
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 border-2 border-white" />
            </button>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-slate-900 font-bold text-sm cursor-pointer">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-8 py-7 flex flex-col gap-7">

          {/* ── Stat Cards ─────────────────────── */}
          <div className="grid grid-cols-4 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-amber-200 hover:shadow-[0_8px_32px_rgba(245,158,11,0.08)] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center text-xl transition-colors duration-300">
                    {s.icon}
                  </div>
                  <span className={`text-xs font-semibold font-mono px-2 py-1 rounded-full ${
                    s.up
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600"
                  }`}>
                    {s.change}
                  </span>
                </div>
                <div className="font-serif text-2xl font-bold text-slate-900 leading-none mb-1.5">
                  {s.value}
                </div>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Middle Row ─────────────────────── */}
          <div className="grid grid-cols-3 gap-5">

            {/* Applications table — spans 2 cols */}
            <div className="col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div>
                  <h2 className="font-serif text-slate-900 font-semibold text-base">
                    Recent Applications
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Latest 6 submissions</p>
                </div>
                <button className="text-xs font-semibold text-amber-600 hover:text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-all duration-200">
                  View all →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Applicant</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Program</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Score</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app, i) => (
                      <tr
                        key={i}
                        className="border-b border-slate-50 hover:bg-amber-50/40 transition-colors duration-150 cursor-pointer group"
                      >
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {app.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <span className="font-medium text-slate-800 group-hover:text-amber-700 transition-colors">
                              {app.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 text-xs">{app.program}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                                style={{ width: `${app.score}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-slate-600 font-semibold">{app.score}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full font-mono ${statusStyle[app.status]}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-slate-400 font-mono">{app.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-serif text-slate-900 font-semibold text-base">Upcoming Events</h2>
                <button className="text-xs font-semibold text-amber-600 hover:text-amber-700 px-2 py-1 rounded-lg hover:bg-amber-50 transition-all duration-200">All →</button>
              </div>
              <div className="flex-1 flex flex-col divide-y divide-slate-50">
                {upcomingEvents.map((e, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-amber-50/40 transition-colors duration-150 cursor-pointer group">
                    {/* Date block */}
                    <div className="text-center w-10 shrink-0">
                      <div className="font-serif text-xl font-bold text-slate-900 leading-none">{e.day}</div>
                      <div className="text-[9px] text-amber-600 uppercase tracking-widest font-bold mt-0.5">{e.month}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-800 leading-snug truncate group-hover:text-amber-700 transition-colors">
                        {e.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${eventTypeStyle[e.type]}`}>
                          {e.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{e.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Row ─────────────────────── */}
          <div className="grid grid-cols-3 gap-5">

            {/* Placement bar chart */}
            <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-slate-900 font-semibold text-base">Top Recruiting Companies</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Batch 2025 · 312 students placed</p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-semibold font-mono">
                  92% placed
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {placements.map((p) => (
                  <div key={p.company} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-semibold text-slate-700 shrink-0">{p.company}</div>
                    <div className="flex-1 h-7 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                      <div
                        className={`h-full ${p.color} opacity-80 rounded-lg flex items-center px-3 transition-all duration-700`}
                        style={{ width: `${(p.students / maxStudents) * 100}%` }}
                      >
                        <span className="text-white text-xs font-bold">{p.students}</span>
                      </div>
                    </div>
                    <div className="w-20 text-right text-xs font-semibold text-slate-500 font-mono shrink-0">{p.pkg}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-slate-900 rounded-2xl border border-white/8 p-6 flex flex-col">
              <h2 className="font-serif text-white font-semibold text-base mb-1">Quick Actions</h2>
              <p className="text-slate-500 text-xs font-mono mb-6">Common admin tasks</p>

              <div className="flex flex-col gap-3 flex-1">
                {[
                  { icon: "➕", label: "Add New Student",      color: "hover:bg-amber-500/12 hover:border-amber-500/30 hover:text-amber-400" },
                  { icon: "📤", label: "Export Applications",  color: "hover:bg-blue-500/12  hover:border-blue-500/30  hover:text-blue-400" },
                  { icon: "📅", label: "Schedule Event",       color: "hover:bg-purple-500/12 hover:border-purple-500/30 hover:text-purple-400" },
                  { icon: "📊", label: "Generate Report",      color: "hover:bg-emerald-500/12 hover:border-emerald-500/30 hover:text-emerald-400" },
                  { icon: "📧", label: "Send Bulk Email",      color: "hover:bg-rose-500/12 hover:border-rose-500/30 hover:text-rose-400" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 text-slate-400 text-sm font-medium text-left transition-all duration-200 ${action.color}`}
                  >
                    <span className="text-base">{action.icon}</span>
                    {action.label}
                    <span className="ml-auto text-xs opacity-50">→</span>
                  </button>
                ))}
              </div>

              {/* Mini stat */}
              <div className="mt-6 pt-5 border-t border-white/8 flex justify-between text-center">
                <div>
                  <div className="font-serif text-xl font-bold text-amber-400">47</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">Pending</div>
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-emerald-400">312</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">Placed</div>
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-white">1,392</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">Enrolled</div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;