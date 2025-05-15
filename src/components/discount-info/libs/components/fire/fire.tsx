import styles from './fire.module.scss'

type FireProps = {
  children: React.ReactNode
}

const PARTICLE_NUMBER = 50

const Fire = ({ children }: FireProps) => {
  return (
    <div className={styles.fireWrapper}>
      <div className={styles.fireContent}>{children}</div>
      {[...Array(PARTICLE_NUMBER)].map((_, i) => (
        <div key={i} className={styles.particle}></div>
      ))}
    </div>
  )
}

export { Fire }
