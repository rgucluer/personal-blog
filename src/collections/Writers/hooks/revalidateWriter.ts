import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Writer } from '../../../payload-types'

export const revalidateWriter: CollectionAfterChangeHook<Writer> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status == 'published') {
      const path = `/writers/${doc.slug}`

      payload.logger.info(`Revalidating writer at path: ${path}`)

      revalidatePath(path)
      revalidateTag('writers-sitemap', 'max')
    }

    // If the writer was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/writers/${previousDoc.slug}`

      payload.logger.info(`Revalidating old writer at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('writers-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Writer> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/writers/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('writers-sitemap', 'max')
  }

  return doc
}
