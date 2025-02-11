import { useEffect, useState } from 'react'

type TProps = {
  ref?: any
  viewport?: boolean
}

const useComponentWidth = ({ ref, viewport }: TProps) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (ref?.current) {
        setWidth(ref.current.offsetWidth)
      } else if (viewport) {
        setWidth(document.body.offsetWidth)
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
