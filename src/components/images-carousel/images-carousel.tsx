'use client'

import { Grid2, useMediaQuery } from '@mui/material'
import Image from 'next/image'

import { breakpoints } from '@/theme'

import { Carousel } from '../ui/carousel'

type TProps = {
  images: string[]
  alt: string
}

const ImagesCarousel = ({ images, alt }: TProps) => {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.md - 1}px)`)

  return (
    <Carousel
      loop
      align="center"
      controlsContainerProps={{ px: 3 }}
      slides={images.map((img, index) => (
        <Grid2 height={{ xs: 'auto', md: '400px' }} width={{ xs: '370px', md: 'auto' }}>
          <Image
            key={index}
            src={img}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: isMobile ? '100%' : 'auto',
              height: isMobile ? 'auto' : '100%',
              borderRadius: 15,
            }}
          />
        </Grid2>
      ))}
    />
  )
}

export { ImagesCarousel }
