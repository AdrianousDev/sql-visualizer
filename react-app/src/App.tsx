import { useState, type FormEvent } from 'react'
import { OperationTabs } from './components/OperationTabs'
import { SqlPreview } from './components/SqlPreview'
import { VisitorForm } from './components/VisitorForm'
import { VisitorsModal } from './components/VisitorsModal'
import {
  createVisitor,
  deleteVisitor,
  updateVisitor,
} from './services/visitorService'
import type { Operation, VisitorFormData } from './types/visitor'
import { generateSql } from './utils/sqlPreview'

type Feedback = {
  type: 'success' | 'error'
  message: string
}

const actionButtonStyles: Record<Operation, string> = {
  INSERT:
    'bg-emerald-500 text-emerald-950 shadow-emerald-500/20 hover:bg-emerald-400',
  UPDATE:
    'bg-amber-400 text-amber-950 shadow-amber-500/20 hover:bg-amber-300',
  DELETE: 'bg-rose-500 text-white shadow-rose-500/20 hover:bg-rose-400',
}

function App() {
  const [operation, setOperation] = useState<Operation>('INSERT')
  const [formData, setFormData] = useState<VisitorFormData>({
    id: '',
    nome: '',
    idade: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [visitorsVersion, setVisitorsVersion] = useState(0)

  function updateFormField(field: keyof VisitorFormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  function changeOperation(nextOperation: Operation) {
    setOperation(nextOperation)
    setFeedback(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback(null)

    const id = Number(formData.id)
    const idade = Number(formData.idade)
    const nome = formData.nome.trim()

    if (
      operation !== 'INSERT' &&
      (!Number.isInteger(id) || id < 1)
    ) {
      setFeedback({ type: 'error', message: 'Informe um ID válido.' })
      return
    }

    if (
      operation !== 'DELETE' &&
      (nome === '' ||
        formData.idade.trim() === '' ||
        !Number.isInteger(idade) ||
        idade < 0)
    ) {
      setFeedback({
        type: 'error',
        message: 'Informe um nome e uma idade válida.',
      })
      return
    }

    setIsSubmitting(true)

    try {
      if (operation === 'INSERT') {
        await createVisitor({ nome, idade })
        setFormData((current) => ({ ...current, nome: '', idade: '' }))
        setFeedback({
          type: 'success',
          message: 'Visitante inserido com sucesso.',
        })
      } else if (operation === 'UPDATE') {
        await updateVisitor(id, { nome, idade })
        setFeedback({
          type: 'success',
          message: 'Visitante atualizado com sucesso.',
        })
      } else {
        await deleteVisitor(id)
        setFormData((current) => ({ ...current, id: '' }))
        setFeedback({
          type: 'success',
          message: 'Visitante removido com sucesso.',
        })
      }

      setVisitorsVersion((current) => current + 1)
    } catch (error) {
      setFeedback({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Não foi possível concluir a operação.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-dvh flex-col bg-slate-100 text-slate-950">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-5 py-4 text-white shadow-lg sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg border border-blue-400/30 bg-blue-500/15 font-mono text-lg font-black text-blue-300 shadow-inner shadow-blue-400/10">
            SQL
          </span>
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              SQL Visualizer
            </h1>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-300">
              OPA UNIVALI
            </p>
          </div>
        </div>

        <p className="hidden max-w-sm text-right text-sm leading-6 text-slate-400 md:block">
          Edite os campos e acompanhe a instrução SQL equivalente.
        </p>
      </header>

      <section className="grid flex-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="flex items-center bg-slate-100 px-5 py-8 sm:px-8 lg:px-10 lg:py-9 xl:px-14">
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-6">
              <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
                01 — ESCOLHA A OPERAÇÃO
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Manipule um visitante
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Os campos mudam conforme o comando selecionado.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-5">
              <OperationTabs operation={operation} onChange={changeOperation} />

              <div className="my-5 h-px bg-slate-100" />

              <form onSubmit={handleSubmit}>
                <VisitorForm
                  operation={operation}
                  formData={formData}
                  onChange={updateFormField}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-6 w-full rounded-xl px-5 py-3.5 font-black tracking-wide shadow-lg transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-wait disabled:opacity-60 ${actionButtonStyles[operation]}`}
                >
                  {isSubmitting ? 'Executando...' : `Executar ${operation}`}
                </button>

                {feedback && (
                  <p
                    className={`mt-4 rounded-xl border px-4 py-3 text-sm font-semibold ${
                      feedback.type === 'success'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-red-200 bg-red-50 text-red-800'
                    }`}
                    role={feedback.type === 'error' ? 'alert' : 'status'}
                  >
                    {feedback.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="min-h-[440px] border-t-4 border-blue-600 bg-[#070d18] text-white lg:min-h-0 lg:border-t-0 lg:border-l-4">
          <SqlPreview sql={generateSql(operation, formData)} />
        </div>
      </section>

      <section className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-white px-5 py-4 shadow-[0_-8px_30px_rgba(15,23,42,0.04)] sm:flex-row sm:px-8 lg:px-12">
        <div>
          <p className="font-bold text-slate-900">Explore a operação SELECT</p>
          <p className="mt-0.5 text-sm text-slate-500">
            Consulte os registros armazenados no PostgreSQL.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-6 py-3 font-bold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
        >
          Visualizar visitantes
        </button>
      </section>

      {isModalOpen && (
        <VisitorsModal
          refreshKey={visitorsVersion}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  )
}

export default App
