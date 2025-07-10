'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import { Grid2, Grid2Props } from '@mui/material'
import cn from 'classnames'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import { useObserveElementSize } from '@/hooks/useObserveElementSize'

import { NextButton, PrevButton, usePrevNextButtons } from './libs/utils/arrows'
import { SelectedSnapDisplay, useSelectedSnapDisplay } from './libs/utils/snap-display'
import styles from './styles.module.scss'

type TProps = Omit<EmblaOptionsType, 'slides'> & {
  slides: ReactNode[]
  controlsContainerProps?: Grid2Props
  showCounter?: boolean
  buttonsPosition?: 'bottom' | 'sides'
}

const Carousel = ({
  slides,
  controlsContainerProps,
  showCounter = true,
  buttonsPosition = 'bottom',
  ...rest
}: TProps) => {
  const [loading, setLoading] = useState(true)

  const section = useRef<HTMLDivElement>(null)
  const { width } = useObserveElementSize(section)

  useEffect(() => {
    setLoading(false)
  }, [section.current])

  const [emblaRef, emblaApi] = useEmblaCarousel({ dragThreshold: 0, inViewThreshold: 0, ...rest })

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  return (
    <section className={cn(styles.section, { [styles.loading]: loading })} ref={section}>
      <div className={styles.wrapper} style={{ width }}>
        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles.container}>
            {slides.map((item, index) => (
              <div className={styles.slide} key={index}>
                {item}
              </div>
            ))}
          </div>
          {buttonsPosition === 'sides' && (
            <>
              <div className={cn(styles.sideButtons, styles.prevBtn)}>
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              </div>
              <div className={cn(styles.sideButtons, styles.nextBtn)}>
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
              </div>
            </>
          )}
        </div>

        {buttonsPosition === 'bottom' && (
          <Grid2
            container
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            {...controlsContainerProps}
          >
            <Grid2 container gap={2}>
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </Grid2>

            {showCounter && (
              <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />
            )}
          </Grid2>
        )}
      </div>
    </section>
  )
}

export { Carousel }
