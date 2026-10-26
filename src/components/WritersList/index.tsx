import { cn } from '@/utilities/ui'
import React from 'react'

import { WriterCard, CardWriterData } from '@/components/WriterCard'

export type Props = {
  writers: CardWriterData[]
}

export const WritersList: React.FC<Props> = (props) => {
  const { writers } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {writers?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <WriterCard className="h-full" doc={result} relationTo="writers" showCategories />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
