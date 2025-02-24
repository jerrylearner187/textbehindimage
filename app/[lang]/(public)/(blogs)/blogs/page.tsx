import { activateLocale, AVAILABLE_LOCALES, metadataLanguages } from '@/framework/locale/locale'
import BlogsPageClient from '@/app/[lang]/(public)/(blogs)/blogs/blogs-page-client'
import { siteConfig } from '@/config/site'
import { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'

import { t } from '@lingui/macro'
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
// 获取指定语言的博客文章
function getLocalizedPosts(locale: AVAILABLE_LOCALES) {
  return allPosts.filter(post => post.locale === locale)
}

export async function generateMetadata({
                                         params
                                       }: {
                                         params: { slug: string, lang: AVAILABLE_LOCALES}
                                       }
): Promise<Metadata> {
  await activateLocale(params.lang)
  return {
    title:t`Blogs`+` | ${siteConfig.name}`,
    alternates: {
      languages:metadataLanguages('/blogs')
    },
  }
}

export default async function BlogsPage({
  params,
}: {
  params: { lang: AVAILABLE_LOCALES }
}) {
  await activateLocale(params.lang)
  const blogs = getLocalizedPosts(params.lang || AVAILABLE_LOCALES.en)
  // console.log('blog', blogs)
  return (
    <BlogsPageClient params={params} blogs={blogs} />
  )
}
