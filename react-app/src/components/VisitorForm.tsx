import type { Operation, VisitorFormData } from "../types/visitor";

type VisitorFormProps = {
    operation: Operation;
    formData: VisitorFormData;
    onChange: (field: keyof VisitorFormData, value: string) => void;
};

const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-lg font-medium text-slate-950 shadow-sm outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

export function VisitorForm({
    operation,
    formData,
    onChange,
}: VisitorFormProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {operation !== "INSERT" && (
                <label className="block text-sm font-bold text-slate-700 sm:col-span-2">
                    ID do visitante
                    <input
                        type="number"
                        min="1"
                        step="1"
                        inputMode="numeric"
                        value={formData.id}
                        onChange={(event) => onChange("id", event.target.value)}
                        placeholder="1"
                        className={inputClassName}
                    />
                </label>
            )}

            {operation !== "DELETE" && (
                <>
                    <label className="block text-sm font-bold text-slate-700">
                        Nome
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={(event) =>
                                onChange("nome", event.target.value)
                            }
                            placeholder="Bruno"
                            className={inputClassName}
                        />
                    </label>

                    <label className="block text-sm font-bold text-slate-700">
                        Idade
                        <input
                            type="number"
                            min="0"
                            step="1"
                            inputMode="numeric"
                            value={formData.idade}
                            onChange={(event) =>
                                onChange("idade", event.target.value)
                            }
                            placeholder="20"
                            className={inputClassName}
                        />
                    </label>

                    <label className="block text-sm font-bold text-slate-700 sm:col-span-2">
                        Área de interesse
                        <input
                            type="text"
                            value={formData.areaInteresse}
                            onChange={(event) =>
                                onChange("areaInteresse", event.target.value)
                            }
                            placeholder="Tecnologia"
                            className={inputClassName}
                        />
                    </label>
                </>
            )}
        </div>
    );
}
