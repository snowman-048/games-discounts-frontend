'use client'

import { useEffect, useRef, useState } from 'react'

import cn from 'classnames'

import { getRandomIntInRange } from '@/helpers/getRandomIntInRange'
import { onElementHeightChange } from '@/helpers/onElementHeightChange'
import { takeChance } from '@/helpers/takeChance'

import styles from './styles.module.scss'

const patternSet = ['GAMES', 'PULSE', 'PlayStation', 'XBOX', 'Nintendo', 'DISCOUNTS']

const LINE_HEIGHT = 48
const FONT_SIZE = 40
const TEXT_OFFSET = 200
const COLORIZE_CHANCE = 20
const DEFAULT_CHUNK_HEIGHT = 1080

const BackgroundHandler = () => {
  const [isInit, setIsInit] = useState(false)

  const container = useRef<HTMLDivElement>(null)
  const patternChunk = useRef('')

  useEffect(() => {
    if (!container.current) {
      return
    }

    const width = container.current.scrollWidth
    const height = DEFAULT_CHUNK_HEIGHT

    let text = ''

    for (let i = height; i > 0; i -= LINE_HEIGHT) {
      let widthLeft = width
      text += `<p style="margin-left: ${getRandomIntInRange(-TEXT_OFFSET, TEXT_OFFSET)}px">`
      while (widthLeft > 0) {
        const pattern = patternSet[Math.floor(Math.random() * patternSet.length)]
        const patternLength = pattern.length
        widthLeft -= patternLength * (FONT_SIZE / 1.2)
        if (takeChance(COLORIZE_CHANCE)) {
          text += `<span style="color: var(--color-brand); opacity: ${getRandomIntInRange(10, 40) / 100}">${pattern} </span>`
        } else {
          text += `${pattern} `
        }
      }
      text += '</p>'
    }

    patternChunk.current = text

    const handlePatternSet = (containerHeight: number) => {
      if (!container.current) {
        return
      }

      const chunksCount = Math.ceil(containerHeight / DEFAULT_CHUNK_HEIGHT)
      container.current.innerHTML = Array(chunksCount).fill(patternChunk.current).join('')
    }

    handlePatternSet(container.current.scrollHeight || 0)
    setIsInit(true)

    onElementHeightChange(container.current, handlePatternSet)
  }, [])

  return (
    <div
      ref={container}
      className={cn(styles.container, { [styles.initialized]: isInit })}
      style={{
        fontSize: `${FONT_SIZE}px`,
        lineHeight: `${LINE_HEIGHT}px`,
      }}
    />
  )
}

export { BackgroundHandler }
