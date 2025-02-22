'use client'
import React from 'react'
import GalleryItem from '@/components/wegic/gallery-item'
import {t} from '@lingui/macro'

export default function Gallery() {

  const data: { name: string, images: string[], height: number }[] = [
    {
      name: 'Riding',
      images: [
        'https://img.text-behind-image.net/riding-before.jpg',
        'https://img.text-behind-image.net/riding-after.png'
      ],
      height: 200
    },
    // {
    //     name: 'Characters',
    //     images: [
    //       'https://public-image.fafafa.ai/fa-image/2024/06/0f2cda07684b4eaa3cddde2845983502.jpg',
    //       'https://public-image.fafafa.ai/fa-image/2024/06/995adacd2006539edbe3359c8b5b1581.png'
    //     ],
    //     height: 100
    //   },
    //   {
    //     name: 'Scenery',
    //     images: [
    //       'https://public-image.fafafa.ai/fa-image/2024/06/1d0dd4e6b2f4eaddc368330f51064657.jpg',
    //       'https://public-image.fafafa.ai/fa-image/2024/06/098c96d00543c747402132144e298732.png'
    //     ],
    //     height: 100
    //   }
  ]


  return (
    <section className="bg-white dark:bg-slate-800 pt-10">
      <div>
        <div className="max-w-7xl mx-auto py-10 px-4">
          <div className="max-w-lg mx-auto text-center lg:max-w-none lg:mx-0">
            <h2 className="TITLE-PRIMARY text-5xl font-semibold text-secondary">
              <div className="_editable_jwu41_1 undefined"
                   data-link="link=&amp;target=_blank&amp;text=Text%20Behind%20Image%20Gallery">{t`Text Behind Image Gallery`}
              </div>
            </h2>
            <p className="DESC text-xl text-gray-500 mt-4">
                {t`Drag the slider to see the effects before and after adding text behind image`}
              </p>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-16 flex justify-center">
            <GalleryItem data={data} />
          </div>
        </div>
      </div>
    </section>
  )
}