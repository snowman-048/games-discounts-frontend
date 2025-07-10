import { RefObject, useEffect, useState } from 'react'

const useObserveElementSize = (ref: RefObject<HTMLElement | null>) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return
      setWidth(ref.current.offsetWidth)
      setHeight(ref.current.offsetHeight)
    })

    resizeObserver.observe(ref.current)

    setWidth(ref.current.offsetWidth)
    setHeight(ref.current.offsetHeight)

    return () => resizeObserver.disconnect()
  }, [])

  return { width, height }
}

export { useObserveElementSize }
