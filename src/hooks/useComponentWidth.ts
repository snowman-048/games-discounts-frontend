import { useEffect, useState } from 'react'

const useComponentWidth = (currentRef: any) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (currentRef.current) {
        setWidth(currentRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  return width
}

export { useComponentWidth }
