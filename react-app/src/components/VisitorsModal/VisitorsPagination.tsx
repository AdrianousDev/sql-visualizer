type VisitorsPaginationProps = {
    page: number;
    totalPages: number;
    isLoading: boolean;
    onPreviousPage: () => void;
    onNextPage: () => void;
    onPageChange: (page: number) => void;
};

export function VisitorsPagination({
    page,
    totalPages,
    isLoading,
    onPreviousPage,
    onNextPage,
    onPageChange,
}: VisitorsPaginationProps) {
    const firstVisiblePage = Math.min(
        Math.max(1, page - 2),
        Math.max(1, totalPages - 4),
    );
    const visiblePages = Array.from(
        { length: Math.min(5, totalPages) },
        (_, index) => firstVisiblePage + index,
    );

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="font-mono text-xs text-slate-500 sm:text-sm">
                Página <strong className="text-slate-800">{page}</strong> de{" "}
                <strong className="text-slate-800">{totalPages}</strong>
            </p>

            <div className="flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    disabled={page === 1 || isLoading}
                    onClick={onPreviousPage}
                    className="rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Anterior
                </button>

                {visiblePages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        type="button"
                        disabled={isLoading}
                        onClick={() => onPageChange(pageNumber)}
                        aria-label={`Ir para página ${pageNumber}`}
                        aria-current={page === pageNumber ? "page" : undefined}
                        className={`size-10 rounded-lg text-sm font-bold transition disabled:cursor-wait disabled:opacity-60 ${
                            page === pageNumber
                                ? "bg-blue-600 text-white"
                                : "border border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-white"
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    type="button"
                    disabled={page === totalPages || isLoading}
                    onClick={onNextPage}
                    className="rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}
