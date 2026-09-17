export type Operation = 'INSERT' | 'UPDATE' | 'DELETE'

export type VisitorFormData = {
  id: string
  nome: string
  idade: string
}

export type Visitor = {
  id: number
  nome: string
  idade: number
}

export type VisitorPayload = {
  nome: string
  idade: number
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
