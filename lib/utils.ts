import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin
}
