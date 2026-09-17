import type { ReactNode } from "react";

type VisitorsModalContentProps = {
    isLoading: boolean;
    error: string | null;
    isEmpty: boolean;
    onRetry: () => void;
    children: ReactNode;
};

export function VisitorsModalContent({
    isLoading,
    error,
    isEmpty,
    onRetry,
    children,
}: VisitorsModalContentProps) {
    if (isLoading) {
        return (
            <div
                className="grid min-h-0 flex-1 place-items-center border border-slate-300 bg-white font-mono text-sm text-slate-500 shadow-sm"
                role="status"
            >
                Carregando visitantes...
            </div>
        );
    }

    if (error) {
        return (
            <div className="grid min-h-0 flex-1 place-items-center border border-red-200 bg-red-50 p-6 text-center shadow-sm">
                <div>
                    <p className="font-semibold text-red-800">{error}</p>
                    <button
                        type="button"
                        onClick={onRetry}
                        className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="grid min-h-0 flex-1 place-items-center border border-dashed border-slate-300 bg-white font-mono text-sm text-slate-500 shadow-sm">
                Nenhum visitante cadastrado.
            </div>
        );
    }

    return <div className="min-h-0 flex-1">{children}</div>;
}
