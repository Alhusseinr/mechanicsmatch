// Dashboard Layout Component
interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function DashboardLayout({
  children,
  title,
  subtitle,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Main Content */}
      <main className="relative">{children}</main>
    </div>
  );
}
