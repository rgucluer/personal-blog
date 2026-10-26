import type { CollectionAfterReadHook } from 'payload'
import { User } from 'src/payload-types'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the users manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedUsers` field to populate the user data, hidden from the admin UI
export const populateUsers: CollectionAfterReadHook = async ({ doc, req, req: { payload } }) => {
  if (doc?.users && doc.users?.length > 0) {
    const userDocs: User[] = []

    for (const user of doc.users) {
      try {
        const userDoc = await payload.findByID({
          id: typeof user === 'object' ? user?.id : user,
          collection: 'users',
          depth: 0,
        })

        if (userDoc) {
          userDocs.push(userDoc)
        }

        if (userDocs.length > 0) {
          doc.populatedUsers = userDocs.map((userDoc) => ({
            id: userDoc.id,
            name: userDoc.name,
          }))
        }
      } catch {
        // swallow error
        // TODO: Properly handle this
      }
    }
  }

  return doc
}
