'use client'
import { Tab, Tabs } from '@nextui-org/react'
import React, { memo } from 'react'
import BeforeAfterSlider from '@/components/before-after'
import { motion } from 'framer-motion'

export type GalleryItemData = {
  name: string,
  images: string[],
  height: number
}
const GalleryItem = memo(({ data }: { data: GalleryItemData[] }) => {

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        {
          data.map(({ name, images: [before, after], height }, index) => (
              <BeforeAfterSlider key={index}
                                  firstImage={{imageUrl:before,alt:`${name} before text behind image`}}
                                  secondImage={{imageUrl:after,alt:`${name} after text behind image`}}
              />
          ))
        }
        </div>
    )
})
GalleryItem.displayName = 'GalleryItem'
export default GalleryItem