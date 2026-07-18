'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, Send, ShieldCheck, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'rounded-xl border border-[#e5d7db] bg-white px-4 py-3.5 text-sm font-semibold text-[#21171b] outline-none transition placeholder:text-[#a6979c] focus:border-[#941034] focus:ring-4 focus:ring-[#941034]/10'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const task = (enabledTasks[0]?.key || 'article') as TaskKey
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--editable-page-bg,#fff7ee)] px-4 py-16 text-[var(--editable-page-text,#2f1d16)] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl gap-8 rounded-[2.8rem] border border-[var(--editable-border)] bg-white/75 p-7 shadow-[0_30px_90px_rgba(15,23,42,0.08)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-72 items-center justify-center rounded-[2rem] bg-[var(--editable-page-text,#2f1d16)] text-[var(--editable-page-bg,#fff7ee)]">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center">
              <p className="text-xs font-black uppercase tracking-[0.28em] opacity-55">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 opacity-70">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--editable-page-text,#2f1d16)] px-6 py-3 text-sm font-black text-[var(--editable-page-bg,#fff7ee)]">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-black">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#faf7f8] text-[#21171b]">
        <section className="relative overflow-hidden bg-[#280710] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(164,15,57,.48),transparent_34%),linear-gradient(120deg,#24070e,#6f0a28)]" />
          <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="relative mx-auto max-w-[var(--editable-container)] px-5 py-16 text-center sm:px-8 sm:py-20">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.25em] text-[#e0b95e]"><Sparkles className="h-4 w-4" /> {pagesContent.create.hero.badge}</p>
            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-6xl">Share something worth discovering.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/72">Add clear details, useful context, and a strong image so people can understand your post and connect with confidence.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-5 text-xs font-semibold text-white/75"><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#e0b95e]"/>Clear information</span><span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#e0b95e]"/>Simple submission</span></div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
            <form onSubmit={submit} className="rounded-[2rem] border border-[#eadde0] bg-white p-6 shadow-[0_28px_80px_rgba(71,8,27,.10)] sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#981136]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em]">{pagesContent.create.formTitle}</h2>
                  <p className="mt-2 text-sm text-[#7c7074]">Complete the fields below to prepare your submission.</p>
                </div>
                <span className="rounded-full bg-[#f7e9ed] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8f0f32]">{session.name}</span>
              </div>

              <div className="mt-8 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#921034] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#921034]/20 transition hover:-translate-y-0.5 hover:bg-[#790b2a]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
        </section>
      </main>
    </EditableSiteShell>
  )
}
