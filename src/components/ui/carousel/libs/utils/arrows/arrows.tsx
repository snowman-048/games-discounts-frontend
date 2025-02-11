'use client'

import React, { useCallback, useEffect, useState } from 'react'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { IconButton, IconButtonProps } from '@mui/material'
import { EmblaCarouselType } from 'embla-carousel'

import { GlassCard } from '@/components/ui/cards/glass-card'

import styles from './styles.module.scss'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type TProps = IconButtonProps

export const PrevButton = ({ children, ...rest }: TProps) => {
  return (
    <GlassCard className={styles.button}>
      <IconButton {...rest}>
        <NavigateBeforeIcon />
      </IconButton>
    </GlassCard>
  )
}

export const NextButton = ({ children, ...rest }: TProps) => {
  return (
    <GlassCard className={styles.button}>
      <IconButton {...rest}>
        <NavigateNextIcon />
      </IconButton>
    </GlassCard>
  )
}
