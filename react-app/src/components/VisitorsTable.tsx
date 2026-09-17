import type { Visitor } from "../types/visitor";

type VisitorsTableProps = {
    visitors: Visitor[];
};

export function VisitorsTable({ visitors }: VisitorsTableProps) {
    return (
        <div className="h-full min-h-0 overflow-hidden border border-slate-300 bg-white shadow-sm">
            <table className="w-full table-fixed border-collapse text-left">
                <thead className="bg-slate-800 text-slate-100">
                    <tr>
                        <th className="w-10 border-r border-slate-700 px-2 py-3 text-center font-mono text-xs font-medium text-slate-400 sm:w-12 sm:px-3">
                            #
                        </th>
                        <th className="w-16 border-r border-slate-700 px-2 py-3 sm:w-28 sm:px-5">
                            <span className="block font-mono text-sm font-bold">
                                id
                            </span>
                            <span className="mt-0.5 hidden font-mono text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
                                integer · PK
                            </span>
                        </th>
                        <th className="border-r border-slate-700 px-2 py-3 sm:px-5">
                            <span className="block font-mono text-sm font-bold">
                                nome
                            </span>
                            <span className="mt-0.5 hidden font-mono text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
                                text
                            </span>
                        </th>
                        <th className="w-20 px-2 py-3 sm:w-32 sm:px-5">
                            <span className="block font-mono text-sm font-bold">
                                idade
                            </span>
                            <span className="mt-0.5 hidden font-mono text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
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
                            <td className="border-r border-b border-slate-200 px-2 py-5.25 text-center font-mono text-xs text-slate-400 sm:px-3">
                                {index + 1}
                            </td>
                            <td className="border-r border-b border-slate-200 px-2 py-5.25 font-mono font-semibold text-blue-700 sm:px-5">
                                {visitor.id}
                            </td>
                            <td className="truncate border-r border-b border-slate-200 px-2 py-5.25 font-medium text-slate-950 sm:px-5">
                                <span title={visitor.nome}>{visitor.nome}</span>
                            </td>
                            <td className="border-b border-slate-200 px-2 py-5.25 font-mono sm:px-5">
                                {visitor.idade}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
