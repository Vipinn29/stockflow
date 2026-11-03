
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fc]">
      <div className="absolute left-[-10rem] top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-indigo-100/70 blur-3xl" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3 text-xl font-bold text-[#20283a]">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#5b5bd6] text-white shadow-lg shadow-indigo-200">S</div>
          StockFlow
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-xl px-5 py-3 text-sm font-semibold text-[#3d4659] hover:bg-white">Log in</Link>
          <Link href="/signup" className="rounded-xl bg-[#20283a] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 hover:bg-[#303a50]">Start free</Link>
        </div>
      </nav>
      <section className="relative mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-16 px-6 pb-16 pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
        <div>
          <div className="mb-6 inline-flex items-center rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-[#5b5bd6] shadow-sm">Inventory, simplified</div>
          <h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-[#172033] sm:text-6xl">Know what&apos;s in stock. <span className="text-[#5b5bd6]">Always.</span></h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#667085]">A clear, reliable workspace for tracking products, preventing stockouts, and keeping your business moving.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-xl bg-[#5b5bd6] px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-[#4b4bc0]">Create your workspace</Link>
            <Link href="/login" className="rounded-xl border border-[#dfe3ec] bg-white px-6 py-3.5 font-semibold text-[#344054] shadow-sm hover:border-[#cbd1df]">View dashboard</Link>
          </div>
          <div className="mt-10 flex gap-7 text-sm text-[#667085]">
            <span className="flex items-center gap-2"><b className="text-[#20a36a]">✓</b> No credit card</span>
            <span className="flex items-center gap-2"><b className="text-[#20a36a]">✓</b> Setup in minutes</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-indigo-200/40 blur-2xl" />
          <div className="relative rounded-[28px] border border-white/80 bg-white/80 p-4 shadow-[0_30px_80px_-30px_rgba(47,55,89,.35)] backdrop-blur">
            <div className="rounded-[20px] border border-[#e8ebf3] bg-[#fafbfe] p-5">
              <div className="flex items-center justify-between border-b border-[#e8ebf3] pb-4">
                <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98a2b3]">Overview</p><p className="mt-1 font-bold text-[#20283a]">Inventory health</p></div>
                <span className="rounded-full bg-[#eaf8f1] px-3 py-1 text-xs font-semibold text-[#21885a]">● Live</span>
              </div>
              <div className="grid grid-cols-3 gap-3 py-5">
                {[["1,284","Products"],["8,492","In stock"],["12","Low stock"]].map(([value,label]) => (
                  <div key={label} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#edf0f5]"><p className="text-xl font-bold text-[#20283a]">{value}</p><p className="mt-1 text-xs text-[#98a2b3]">{label}</p></div>
                ))}
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#edf0f5]">
                <div className="mb-5 flex items-center justify-between"><p className="font-semibold text-[#344054]">Stock movement</p><p className="text-xs text-[#98a2b3]">Last 7 days</p></div>
                <div className="flex h-28 items-end gap-3">{[42,68,55,82,61,93,74].map((height,index) => <div key={index} className="flex-1 rounded-t-md bg-gradient-to-t from-[#5b5bd6] to-[#9494ed]" style={{height: `${height}%`}} />)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
