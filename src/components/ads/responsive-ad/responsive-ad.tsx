'use client'

import { useEffect } from 'react'

import { Box } from '@mui/material'

const ResponsiveAd = () => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || [])?.push?.({})

    window.addEventListener('load', function () {
      ;(window.adsbygoogle = window.adsbygoogle || [])?.push?.({})
    })
  }, [])

  return (
    <Box>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7096388850784019"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7096388850784019"
        data-ad-slot="4334030439"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest="on"
      ></ins>
    </Box>
  )
}

export { ResponsiveAd }
