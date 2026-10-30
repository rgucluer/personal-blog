import { Writer } from '@/payload-types'

/**
 * Formats an array of populatedUsers from Writers into a prettified string.
 * @param users - The populatedUsers array from a Writer.
 * @returns A prettified string of users.
 * @example
 *
 * [User1, User2] becomes 'User1 and User2'
 * [User1, User2, User3] becomes 'User1, User2, and User3'
 *
 */
export const formatUsers = (
  users: NonNullable<NonNullable<Writer['populatedUsers']>[number]>[],
) => {
  // Ensure we don't have any writers without a name
  const userNames = users.map((user) => user.name).filter(Boolean)

  if (userNames.length === 0) return ''
  if (userNames.length === 1) return userNames[0]
  if (userNames.length === 2) return `${userNames[0]} and ${userNames[1]}`

  return `${userNames.slice(0, -1).join(', ')} and ${userNames[userNames.length - 1]}`
}
