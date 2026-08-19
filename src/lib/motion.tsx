import { createElement, type CSSProperties, type ElementType, type HTMLAttributes } from 'react'

type MotionProps = HTMLAttributes<HTMLElement> & { initial?: CSSProperties; animate?: CSSProperties; transition?: { delay?: number; duration?: number; ease?: unknown } }
const component = (tag: ElementType) => ({ initial, animate, transition, style, ...props }: MotionProps) => createElement(tag, { ...props, style: { ...style, ...initial, ...animate, transition: `all ${transition?.duration ?? .7}s ease ${transition?.delay ?? 0}s` } })
export const motion = { nav: component('nav'), p: component('p'), h1: component('h1'), div: component('div') }
