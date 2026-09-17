type VisitorsQueryPreviewProps = {
    sql: string;
};

export function VisitorsQueryPreview({ sql }: VisitorsQueryPreviewProps) {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-2.5">
                <span className="font-mono text-xs text-slate-400">
                    consulta.sql
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    SELECT
                </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-cyan-200 sm:p-5">
                <code>{sql}</code>
            </pre>
        </div>
    );
}
