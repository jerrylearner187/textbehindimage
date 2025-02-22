import React from 'react'
import { activateLocale, AVAILABLE_LOCALES } from '@/framework/locale/locale'
import { Features } from '@/components/wegic/features'
import { Tips } from '@/components/wegic/tips'
import { UseCases } from '@/components/wegic/use-cases'
import { FAQs } from '@/components/wegic/faqs'
import Gallery  from '@/components/wegic/gallery'
import Hero from '@/components/wegic/hero'

export default async function Home({params,}: {
  params?: { lang: AVAILABLE_LOCALES }
}) {
  await activateLocale(params?.lang || AVAILABLE_LOCALES.en);
  return (
    <div className="min-h-screen">
      <Hero params={params!} />
      <Gallery />
      <Features />
      <Tips />
      <UseCases />
      <FAQs />
      {/*<Divider className="bg-gray" />*/}
      {/*  <Pricing />*/}
      {/* <Blogs params={{ lang: params!.lang }} blogs={newBlogs} /> */}
      {/*  <IndexUploader params={params!}/>*/}
    </div>
  )
}