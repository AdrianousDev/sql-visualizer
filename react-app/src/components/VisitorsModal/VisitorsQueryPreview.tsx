type VisitorsQueryPreviewProps = {
    sql: string;
};

export function VisitorsQueryPreview({ sql }: VisitorsQueryPreviewProps) {
    const lines = sql.split("\n");

    return (
        <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-lg">
            <div className="flex items-center justify-between gap-3 border-b border-slate-700 bg-slate-900 px-4 py-5 sm:px-6">
                <span className="font-mono text-lg text-slate-400">
                    consulta.sql
                </span>
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-cyan-300">
                    SELECT
                </span>
            </div>
            <pre className="flex min-w-0 overflow-auto py-4 font-mono text-2xl leading-10 sm:py-6 xl:text-3xl xl:leading-12">
                <code className="min-w-full shrink-0">
                    {lines.map((line, index) => (
                        <span
                            key={`${index}-${line}`}
                            className="grid min-w-max grid-cols-[3rem_1fr] pr-4 sm:pr-6"
                        >
                            <span
                                aria-hidden="true"
                                className="select-none border-r border-slate-700 pr-3 text-right text-slate-500"
                            >
                                {index + 1}
                            </span>
                            <span className="pl-4 text-cyan-200">
                                {line || " "}
                            </span>
                        </span>
                    ))}
                </code>
            </pre>
        </div>
    );
}
