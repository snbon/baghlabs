import { useContext } from 'react'
import { LenisContext } from '@/components/LenisProvider'

export function useLenis() {
  return useContext(LenisContext)
}
