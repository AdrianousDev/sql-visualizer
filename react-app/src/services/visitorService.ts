import type {
    Visitor,
    VisitorPayload,
    VisitorsResponse,
} from "../types/visitor";

const visitorsUrl = "/visitors";

async function getErrorMessage(response: Response) {
    try {
        const body: unknown = await response.json();

        if (typeof body === "object" && body !== null) {
            const { message } = body as { message?: unknown };

            if (typeof message === "string") return message;
        }
    } catch {
        return "A API retornou uma resposta inválida.";
    }

    return "Não foi possível concluir a operação.";
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    let response: Response;

    try {
        response = await fetch(url, options);
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw error;
        }

        throw new Error("Não foi possível conectar à API.");
    }

    if (!response.ok) {
        throw new Error(await getErrorMessage(response));
    }

    if (response.status === 204) return undefined as T;

    return response.json() as Promise<T>;
}

export function createVisitor(data: VisitorPayload) {
    return request<Visitor>(visitorsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export function updateVisitor(id: number, data: VisitorPayload) {
    return request<Visitor>(`${visitorsUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export function getVisitorById(id: number, signal?: AbortSignal) {
    return request<Visitor>(`${visitorsUrl}/${id}`, { signal });
}

export function deleteVisitor(id: number) {
    return request<void>(`${visitorsUrl}/${id}`, { method: "DELETE" });
}

export function getVisitors(page: number, limit: number, signal?: AbortSignal) {
    const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    return request<VisitorsResponse>(`${visitorsUrl}?${query}`, { signal });
}
