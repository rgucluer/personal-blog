import { Post } from '@/payload-types'

/**
 * Formats an array of populatedWriters from Posts into a prettified string.
 * @param writers - The populatedWriters array from a Post.
 * @returns A prettified string of writers.
 * @example
 *
 * [Writer1, Writer2] becomes 'Writer1 and Writer2'
 * [Writer1, Writer2, Writer3] becomes 'Writer1, Writer2, and Writer3'
 *
 */
export const formatWriters = (
  writers: NonNullable<NonNullable<Post['populatedWriters']>[number]>[],
) => {
  // Ensure we don't have any writers without a name
  const writerNames = writers.map((writer) => writer.name).filter(Boolean)

  if (writerNames.length === 0) return ''
  if (writerNames.length === 1) return writerNames[0]
  if (writerNames.length === 2) return `${writerNames[0]} and ${writerNames[1]}`

  return `${writerNames.slice(0, -1).join(', ')} and ${writerNames[writerNames.length - 1]}`
}
