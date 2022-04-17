import { useEffect } from 'react'

export function useAsyncEffect(fn, deps = []) {
  useEffect(() => {
    fn()
  }, deps)
}
