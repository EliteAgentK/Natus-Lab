import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'ghost' }

export function Button({ className = '', variant = 'default', ...props }: ButtonProps) {
  return <button className={`button button--${variant} ${className}`} {...props} />
}
