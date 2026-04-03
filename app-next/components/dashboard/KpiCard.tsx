type KpiCardProps = {
  title: string;
  value: string;
  hint: string;
};

export function KpiCard({ title, value, hint }: KpiCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-[var(--primary)]">{value}</p>
      <p className="mt-1 text-xs text-[var(--neutral)]">{hint}</p>
    </article>
  );
}
