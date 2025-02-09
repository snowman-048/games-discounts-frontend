import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Stack, Typography } from '@mui/material'

import { HeroCard } from '@/components/hero-card'
import { THero } from '@/components/hero-card/hero-card'
import { SectionTitle } from '@/components/section-title'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Container } from '@/components/ui/container'

import styles from './styles.module.scss'

const heroes: THero[] = [
  {
    coverImageUrl: '/assets/images/1694426860488.jpeg',
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
  {
    coverImageUrl: '/assets/images/1666104941508.jpeg',
    title: 'Vlad Gayduk',
    about: ` Мы создали этот сервис, чтобы помочь геймерам находить лучшие скидки на игры из разных
            магазинов. Наш сайт агрегирует данные с платформ, таких как PlayStation Store, Nintendo
            eShop, Xbox и других, предоставляя удобный способ сравнения цен, отслеживания скидок и
            анализа ценовой истории.`,
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
]

const AboutUs = async () => {
  return (
    <Container gap={5} paddingBottom={5}>
      <GlassCard className={styles.section}>
        <Stack>
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
            <br /> <br />
            Our project is supported by advertisements, which help us maintain the website and add
            new features. If you enjoy our service, we would appreciate it if you disable your ad
            blocker – this allows us to grow and continue providing up-to-date discount data.
            <br /> <br />
            Our team is constantly working on improving functionality and adding new features. If
            you have any suggestions or ideas, we would love to hear your feedback!
          </Typography>
        </Stack>
      </GlassCard>
      <GlassCard className={styles.section}>
        <Stack spacing={5}>
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
