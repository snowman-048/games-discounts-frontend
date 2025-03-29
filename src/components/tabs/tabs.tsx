import { useEffect, useRef, useState } from 'react'

import { Box, Tabs as MuiTabs, Tab } from '@mui/material'

import { GlassCard } from '../ui/cards/glass-card'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const CustomTabPanel = (props: TabPanelProps) => {
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

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

type TTab = {
  label: string
  content: React.ReactNode
}

const Tabs = ({ tabs }: { tabs: TTab[] }) => {
  const [value, setValue] = useState(0)
  const scrollPositions = useRef<{ [key: number]: number }>({ 0: 0, 1: 0 })

  const handleChange = (newValue: number) => {
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
          <MuiTabs
            value={value}
            onChange={(_, value) => handleChange(value)}
            aria-label="basic tabs example"
            centered
            variant="fullWidth"
            sx={{ width: '100%' }}
          >
            {tabs?.map((tab, index) => <Tab label={tab.label} {...a11yProps(index)} />)}
          </MuiTabs>
        </GlassCard>
      </Box>

      {tabs?.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  )
}

export { Tabs }
