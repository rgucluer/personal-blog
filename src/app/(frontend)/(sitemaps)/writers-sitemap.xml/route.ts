import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getWritersSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'writers',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 100,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((writer) => Boolean(writer?.slug))
          .map((writer) => ({
            loc: `${SITE_URL}/writers/${writer?.slug}`,
            lastmod: writer.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['writers-sitemap'],
  {
    tags: ['writers-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getWritersSitemap()

  return getServerSideSitemap(sitemap)
}
