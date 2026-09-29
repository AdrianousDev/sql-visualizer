type VisitorsModalHeaderProps = {
    total: number;
    isLoading: boolean;
    error: string | null;
    onClose: () => void;
};

export function VisitorsModalHeader({
    total,
    isLoading,
    error,
    onClose,
}: VisitorsModalHeaderProps) {
    return (
        <header className="flex items-start justify-between gap-4 border-b border-slate-700 bg-slate-900 px-5 py-4 text-white sm:px-7">
            <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">
                    PostgreSQL / public / visitantes
                </p>
                <h2
                    id="visitors-modal-title"
                    className="mt-1 text-xl font-bold text-white sm:text-2xl"
                >
                    Dados da tabela{" "}
                    <span className="font-mono text-slate-200">visitantes</span>
                </h2>
                {!isLoading && !error && (
                    <p className="mt-1 text-sm text-slate-400">
                        {total} registro{total === 1 ? "" : "s"} encontrado
                        {total === 1 ? "" : "s"}
                    </p>
                )}
            </div>
            <button
                type="button"
                onClick={onClose}
                aria-label="Fechar modal"
                className="rounded-lg border border-red-400 bg-red-800 px-3 py-2 font-bold text-white transition hover:border-red-300 hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
            >
                <span>Fechar</span>
            </button>
        </header>
    );
}
