import React from 'react'
import { activateLocale, AVAILABLE_LOCALES, metadataLanguages } from '@/framework/locale/locale'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { i18n } from '@lingui/core'
import { msg, t } from '@lingui/macro'
import Image from 'next/image'
import Link from 'next/link'
import { FaImage, FaFont, FaPalette, FaDownload, FaLayerGroup, FaMagic } from 'react-icons/fa'
import Editor from '@/components/editor'

// export const runtime = 'edge';
export const dynamic = "force-static";
export const dynamicParams = false;
export async function generateStaticParams() {
  // 构建时生成静态页面
  const allLang = []
  for (const langDir of Object.values(AVAILABLE_LOCALES)) {
    allLang.push({ lang: langDir })
  }
  return allLang
}

export async function generateMetadata({
  params
}: {
  params: { slug: string, lang: AVAILABLE_LOCALES}
}): Promise<Metadata> {
  await activateLocale(params.lang)
  return {
    title: t`Text Behind Image Editor - Add Custom Text Layers to Images` + ` | ` + i18n._(siteConfig.name),
    description: t`Create stunning images with customizable text layers using our Text Behind Image Editor. Adjust font, size, color, position, and rotation. Perfect for photographers, designers, and content creators.`,
    alternates: {
      canonical: params.lang != 'en' ? `${process.env.UE_WEB_API_URL}/${params.lang}/editor` : `${process.env.UE_WEB_API_URL}/editor`,
      languages: metadataLanguages('/editor')
    },
    icons: {
      icon: siteConfig.icon,
    }
  }
}

// Features Section Data
const features = [
  {
    icon: <FaFont className="w-8 h-8 text-primary" />,
    title: msg`Rich Text Editing`,
    description: msg`Customize fonts, sizes, colors, and styles. Perfect typography control for your text layers.`
  },
  {
    icon: <FaLayerGroup className="w-8 h-8 text-primary" />,
    title: msg`Layer Management`,
    description: msg`Add multiple text layers and arrange them with precise positioning and rotation controls.`
  },
  {
    icon: <FaPalette className="w-8 h-8 text-primary" />,
    title: msg`Advanced Styling`,
    description: msg`Apply colors, shadows, and effects to make your text layers stand out perfectly.`
  },
  {
    icon: <FaDownload className="w-8 h-8 text-primary" />,
    title: msg`Easy Export`,
    description: msg`Export your work in multiple formats with high-quality resolution preservation.`
  }
]

// FAQ Data
const faqs = [
  {
    question: msg`What types of images can I edit?`,
    answer: msg`Our editor supports all major image formats including JPG, PNG, and WebP. You can upload images of any size and add customizable text layers to them.`
  },
  {
    question: msg`Can I adjust the text properties after adding them?`,
    answer: msg`Yes, you have full control over text properties including font, size, color, position, and rotation. All changes can be made in real-time with instant preview.`
  },
  {
    question: msg`How do I save my work?`,
    answer: msg`You can export your finished work in various formats. The editor also automatically saves your progress, allowing you to return to your project later.`
  }
]

export default async function Page({
  params
}: {
  params?: { lang: AVAILABLE_LOCALES }
}) {
  await activateLocale(params?.lang || AVAILABLE_LOCALES.en)
  
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12 items-center">
          <div className="animate-fade-in-up">
              <h1 className="text-4xl font-bold text-primary mb-6 text-center">
                {t`Professional Text Behind Image Editor`}
              </h1>
              <p className="text-gray-500 text-xl mb-8">
                {t`
                  Create stunning images with customizable text layers. Add captions, 
                  watermarks, and descriptions with complete control over font, size, 
                  color, and positioning.
                `}
              </p>
              <Editor />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary mb-12 text-center">
            {t`Powerful Features`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
              key={index}
              className={`p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className="mb-4 text-center">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {i18n._(feature.title)}
                </h3>
                <p className="text-gray-500">{i18n._(feature.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary mb-12 text-center">
            {t`Frequently Asked Questions`}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
              key={index}
              className={`p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {i18n._(faq.question)}
                </h3>
                <p className="text-gray-500">{i18n._(faq.answer)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary mb-6">
            {t`Ready to Create?`}
          </h2>
          <p className="text-gray-500 text-xl mb-8 max-w-2xl mx-auto">
            {t`
              Start adding professional text layers to your images today. 
              No technical skills required.
            `}
          </p>
          <Link 
            href={`/${params?.lang || 'en'}/editor`}
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg transition-all"
          >
            {t`Try Text Behind Image Editor Now`}
          </Link>
        </div>
      </section>
    </main>
  )
}