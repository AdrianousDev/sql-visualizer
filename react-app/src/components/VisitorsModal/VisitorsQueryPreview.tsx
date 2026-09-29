type VisitorsQueryPreviewProps = {
    sql: string;
};

export function VisitorsQueryPreview({ sql }: VisitorsQueryPreviewProps) {
    return (
        <div className="flex min-h-120 flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-lg lg:h-full lg:min-h-0">
            <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-6 py-5">
                <span className="font-mono text-lg text-slate-400">
                    consulta.sql
                </span>
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-cyan-300">
                    SELECT
                </span>
            </div>
            <pre className="flex flex-1 items-center overflow-x-auto p-8 font-mono text-4xl leading-12 text-cyan-200 sm:p-10 sm:text-4xl sm:leading-16">
                <code>{sql}</code>
            </pre>
        </div>
    );
}
