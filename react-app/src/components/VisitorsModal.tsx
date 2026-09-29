import { useEffect, useState } from "react";
import { getVisitors } from "../services/visitorService";
import type { Visitor, VisitorsResponse } from "../types/visitor";
import { generateSelectSql } from "../utils/sqlPreview";
import { VisitorsModalContent } from "./VisitorsModal/VisitorsModalContent";
import { VisitorsModalHeader } from "./VisitorsModal/VisitorsModalHeader";
import { VisitorsPagination } from "./VisitorsModal/VisitorsPagination";
import { VisitorsQueryPreview } from "./VisitorsModal/VisitorsQueryPreview";
import { VisitorsTable } from "./VisitorsTable";

type VisitorsModalProps = {
    refreshKey: number;
    onClose: () => void;
};

const PAGE_SIZE = 9;

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
            <div className="flex h-[94dvh] w-full max-w-[95vw] flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-100 shadow-2xl shadow-black/50">
                <VisitorsModalHeader
                    total={pagination.total}
                    isLoading={isLoading}
                    error={error}
                    onClose={onClose}
                />

                <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:overflow-hidden">
                    <div className="flex min-h-125 flex-col gap-6 bg-slate-100 p-4 sm:p-6 lg:min-h-0">
                        <VisitorsModalContent
                            isLoading={isLoading}
                            error={error}
                            isEmpty={visitors.length === 0}
                            onRetry={() =>
                                setReloadKey((current) => current + 1)
                            }
                        >
                            <VisitorsTable visitors={visitors} />
                        </VisitorsModalContent>

                        {!error && (
                            <VisitorsPagination
                                page={page}
                                totalPages={totalPages}
                                isLoading={isLoading}
                                onPreviousPage={() =>
                                    setPage((current) => current - 1)
                                }
                                onNextPage={() =>
                                    setPage((current) => current + 1)
                                }
                                onPageChange={setPage}
                            />
                        )}
                    </div>

                    <div className="flex min-h-72 items-center border-t-4 border-blue-600 bg-[#070d18] p-4 sm:p-6 lg:min-h-0 lg:border-t-0 lg:border-l-4">
                        <div className="h-full w-full">
                            <VisitorsQueryPreview
                                sql={generateSelectSql(page, PAGE_SIZE)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
