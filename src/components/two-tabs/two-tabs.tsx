import { useEffect, useRef, useState } from 'react'

import { Box, Tab, Tabs } from '@mui/material'

import { GlassCard } from '../ui/cards/glass-card'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const TwoTabs = ({ tab1, tab2 }: any) => {
  const [value, setValue] = useState(0)
  const scrollPositions = useRef<{ [key: number]: number }>({ 0: 0, 1: 0 })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    scrollPositions.current[value] = window.scrollY
    setValue(newValue)
  }

  useEffect(() => {
    window.scrollTo(0, scrollPositions.current[value])
  }, [value])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ height: '50px', marginBottom: '15px' }}>
        <GlassCard
          sx={{
            position: 'fixed',
            zIndex: 10,
            width: '100%',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            variant="fullWidth"
            sx={{ width: '100%' }}
          >
            <Tab label="New Game" {...a11yProps(0)} />
            <Tab label="Merge with this" {...a11yProps(1)} />
          </Tabs>
        </GlassCard>
      </Box>

      <CustomTabPanel value={value} index={0}>
        {tab1}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {tab2}
      </CustomTabPanel>
    </Box>
  )
}

export { TwoTabs }
