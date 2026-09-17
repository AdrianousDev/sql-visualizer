import type { Visitor } from '../types/visitor'

type VisitorsTableProps = {
  visitors: Visitor[]
}

export function VisitorsTable({ visitors }: VisitorsTableProps) {
  return (
    <div className="overflow-x-auto border border-slate-300 bg-white shadow-sm">
      <table className="w-full min-w-lg border-collapse text-left">
        <thead className="bg-slate-800 text-slate-100">
          <tr>
            <th className="w-12 border-r border-slate-700 px-3 py-3 text-center font-mono text-xs font-medium text-slate-400">
              #
            </th>
            <th className="w-28 border-r border-slate-700 px-5 py-3">
              <span className="block font-mono text-sm font-bold">id</span>
              <span className="mt-0.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-slate-400">
                integer · PK
              </span>
            </th>
            <th className="border-r border-slate-700 px-5 py-3">
              <span className="block font-mono text-sm font-bold">nome</span>
              <span className="mt-0.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-slate-400">
                text
              </span>
            </th>
            <th className="w-32 px-5 py-3">
              <span className="block font-mono text-sm font-bold">idade</span>
              <span className="mt-0.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-slate-400">
                integer
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {visitors.map((visitor, index) => (
            <tr
              key={visitor.id}
              className="odd:bg-white even:bg-slate-50 hover:bg-blue-50"
            >
              <td className="border-r border-slate-200 px-3 py-3.5 text-center font-mono text-xs text-slate-400">
                {index + 1}
              </td>
              <td className="border-r border-slate-200 px-5 py-3.5 font-mono font-semibold text-blue-700">
                {visitor.id}
              </td>
              <td className="border-r border-slate-200 px-5 py-3.5 font-medium text-slate-950">
                {visitor.nome}
              </td>
              <td className="px-5 py-3.5 font-mono">{visitor.idade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
