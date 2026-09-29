type SqlPreviewProps = {
    sql: string;
};

export function SqlPreview({ sql }: SqlPreviewProps) {
    const lines = sql.split("\n");

    return (
        <div className="flex h-full flex-col bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-8">
                <p className="text-sm font-semibold text-slate-200">
                    Visualização da query
                </p>
                <span className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    Em tempo real
                </span>
            </div>

            <div className="flex flex-1 items-center px-4 py-6 sm:px-8 sm:py-8 lg:px-10 xl:px-12">
                <div className="flex min-h-80 w-full flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 lg:min-h-96">
                    <div className="flex items-center justify-between border-b border-slate-700 px-5 py-3.5">
                        <span className="font-mono text-xs text-slate-400">
                            Consulta SQL
                        </span>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                            PostgreSQL
                        </span>
                    </div>

                    <pre className="flex-1 overflow-x-auto py-8 font-mono text-xl leading-10 sm:py-10 sm:text-2xl sm:leading-11 xl:text-2xl xl:leading-12">
                        <code>
                            {lines.map((line, index) => (
                                <span
                                    key={`${index}-${line}`}
                                    className="grid min-w-max grid-cols-[3.5rem_1fr] pr-8"
                                >
                                    <span className="select-none border-r border-slate-700 pr-4 text-right text-slate-500">
                                        {index + 1}
                                    </span>
                                    <span className="pl-6 text-cyan-200">
                                        {line || " "}
                                    </span>
                                </span>
                            ))}
                        </code>
                    </pre>
                </div>
            </div>

            <div className="border-t border-slate-800 px-5 py-3.5 text-xs leading-5 text-slate-500 sm:px-8 sm:text-sm">
                Preview didático: a execução continua protegida pela API e pelo
                Prisma.
            </div>
        </div>
    );
}
