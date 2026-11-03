import Link from "next/link";
import LogoutButton from "./LogoutButton";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: "▦" },
  { href: "/products", label: "Products", icon: "◇" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export default function AppShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active: "dashboard" | "products" | "settings";
}) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="hidden border-r border-[#e7eaf2] bg-white lg:flex lg:flex-col">
        <Link href="/dashboard" className="flex h-20 items-center gap-3 border-b border-[#edf0f5] px-7">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#5b5bd6] text-sm font-bold text-white shadow-md shadow-indigo-100">S</span>
          <span className="text-lg font-bold text-[#20283a]">StockFlow</span>
        </Link>
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const current = item.href.slice(1) === active;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${current ? "bg-[#eeefff] text-[#5555c7]" : "text-[#667085] hover:bg-[#f7f8fb] hover:text-[#344054]"}`}>
                <span className="grid h-5 w-5 place-items-center text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[#edf0f5] p-4">
          <LogoutButton />
        </div>
      </aside>
      <div className="min-w-0">
        <header className="flex h-20 items-center justify-between border-b border-[#e7eaf2] bg-white px-5 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-3 lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#5b5bd6] text-xs font-bold text-white">S</span>
            <span className="font-bold text-[#20283a]">StockFlow</span>
          </Link>
          <nav className="flex items-center gap-1 lg:ml-auto">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-xs font-semibold text-[#667085] hover:bg-[#f5f7fb] lg:hidden">{item.label}</Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <div className="text-right"><p className="text-sm font-semibold text-[#344054]">Workspace</p><p className="text-xs text-[#98a2b3]">Inventory manager</p></div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#edf0ff] text-sm font-bold text-[#5b5bd6]">WS</div>
          </div>
        </header>
        <main className="p-5 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
