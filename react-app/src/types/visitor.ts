export type Operation = 'INSERT' | 'UPDATE' | 'DELETE'

export type VisitorFormData = {
  id: string
  nome: string
  idade: string
  areaInteresse: string
}

export type Visitor = {
  id: number
  nome: string
  idade: number
  areaInteresse: string
}

export type VisitorPayload = {
  nome: string
  idade: number
  areaInteresse: string
}

export type VisitorsResponse = {
  data: Visitor[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
