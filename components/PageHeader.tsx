export function PageHeader({
  icon,
  title,
  subtitle,
  source,
}: {
  icon: string;
  title: string;
  subtitle: string;
  source?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-white">
        <span>{icon}</span>
        {title}
      </h1>
      <p className="mt-1 text-slate-400">{subtitle}</p>
      {source && <p className="mt-1 text-xs text-slate-600">Source: {source}</p>}
    </div>
  );
}
