import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }
const Icon = ({ size = 24, children, ...props }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>
export const ArrowUpRight = (props: IconProps) => <Icon {...props}><path d="M7 17 17 7M7 7h10v10" /></Icon>
export const Menu = (props: IconProps) => <Icon {...props}><path d="M4 8h16M4 16h16" /></Icon>
export const X = (props: IconProps) => <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>
