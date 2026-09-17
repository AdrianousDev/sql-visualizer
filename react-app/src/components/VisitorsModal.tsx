import { useEffect, useState } from "react";
import { getVisitors } from "../services/visitorService";
import type { Visitor, VisitorsResponse } from "../types/visitor";
import { generateSelectSql } from "../utils/sqlPreview";
import { VisitorsTable } from "./VisitorsTable";

type VisitorsModalProps = {
    refreshKey: number;
    onClose: () => void;
};

const PAGE_SIZE = 10;

const initialPagination: VisitorsResponse["pagination"] = {
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 0,
};

export function VisitorsModal({ refreshKey, onClose }: VisitorsModalProps) {
    const [page, setPage] = useState(1);
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [pagination, setPagination] = useState(initialPagination);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function loadVisitors() {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getVisitors(
                    page,
                    PAGE_SIZE,
                    controller.signal,
                );
                const lastPage = Math.max(1, response.pagination.totalPages);

                if (page > lastPage) {
                    setPage(lastPage);
                    return;
                }

                setVisitors(response.data);
                setPagination(response.pagination);
            } catch (requestError) {
                if (
                    requestError instanceof DOMException &&
                    requestError.name === "AbortError"
                ) {
                    return;
                }

                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "Não foi possível carregar os visitantes.",
                );
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        }

        void loadVisitors();

        return () => controller.abort();
    }, [page, refreshKey, reloadKey]);

    const totalPages = Math.max(1, pagination.totalPages);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-2 backdrop-blur-sm sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="visitors-modal-title"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div className="max-h-[94dvh] w-full max-w-6xl overflow-y-auto rounded-xl border border-slate-700 bg-slate-100 shadow-2xl shadow-black/50">
                <header className="flex items-start justify-between border-b border-slate-700 bg-slate-900 px-5 py-4 text-white sm:px-7">
                    <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">
                            PostgreSQL / public / visitantes
                        </p>
                        <h2
                            id="visitors-modal-title"
                            className="mt-1 text-xl font-bold text-white sm:text-2xl"
                        >
                            Dados da tabela{" "}
                            <span className="font-mono text-cyan-300">
                                visitantes
                            </span>
                        </h2>
                        {!isLoading && !error && (
                            <p className="mt-1 text-sm text-slate-400">
                                {pagination.total} registro
                                {pagination.total === 1 ? "" : "s"} encontrado
                                {pagination.total === 1 ? "" : "s"}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar modal"
                        className="grid size-10 place-items-center rounded-lg border border-slate-600 bg-slate-800 text-2xl leading-none text-slate-300 transition hover:border-slate-500 hover:bg-slate-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                    >
                        ×
                    </button>
                </header>

                <div className="space-y-5 p-4 sm:p-6">
                    {isLoading ? (
                        <div
                            className="grid min-h-64 place-items-center border border-slate-300 bg-white font-mono text-sm text-slate-500 shadow-sm"
                            role="status"
                        >
                            Carregando visitantes...
                        </div>
                    ) : error ? (
                        <div className="grid min-h-64 place-items-center border border-red-200 bg-red-50 p-6 text-center shadow-sm">
                            <div>
                                <p className="font-semibold text-red-800">
                                    {error}
                                </p>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setReloadKey((current) => current + 1)
                                    }
                                    className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800"
                                >
                                    Tentar novamente
                                </button>
                            </div>
                        </div>
                    ) : visitors.length === 0 ? (
                        <div className="grid min-h-64 place-items-center border border-dashed border-slate-300 bg-white font-mono text-sm text-slate-500 shadow-sm">
                            Nenhum visitante cadastrado.
                        </div>
                    ) : (
                        <VisitorsTable visitors={visitors} />
                    )}

                    {!error && (
                        <div className="flex flex-wrap items-center justify-between gap-4 border border-slate-200 bg-white px-4 py-3 shadow-sm">
                            <p className="font-mono text-xs text-slate-500 sm:text-sm">
                                Página{" "}
                                <strong className="text-slate-800">
                                    {page}
                                </strong>{" "}
                                de{" "}
                                <strong className="text-slate-800">
                                    {totalPages}
                                </strong>
                            </p>

                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    disabled={page === 1 || isLoading}
                                    onClick={() =>
                                        setPage((current) => current - 1)
                                    }
                                    className="rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Anterior
                                </button>

                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1,
                                ).map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => setPage(pageNumber)}
                                        aria-label={`Ir para página ${pageNumber}`}
                                        aria-current={
                                            page === pageNumber
                                                ? "page"
                                                : undefined
                                        }
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
                                    onClick={() =>
                                        setPage((current) => current + 1)
                                    }
                                    className="rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Próxima
                                </button>
                            </div>
                        </div>
                    )}

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
                            <code>{generateSelectSql(page, PAGE_SIZE)}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
