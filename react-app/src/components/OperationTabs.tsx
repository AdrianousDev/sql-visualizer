import type { Operation } from '../types/visitor'

type OperationTabsProps = {
  operation: Operation
  onChange: (operation: Operation) => void
}

const operations: Array<{
  value: Operation
  symbol: string
  description: string
  activeClassName: string
}> = [
  {
    value: 'INSERT',
    symbol: '+',
    description: 'Criar registro',
    activeClassName:
      'border-emerald-400 bg-emerald-400 text-emerald-950 shadow-emerald-500/25',
  },
  {
    value: 'UPDATE',
    symbol: '↻',
    description: 'Editar registro',
    activeClassName:
      'border-amber-400 bg-amber-400 text-amber-950 shadow-amber-500/25',
  },
  {
    value: 'DELETE',
    symbol: '−',
    description: 'Remover registro',
    activeClassName:
      'border-rose-500 bg-rose-500 text-white shadow-rose-500/25',
  },
]

export function OperationTabs({ operation, onChange }: OperationTabsProps) {
  return (
    <div
      className="grid grid-cols-3 gap-2.5"
      role="tablist"
      aria-label="Operação SQL"
    >
      {operations.map((item) => {
        const isActive = operation === item.value

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.value)}
            className={`min-w-0 rounded-xl border px-2 py-3 text-center transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-3 ${
              isActive
                ? `${item.activeClassName} -translate-y-0.5 shadow-lg`
                : 'border-slate-200 bg-slate-50 text-slate-600 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950 hover:shadow-md'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5 text-sm font-black tracking-[0.08em] sm:text-base">
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-md font-mono text-lg leading-none ${
                  isActive ? 'bg-black/10' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {item.symbol}
              </span>
              <span className="truncate">{item.value}</span>
            </span>
            <span
              className={`mt-1.5 hidden text-[10px] font-bold uppercase tracking-wider sm:block ${
                isActive ? 'opacity-70' : 'text-slate-400'
              }`}
            >
              {item.description}
            </span>
          </button>
        )
      })}
    </div>
  )
}
