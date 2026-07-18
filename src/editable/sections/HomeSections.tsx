import Link from 'next/link'
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, MapPin, Search, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'

type HomeSectionProps = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const wrap = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8'
const fallback = '/placeholder.svg?height=700&width=900'

function poolOf(posts: SitePost[], sections: HomeTimeSection[]) {
  return Array.from(new Map([...posts, ...sections.flatMap((s) => s.posts)].map((p) => [p.slug || p.id || p.title, p])).values())
}
function excerpt(post: SitePost, length = 120) {
  const content = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw = post.summary || (typeof content.description === 'string' ? content.description : '') || (typeof content.body === 'string' ? content.body : '')
  const clean = toPlainText(raw || 'Discover the details, connect directly, and take the next step with confidence.')
  return clean.length > length ? `${clean.slice(0, length).trim()}…` : clean
}
function category(post: SitePost) {
  const content = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post.tags?.[0] || 'Featured'
}

export function EditableHomeHero({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections)
  const image = pool[0] ? getEditablePostImage(pool[0]) : fallback
  return <>
    <section className="relative isolate min-h-[610px] overflow-hidden bg-[#21070d] text-white">
      <img src={image || fallback} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#24070e_0%,rgba(54,8,19,.94)_45%,rgba(35,4,10,.2)_100%)]" />
      <div className="hero-orb absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#a70c38]/30 blur-3xl" />
      <div className={`${wrap} flex min-h-[610px] items-center py-20`}>
        <div className="max-w-[690px]">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.24em] text-[#e7bd5b]"><Sparkles className="h-4 w-4"/> Verified opportunities. Real connections.</p>
          <h1 className="text-balance font-serif text-5xl font-bold leading-[1.04] sm:text-6xl lg:text-7xl">Find what you need.<br/><em className="font-medium text-[#f0d48e]">Be known for what you do.</em></h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">Explore local classifieds, discover trusted professionals, and build meaningful connections in one focused community.</p>
          <form action="/search" className="mt-8 flex max-w-2xl overflow-hidden rounded-xl border border-white/20 bg-white p-1.5 shadow-2xl">
            <label className="flex min-w-0 flex-1 items-center gap-3 px-4 text-[#6d6670]"><Search className="h-5 w-5"/><input name="q" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#21171a] outline-none" placeholder="Search services, products, people or places"/></label>
            <button className="rounded-lg bg-[#93052e] px-7 text-sm font-bold text-white">Search</button>
          </form>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/classified" className="rounded-full bg-[#a50d39] px-6 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-1">Browse classifieds <ArrowRight className="ml-2 inline h-4 w-4"/></Link>
            <Link href="/profile" className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/10">Explore profiles</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 bg-black/35 backdrop-blur-md"><div className={`${wrap} flex flex-wrap items-center gap-x-10 gap-y-3 py-4 text-xs font-semibold uppercase tracking-wider text-white/80`}><span>I’m here for</span><Link href="/classified">Buying & selling</Link><Link href="/classified">Hiring & services</Link><Link href="/profile">Professional profiles</Link><Link href={primaryRoute}>Explore all</Link></div></div>
    </section>
  </>
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = poolOf(posts, timeSections).slice(0, 10)
  if (!items.length) return null
  return <section className="overflow-hidden bg-[#080608] py-16 text-white">
    <div className={`${wrap} text-center`}><p className="text-xs font-bold uppercase tracking-[.28em] text-[#d4aa46]">Fresh opportunities</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">What the community is sharing</h2></div>
    <div className="marquee mt-10 flex w-max gap-5 px-5">
      {[...items, ...items].map((post, i) => <Link key={`${post.id || post.slug}-${i}`} href={postHref(primaryTask, post, primaryRoute)} className="group w-[285px] shrink-0 overflow-hidden rounded-2xl border border-[#651329] bg-[#160b0f]">
        <div className="relative h-48 overflow-hidden"><img src={getEditablePostImage(post) || fallback} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/><span className="absolute left-3 top-3 rounded-full bg-[#8e1232] px-3 py-1 text-[10px] font-bold uppercase">{category(post)}</span></div>
        <div className="p-5"><h3 className="line-clamp-2 text-lg font-bold">{post.title || 'Community opportunity'}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60">{excerpt(post, 90)}</p></div>
      </Link>)}
    </div>
  </section>
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = poolOf(posts, timeSections).slice(0, 6)
  return <section className="bg-white py-20"><div className={wrap}>
    <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.25em] text-[#9a1133]">One place, two powerful ways to connect</p><h2 className="mt-3 text-4xl font-bold text-[#181317]">Discover opportunities. Build credibility.</h2><p className="mt-4 leading-7 text-[#70676b]">Move from finding a useful listing to meeting the person or organization behind it.</p></div>
    <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
      {items[0] ? <Link href={postHref(primaryTask, items[0], primaryRoute)} className="group relative min-h-[470px] overflow-hidden rounded-[28px] bg-[#250811] text-white"><img src={getEditablePostImage(items[0]) || fallback} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-8 sm:p-10"><span className="rounded-full bg-[#a30f38] px-3 py-1 text-xs font-bold">Featured classified</span><h3 className="mt-4 max-w-xl text-3xl font-bold">{items[0].title}</h3><p className="mt-3 max-w-lg text-white/75">{excerpt(items[0], 150)}</p></div></Link> : null}
      <div className="grid gap-4">{items.slice(1,4).map((post, i) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex gap-5 rounded-2xl border border-[#eadde0] bg-[#fffafb] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><img src={getEditablePostImage(post) || fallback} alt="" className="h-28 w-28 rounded-xl object-cover"/><div className="min-w-0 py-1"><p className="text-[10px] font-bold uppercase tracking-widest text-[#991335]">{i === 0 ? 'Popular now' : category(post)}</p><h3 className="mt-2 line-clamp-2 text-lg font-bold text-[#21171b]">{post.title}</h3><p className="mt-2 line-clamp-1 text-sm text-[#776b70]">{excerpt(post, 70)}</p></div></Link>)}</div>
    </div>
  </div></section>
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = poolOf(posts, timeSections).slice(4, 12)
  return <>
    <section className="bg-[#f8f5f5] py-20"><div className={wrap}><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-[#9a1133]">Trusted profiles</p><h2 className="mt-3 text-4xl font-bold">People and organizations worth knowing</h2></div><Link href="/profile" className="font-bold text-[#941034]">View all profiles →</Link></div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.slice(0,4).map((post) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="profile-card rounded-2xl border border-[#e7dbde] bg-white p-5 text-center shadow-sm"><img src={getEditablePostImage(post) || fallback} alt="" className="mx-auto h-32 w-32 rounded-full border-4 border-[#f4e6e9] object-cover"/><BadgeCheck className="mx-auto -mt-5 h-7 w-7 fill-[#9e1236] text-white"/><h3 className="mt-4 line-clamp-1 text-lg font-bold">{post.title}</h3><p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#9e1236]">{category(post)}</p><p className="mt-3 line-clamp-2 text-sm leading-6 text-[#74696d]">{excerpt(post, 85)}</p></Link>)}</div>
    </div></section>
    <section className="bg-white py-16"><div className={`${wrap} grid gap-4 sm:grid-cols-3`}>
      {[[ShieldCheck,'Safer discovery','Clear details and useful context help you make informed choices.'],[BriefcaseBusiness,'Purpose-built listings','Buy, sell, hire, rent, or offer services without unnecessary noise.'],[UserRound,'Profiles with presence','Show expertise, experience, and identity in a credible professional format.']].map(([Icon,title,text]) => { const I=Icon as typeof ShieldCheck; return <div key={title as string} className="rounded-2xl border border-[#eee4e6] p-7"><I className="h-9 w-9 text-[#961034]"/><h3 className="mt-5 text-xl font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-[#74696d]">{text as string}</p></div>})}
    </div></section>
  </>
}

export function EditableHomeCta() {
  return <section className="relative overflow-hidden bg-[#790b28] py-20 text-white"><div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"/><div className={`${wrap} relative text-center`}><Building2 className="mx-auto h-10 w-10 text-[#e3bd63]"/><h2 className="mt-5 text-4xl font-bold">Ready to be discovered?</h2><p className="mx-auto mt-4 max-w-xl text-white/75">Publish a classified or create a professional profile that helps the right people find and trust you.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/create" className="rounded-full bg-white px-7 py-3 font-bold text-[#800b2b]">Create a post</Link><Link href="/about" className="rounded-full border border-white/50 px-7 py-3 font-bold">Learn about enbetr</Link></div></div></section>
}
