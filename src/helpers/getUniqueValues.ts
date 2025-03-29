const getUniqueValues = <T>(arr: T[]) => [...new Set(arr)]

const getUniqueValuesFromArrays = <T>(arr: (T[] | undefined)[]): T[] =>
  getUniqueValues(
    arr.reduce((acc: T[], item) => {
      if (item && Array.isArray(item)) {
        acc.push(...(item.filter(Boolean) as T[]))
      }
      return acc
    }, [] as T[]),
  )

export { getUniqueValues, getUniqueValuesFromArrays }
