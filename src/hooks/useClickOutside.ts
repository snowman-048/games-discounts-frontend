import { RefObject, useEffect } from 'react'

const useClickOutside = (ref: RefObject<HTMLElement | null>, onClickOutside: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
}

export { useClickOutside }
