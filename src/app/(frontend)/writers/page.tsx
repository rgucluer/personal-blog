import type { Metadata } from 'next/types'

import { WritersList } from '@/components/WritersList'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const writers = await payload.find({
    collection: 'writers',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      name: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invent max-w-none">
          <h1>Writers</h1>
        </div>
      </div>

      <WritersList writers={writers.docs} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog Writers`,
  }
}
