type SqlPreviewProps = {
  sql: string
}

export function SqlPreview({ sql }: SqlPreviewProps) {
  const lines = sql.split('\n')

  return (
    <div className="flex h-full flex-col bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_38%)]">
      <div className="flex items-center justify-between border-b border-slate-800/90 bg-slate-950/70 px-5 py-4 backdrop-blur sm:px-8">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[0.22em] text-blue-400">
            02 — SQL GERADO
          </span>
          <p className="mt-0.5 text-sm font-semibold text-slate-200">
            Visualização da query
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          Em tempo real
        </span>
      </div>

      <div className="flex flex-1 items-center px-4 py-8 sm:px-8 lg:px-10 xl:px-14">
        <div className="w-full overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0b1220] shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-slate-700/80 bg-slate-900 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="border-l border-slate-700 pl-3 font-mono text-xs text-slate-400">
                visitante.sql
              </span>
            </div>
            <span className="rounded-md bg-blue-500/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-300">
              PostgreSQL
            </span>
          </div>

          <pre className="overflow-x-auto py-6 font-mono text-base leading-8 sm:py-8 sm:text-lg sm:leading-9 xl:text-xl">
            <code>
              {lines.map((line, index) => (
                <span
                  key={`${index}-${line}`}
                  className="grid min-w-max grid-cols-[3rem_1fr] pr-6"
                >
                  <span className="select-none border-r border-slate-800 pr-3 text-right text-slate-600">
                    {index + 1}
                  </span>
                  <span className="pl-5 text-cyan-200">{line || ' '}</span>
                </span>
              ))}
            </code>
          </pre>

          <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/60 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
            <span>UTF-8</span>
            <span>SQL</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/90 bg-slate-950/60 px-5 py-3.5 text-xs leading-5 text-slate-500 sm:px-8 sm:text-sm">
        Preview didático: a execução continua protegida pela API e pelo Prisma.
      </div>
    </div>
  )
}
