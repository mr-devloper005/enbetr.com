'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, Plus, LogOut, UserRound } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const links = [{label:'Classified',href:'/classified'},{label:'Home',href:'/'},{label:'About',href:'/about'},{label:'Search',href:'/search'}]
export function EditableNavbar() {
  const [open,setOpen]=useState(false); const pathname=usePathname(); const {session,logout}=useEditableLocalAuthSession()
  return <header className="sticky top-0 z-50 border-b border-[#e9dfe1] bg-white/95 text-[#20161a] shadow-[0_4px_18px_rgba(44,8,20,.06)] backdrop-blur-xl">
    <nav className="mx-auto flex min-h-[78px] max-w-[var(--editable-container)] items-center gap-7 px-5 sm:px-8">
      <Link href="/" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#8b0d30]"><img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-contain" /></span><span><b className="block text-xl leading-none">{SITE_CONFIG.name}</b><small className="mt-1 block text-[10px] uppercase tracking-[.18em] text-[#8a777d]">Listings & professional profiles</small></span></Link>
      <div className="ml-auto hidden items-center gap-1 lg:flex">{links.map(l=><Link key={l.href} href={l.href} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${pathname===l.href?'bg-[#f6e9ed] text-[#8d0d31]':'hover:bg-[#faf5f6]'}`}>{l.label}</Link>)}</div>
      <div className="ml-auto flex items-center gap-2 lg:ml-3">{session?<><span className="hidden items-center gap-2 text-sm font-bold sm:flex"><UserRound className="h-4 w-4 text-[#900e32]"/>{session.name}</span><Link href="/create" className="hidden rounded-lg bg-[#8e0e32] px-4 py-2 text-sm font-bold text-white sm:inline-flex"><Plus className="mr-1 h-4 w-4"/>Create</Link><button onClick={logout} className="hidden rounded-lg border border-[#d9c4ca] px-3 py-2 text-sm font-bold sm:inline-flex"><LogOut className="mr-1 h-4 w-4"/>Logout</button></>:<><Link href="/login" className="hidden rounded-lg border border-[#9a1538] px-4 py-2 text-sm font-bold text-[#8e0e32] sm:block">Login</Link><Link href="/signup" className="hidden rounded-lg bg-[#8e0e32] px-4 py-2 text-sm font-bold text-white sm:block">Sign up</Link></>}<button onClick={()=>setOpen(!open)} className="rounded-lg border border-[#dfd2d5] p-2 lg:hidden" aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div>
    </nav>
    {open?<div className="border-t border-[#eee3e5] bg-white px-5 py-4 lg:hidden">{[...links,...(session?[{label:'Create',href:'/create'}]:[{label:'Login',href:'/login'},{label:'Sign up',href:'/signup'}])].map(l=><Link onClick={()=>setOpen(false)} key={l.href} href={l.href} className="block rounded-lg px-3 py-3 font-semibold hover:bg-[#f8edef]">{l.label}</Link>)}{session?<button onClick={logout} className="w-full px-3 py-3 text-left font-semibold">Logout</button>:null}</div>:null}
  </header>
}
