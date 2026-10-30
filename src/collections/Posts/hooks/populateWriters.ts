import type { CollectionAfterReadHook } from 'payload'
import { Writer } from 'src/payload-types'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the writers manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedWriters` field to populate the user data, hidden from the admin UI
export const populateWriters: CollectionAfterReadHook = async ({ doc, req, req: { payload } }) => {
  if (doc?.writers && doc?.writers?.length > 0) {
    const writerDocs: Writer[] = []

    for (const writer of doc.writers) {
      try {
        const writerDoc = await payload.findByID({
          id: typeof writer === 'object' ? writer?.id : writer,
          collection: 'writers',
          depth: 0,
        })

        if (writerDoc) {
          writerDocs.push(writerDoc)
        }

        if (writerDocs.length > 0) {
          doc.populatedWriters = writerDocs.map((writerDoc) => ({
            id: writerDoc.id,
            name: writerDoc.name,
          }))
        }
      } catch {
        // swallow error
      }
    }
  }

  return doc
}
