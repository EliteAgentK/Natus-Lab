import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import type { CSSProperties } from 'react'

interface WordsPullUpProps {
  text: string
  className?: string
  showStar?: boolean
  style?: CSSProperties
}

export const WordsPullUp = ({
  text,
  className = '',
  showStar = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, index) => {
        const isLast = index === words.length - 1
        return (
          <motion.span
            key={`${word}-${index}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
            style={{ marginRight: isLast ? 0 : '0.25em' }}
          >
            {word}
            {showStar && isLast && (
              <span
                aria-hidden="true"
                className="absolute top-[0.52em] -right-[0.26em] text-[0.24em] leading-none"
              >
                ✦
              </span>
            )}
          </motion.span>
        )
      })}
    </div>
  )
}

interface Segment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  className?: string
  style?: CSSProperties
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = '',
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = segments.flatMap((segment) =>
    segment.text.split(' ').filter(Boolean).map((word) => ({ word, className: segment.className })),
  )

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((item, index) => (
        <motion.span
          key={`${item.word}-${index}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${item.className ?? ''}`}
          style={{ marginRight: '0.25em' }}
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  )
}

const navItems = ['Our story', 'Collective', 'Workshops', 'Programs', 'Inquiries']

const PrismaHero = () => (
  <section className="h-screen w-full bg-black p-2 sm:p-4 lg:p-6">
    <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2400&q=85"
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />

      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      <nav className="absolute left-1/2 top-0 z-20 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2" aria-label="Main navigation">
        <div className="flex items-center justify-between gap-3 rounded-b-2xl bg-black px-4 py-3 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[10px] text-[#E1E0CC]/80 transition-colors hover:text-[#E1E0CC] sm:text-xs md:text-sm">
              {item}
            </a>
          ))}
        </div>
      </nav>

      <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-6 md:px-10 md:pb-7">
        <div className="grid grid-cols-12 items-end gap-4">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-[22vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#D2B06A] sm:text-[20vw] md:text-[18vw] lg:text-[14vw] xl:text-[13vw] 2xl:text-[14vw]">
              <WordsPullUp text="Natus" showStar />
            </h1>
          </div>

          <div className="col-span-12 flex flex-col gap-5 pb-2 lg:col-span-4 lg:pb-10">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg text-xs leading-[1.2] text-[#E1E0CC]/70 sm:text-sm md:text-base"
            >
              Natus Lab is an independent collective of artists, filmmakers, designers, and storytellers united by curiosity and a shared drive to turn new perspectives into meaningful work.
            </motion.p>

            <motion.a
              href="#inquiries"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex items-center gap-2 self-start rounded-full bg-[#E1E0CC] py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
            >
              Join the lab
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                <ArrowRight className="h-4 w-4 text-[#E1E0CC]" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export { PrismaHero }
