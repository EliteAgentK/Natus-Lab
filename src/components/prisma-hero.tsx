import { useState } from 'react'
import { ArrowUpRight, Menu, X } from '../lib/icons'
import { motion } from '../lib/motion'
import { Button } from './ui/button'

const links = ['Studio', 'Capabilities', 'Approach', 'Journal']

export function PrismaHero() {
  const [open, setOpen] = useState(false)
  return (
    <main className="hero-shell">
      <div className="hero-media" aria-hidden="true" /><div className="hero-grain" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#" aria-label="Natus Lab home"><span className="brand-mark" />NATUS LAB</a>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map((link) => <a href={`#${link.toLowerCase()}`} key={link}>{link}</a>)}</nav>
        <Button className="header-cta" variant="ghost">Start a project <ArrowUpRight size={16} /></Button>
        <Button className="menu-button" variant="ghost" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </header>
      {open && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>{links.map((link) => <a href={`#${link.toLowerCase()}`} key={link} onClick={() => setOpen(false)}>{link}</a>)}<a href="#contact">Start a project <ArrowUpRight /></a></motion.nav>}
      <section className="hero-content">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2, duration: .8 }}>Independent creative studio · Est. 2026</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>We shape ideas<br />into <em>living</em> brands.</motion.h1>
        <motion.div className="hero-bottom" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: .8 }}>
          <p>Natus Lab is a design and innovation studio building identities, digital experiences, and new worlds for ambitious ideas.</p>
          <a className="primary-cta" href="#contact">Explore the lab <ArrowUpRight size={20} /></a>
        </motion.div>
      </section>
      <div className="side-note">STRATEGY · DESIGN · TECHNOLOGY</div><div className="scroll-cue"><span /> Scroll to discover</div>
    </main>
  )
}
