'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import { Grid2, Grid2Props } from '@mui/material'
import cn from 'classnames'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import { useComponentWidth } from '@/hooks/useComponentWidth'

import { NextButton, PrevButton, usePrevNextButtons } from './libs/utils/arrows'
import { SelectedSnapDisplay, useSelectedSnapDisplay } from './libs/utils/snap-display'
import styles from './styles.module.scss'

type TProps = Omit<EmblaOptionsType, 'slides'> & {
  slides: ReactNode[]
  controlsContainerProps?: Grid2Props
}

const Carousel = ({ slides, controlsContainerProps, ...rest }: TProps) => {
  const [loading, setLoading] = useState(true)

  const section = useRef<HTMLDivElement>(null)
  const width = useComponentWidth({ ref: section })

  useEffect(() => {
    setTimeout(() => setLoading(false), 700)
  }, [section.current])

  const [emblaRef, emblaApi] = useEmblaCarousel(rest)

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
        </div>

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

          <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />
        </Grid2>
      </div>
    </section>
  )
}

export { Carousel }
