import { aboutContent, images } from "../data/content";

export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-[#faf7f2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: Image Stack ───────────────────── */}
          <div className="relative">
            {/* Decorative background blob */}
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(15,23,42,0.14)] group">
              <img
                src={images.collegeClassroom}
                alt="Classroom"
                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

              {/* Est. badge on image */}
              <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-white text-xs font-mono tracking-widest uppercase">Est. 2005</span>
              </div>
            </div>

            {/* Floating thumbnail */}
            <div className="absolute -bottom-7 -right-5 hidden md:block w-44 h-44 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.25)] border-4 border-white group">
              <img
                src={images.tech1}
                alt="Technology"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Floating stat chip */}
            <div className="absolute -bottom-7 left-6 md:left-auto md:-left-7 bg-slate-900 rounded-2xl px-6 py-4 shadow-[0_8px_32px_rgba(15,23,42,0.3)] border border-amber-500/20 hidden md:block">
              <p className="font-serif text-3xl font-bold text-amber-400 leading-none">20+</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-1.5">
                Years of<br />Excellence
              </p>
            </div>
          </div>

          {/* ── Right: Content ──────────────────────── */}
          <div className="md:pt-0 pt-10">

            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="block w-7 h-px bg-amber-500" />
              <p className="font-mono text-xs tracking-widest uppercase text-amber-600 font-semibold">
                {aboutContent.subtitle}
              </p>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-slate-900 font-bold mb-6 leading-[1.15]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              {aboutContent.title}
            </h2>

            {/* Divider */}
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 mb-7" />

            {/* Description */}
            <p className="text-slate-600 leading-[1.85] text-[1.0625rem] mb-10">
              {aboutContent.description}
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {aboutContent.highlights.map((item, i) => (
                <div
                  key={item.label}
                  className={`rounded-2xl p-5 text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-default
                    ${i % 2 === 0
                      ? "bg-white border-slate-100 hover:border-amber-300"
                      : "bg-slate-900 border-slate-800 hover:border-amber-500/40"
                    }`}
                >
                  <p className={`font-serif text-3xl font-bold leading-none mb-2 transition-colors duration-300
                    ${i % 2 === 0
                      ? "text-amber-600 group-hover:text-amber-500"
                      : "text-amber-400"
                    }`}>
                    {item.value}
                  </p>
                  <p className={`text-xs uppercase tracking-widest font-mono leading-snug
                    ${i % 2 === 0 ? "text-slate-500" : "text-slate-400"}`}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-semibold text-sm shadow-[0_8px_24px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(245,158,11,0.5)] transition-all duration-300">
                Explore Programs
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300">
                📍 Visit Campus
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}