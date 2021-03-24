/**
 * Get keys from an enum
 * @param e the enum to convert
 */
export function keys(e: any): string[] {
  const keys: string[] = []
  for (let key in e) {
    if (isNaN(Number(key))) {
      const val = e[key] as string | number

      if (val !== undefined && val !== null) {
        keys.push(key)
      }
    }
  }

  return keys
}
