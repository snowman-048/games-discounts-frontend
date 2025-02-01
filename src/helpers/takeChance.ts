const takeChance = (percents: number) => {
  return Math.random() <= percents / 100
}

export { takeChance }
