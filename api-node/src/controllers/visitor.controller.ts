import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

type VisitorData = {
    nome: string;
    idade: number;
    areaInteresse: string;
};

type VisitorParams = {
    id: string;
};

type PaginationQuery = {
    page?: string;
    limit?: string;
};

function parseVisitorData(body: unknown): VisitorData | null {
    if (typeof body !== "object" || body === null) {
        return null;
    }

    const { nome, idade, areaInteresse } = body as Record<string, unknown>;

    if (typeof nome !== "string" || nome.trim() === "") {
        return null;
    }

    if (typeof idade !== "number" || !Number.isInteger(idade) || idade < 0) {
        return null;
    }

    if (typeof areaInteresse !== "string" || areaInteresse.trim() === "") {
        return null;
    }

    return {
        nome: nome.trim(),
        idade,
        areaInteresse: areaInteresse.trim(),
    };
}

function parseId(value: string): number | null {
    const id = Number(value);

    return Number.isInteger(id) && id > 0 ? id : null;
}

export async function createVisitor(
    req: Request<Record<string, never>, unknown, unknown>,
    res: Response,
) {
    const data = parseVisitorData(req.body);

    if (!data) {
        res.status(400).json({
            message:
                "Nome, idade e área de interesse são obrigatórios e devem ser válidos.",
        });
        return;
    }

    try {
        const visitor = await prisma.visitante.create({ data });

        res.status(201).json(visitor);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro inesperado ao criar visitante.",
        });
    }
}

export async function listVisitors(
    req: Request<Record<string, never>, unknown, unknown, PaginationQuery>,
    res: Response,
) {
    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    const limit = req.query.limit === undefined ? 10 : Number(req.query.limit);

    if (
        !Number.isInteger(page) ||
        page < 1 ||
        !Number.isInteger(limit) ||
        limit < 1 ||
        limit > 100
    ) {
        res.status(400).json({
            message:
                "Page e limit devem ser inteiros positivos; limit deve ser no máximo 100.",
        });
        return;
    }

    try {
        const [data, total] = await prisma.$transaction([
            prisma.visitante.findMany({
                orderBy: { id: "asc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.visitante.count(),
        ]);

        res.status(200).json({
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro inesperado ao listar visitantes.",
        });
    }
}

export async function getVisitorById(
    req: Request<VisitorParams>,
    res: Response,
) {
    const id = parseId(req.params.id);

    if (!id) {
        res.status(400).json({ message: "ID inválido." });
        return;
    }

    try {
        const visitor = await prisma.visitante.findUnique({ where: { id } });

        if (!visitor) {
            res.status(404).json({ message: "Visitante não encontrado." });
            return;
        }

        res.status(200).json(visitor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro inesperado ao buscar visitante." });
    }
}

export async function updateVisitor(
    req: Request<VisitorParams, unknown, unknown>,
    res: Response,
) {
    const id = parseId(req.params.id);
    const data = parseVisitorData(req.body);

    if (!id) {
        res.status(400).json({ message: "ID inválido." });
        return;
    }

    if (!data) {
        res.status(400).json({
            message:
                "Nome, idade e área de interesse são obrigatórios e devem ser válidos.",
        });
        return;
    }

    try {
        const existingVisitor = await prisma.visitante.findUnique({
            where: { id },
        });

        if (!existingVisitor) {
            res.status(404).json({ message: "Visitante não encontrado." });
            return;
        }

        const visitor = await prisma.visitante.update({
            where: { id },
            data,
        });

        res.status(200).json(visitor);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro inesperado ao atualizar visitante.",
        });
    }
}

export async function deleteVisitor(
    req: Request<VisitorParams>,
    res: Response,
) {
    const id = parseId(req.params.id);

    if (!id) {
        res.status(400).json({ message: "ID inválido." });
        return;
    }

    try {
        const existingVisitor = await prisma.visitante.findUnique({
            where: { id },
        });

        if (!existingVisitor) {
            res.status(404).json({ message: "Visitante não encontrado." });
            return;
        }

        await prisma.visitante.delete({ where: { id } });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro inesperado ao remover visitante.",
        });
    }
}
