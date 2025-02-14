import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Stack, Typography } from '@mui/material'
import { Metadata } from 'next'

import { HeroCard } from '@/components/hero-card'
import { THero } from '@/components/hero-card/hero-card'
import { SectionTitle } from '@/components/section-title'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Container } from '@/components/ui/container'

import styles from './styles.module.scss'

const heroes: THero[] = [
  {
    coverImageUrl: '/assets/images/snowman.jpeg',
    title: 'Vlad Haiduk',
    about: `I've been gaming since childhood, hopping between PCs and consoles like a kid in a candy store — except the candy is expensive, and a kid has no money for all the games in the world.
      That’s why we built this site: to help fellow gamers score the best deals without resorting to selling a kidney (for now — remember, game development is becoming more expensive).
      If you see a deal that looks too good to be true, don’t worry — it’s not a glitch... probably.
      When I’m not buried in code (which doesn’t happen often), I’m either exploring new games, refining this site, or traveling while pretending my backlog doesn’t exist.
      `,
    links: [
      {
        url: `https://www.linkedin.com/in/vlad-gayduk-2ab37519a/`,
        icon: LinkedInIcon,
        title: 'LinkedIn',
      },
      {
        url: `https://www.instagram.com/_vlad_gayduk_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==`,
        icon: InstagramIcon,
        title: 'Instagram',
      },
    ],
  },
  {
    coverImageUrl: '/assets/images/hyena-ruz.jpeg',
    title: 'Novruz Babaiev',
    about: `Novruz is a programmer and a dedicated gamer who grew up playing on 8-bit consoles and has
            been passionate about video games since childhood. Over time, his love for gaming evolved 
            into an interest in programming, and the variety of gaming platforms inspired him to create 
            a convenient service for finding the best deals. This website is not just a project but a way 
            to combine his passions and make the process of buying games easier and more affordable for everyone.`,
    links: [
      {
        url: `https://www.linkedin.com/in/novruz-babaiev-4b734728a/`,
        icon: LinkedInIcon,
        title: 'LinkedIn',
      },
      {
        url: `https://www.instagram.com/hyena.ruz?igsh=eW13ZjB5OGlhdXNk`,
        icon: InstagramIcon,
        title: 'Instagram',
      },
    ],
  },
]

export const metadata: Metadata = {
  title: 'About',
  keywords: [
    'about',
    'company',
    'people',
    'goals',
    'games',
    'inspiration',
    ...heroes.map((hero) => hero.title),
  ],
}

const AboutUs = async () => {
  return (
    <Container gap={{ xs: 2, md: 4 }} paddingBottom={5}>
      <GlassCard className={styles.section}>
        <Stack gap={2}>
          <SectionTitle title="About Us" />
          <Typography variant="body1">
            We created this service to help gamers find the best discounts from various stores. Our
            website aggregates data from platforms such as PlayStation Store, Nintendo eShop, Xbox,
            and others, providing a convenient way to compare prices, track discounts, and analyze
            price history.
            <br /> <br />
            We strive to make our service as user-friendly, informative, and useful as possible.
            With flexible filters, price change graphs, and game tracking features, users can easily
            make informed purchasing decisions.
            {/* <br /> <br />
            Our project is supported by advertisements, which help us maintain the website and add
            new features. If you enjoy our service, we would appreciate it if you disable your ad
            blocker – this allows us to grow and continue providing up-to-date discount data. */}
            <br /> <br />
            Our team is constantly working on improving functionality and adding new features. If
            you have any suggestions or ideas, we would love to hear your feedback!
          </Typography>
        </Stack>
      </GlassCard>
      <GlassCard className={styles.section}>
        <Stack spacing={3}>
          <SectionTitle title="Meet the team" />
          {heroes.map((hero) => (
            <HeroCard hero={hero} />
          ))}
        </Stack>
      </GlassCard>
    </Container>
  )
}

export default AboutUs
