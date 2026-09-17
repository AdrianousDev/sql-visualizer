import type { Operation, VisitorFormData } from '../types/visitor'

function escapeSqlString(value: string) {
  return value.replaceAll("'", "''")
}

function integerOrNull(value: string) {
  const number = Number(value)

  return value.trim() !== '' && Number.isInteger(number)
    ? String(number)
    : 'NULL'
}

export function generateSql(
  operation: Operation,
  formData: VisitorFormData,
) {
  const id = integerOrNull(formData.id)
  const idade = integerOrNull(formData.idade)
  const nome = escapeSqlString(formData.nome)

  if (operation === 'INSERT') {
    return `INSERT INTO visitantes (nome, idade)
VALUES ('${nome}', ${idade});`
  }

  if (operation === 'UPDATE') {
    return `UPDATE visitantes
SET nome = '${nome}',
    idade = ${idade}
WHERE id = ${id};`
  }

  return `DELETE FROM visitantes
WHERE id = ${id};`
}

export function generateSelectSql(page: number, limit: number) {
  const offset = (page - 1) * limit

  return `SELECT id, nome, idade
FROM visitantes
ORDER BY id
LIMIT ${limit} OFFSET ${offset};`
}
