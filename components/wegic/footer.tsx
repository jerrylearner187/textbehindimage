     1|'use client'
     2|import Link from 'next/link'
     3|import I18nLink from '@/framework/locale/i18n-link'
     4|import React from 'react'
     5|import { AVAILABLE_LOCALES } from '@/framework/locale/locale'
     6|import { t } from '@lingui/macro'
     7|import { siteConfig, tdkConfig } from '@/config/site'
     8|import { i18n } from '@lingui/core'
     9|import { FaGithub, FaXTwitter, FaYoutube } from 'react-icons/fa6'
    10|
    11|const getNavigation = () => {
    12|  return [
    13|    { name: t`Home`, href: '/' },
    14|    { name: t`Pricing`, href: '/pricing' },
    15|    { name: t`Blogs`, href: '/blogs' },
    16|    /* { name: t`Explore`, href: '/user-case' }*/
    17|  ]
    18|}
    19|
    20|const Footer = ({ params }: { params?: { lang: AVAILABLE_LOCALES } }) => (
    21|  <>
    22|      <footer className="md:pt-22 pt-10 mt-8 bg-white/90 px-4 md:px-0">
    23|        <div className="text-gray-500 w-full max-w-7xl mx-auto  items-center gap-16 md:grid-cols-2 md:gap-24">
    24|        <div className="flex flex-wrap gap-y-10 items-center justify-between">
    25|          <div className="space-y-4">
    26|            <h2 className="text-gray-300 text-lg font-semibold sm:text-2xl">
    27|              {i18n._(tdkConfig.title)}
    28|            </h2>
    29|            {/*<p className="max-2xl">*/}
    30|            {/*  {t`Create Awesome Chromakopia Avatar`}*/}
    31|            {/*</p>*/}
    32|            <div className="pt-2 flex items-center gap-x-6 text-gray-400">
    33|            <a href="https://startupfa.me/s/text-behind-image-2?utm_source=text-behind-image.net" target="_blank"><img src="https://startupfa.me/badges/featured-badge-small.webp" alt="Featured on Startup Fame" width="224" height="36" /></a>
    34|            <a href="https://www.producthunt.com/posts/text-behind-image-4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-text&#0045;behind&#0045;image&#0045;4" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=959613&theme=light&t=1746019639746" alt="Text&#0032;Behind&#0032;Image - Add&#0032;hidden&#0032;text&#0032;to&#0032;your&#0032;images&#0032;&#0124;&#0032;text&#0032;behind&#0032;image | Product Hunt" style={{ width: "250px", height: "54px" }} width="250" height="54" /></a>
    35|              {/* <a href="https://x.com/golforbit" target="_blank" aria-label="Social media">
    36|                <FaXTwitter />
    37|              </a>
    38|              <a href="https://www.youtube.com/@GolfOrbit-z8w" target="_blank" aria-label="Social media">
    39|                <FaYoutube />
    40|              </a>
    41|              <a href="https://github.com/golforbitsupport" target="_blank" aria-label="Social media">
    42|                <FaGithub />
    43|              </a> */}
    44|              {/*<a href="/" target="_blank" aria-label="Social media">
    45|              <svg
    46|                className="w-6 h-6 hover:text-gray-500 duration-150"
    47|                fill="none"
    48|                viewBox="0 0 28 28"
    49|              >
    50|                <g clipPath="url(#clip0_1274_2978)">
    51|                  <path
    52|                    fill="currentColor"
    53|                    d="M25.927 0H2.067C.924 0 0 .902 0 2.018v23.959C0 27.092.924 28 2.067 28h23.86C27.07 28 28 27.092 28 25.982V2.018C28 .902 27.07 0 25.927 0zM8.307 23.86H4.151V10.495h4.156V23.86zM6.229 8.673a2.407 2.407 0 110-4.812 2.406 2.406 0 010 4.812zM23.86 23.86h-4.15v-6.497c0-1.547-.028-3.543-2.16-3.543-2.16 0-2.49 1.69-2.49 3.434v6.606h-4.144V10.495h3.98v1.826h.056c.552-1.05 1.908-2.16 3.926-2.16 4.206 0 4.982 2.767 4.982 6.366v7.333z"
    54|                  />
    55|                </g>
    56|                <defs>
    57|                  <clipPath id="clip0_1274_2978">
    58|                    <path fill="#fff" d="M0 0h28v28H0z" />
    59|                  </clipPath>
    60|                </defs>
    61|              </svg>
    62|            </a>*/}
    63|            </div>
    64|          </div>
    65|        </div>
    66|        <div></div>
    67|        <div className="mt-8">
    68|          <I18nLink params={params} />
    69|        </div>
    70|        <div className="mt-2 py-10 border-t flex-row-reverse items-center justify-between sm:flex">
    71|          <div className="flex justify-center items-center">
    72|              <a href={`${params?.lang !== 'en' ? `/${params?.lang}` : ''}/about/privacy-policy`} className="mr-5">{t`Privacy policy`}</a>
    73|              <a href={`${params?.lang !== 'en' ? `/${params?.lang}` : ''}/about/terms-of-service`}>{t`Terms of service`}</a>
    74|          </div>
    75|          <ul className="flex flex-wrap items-center gap-4 sm:text-sm">
    76|            {/*{getNavigation().map((item, idx) => (*/}
    77|            {/*  <li*/}
    78|            {/*    key={idx}*/}
    79|            {/*    className="font-medium text-gray-500 hover:text-primary-200 duration-150"*/}
    80|            {/*  >*/}
    81|            {/*    <Link href={`/${params?.lang}${item.href}`}>{item.name}</Link>*/}
    82|            {/*  </li>*/}
    83|            {/*))}*/}
    84|            <li>
    85|                <a
    86|                  href="https://crazycattle3dgame.net"
    87|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
    88|                  title="Crazy Cattle 3D"
    89|                >
    90|                  Crazy Cattle 3D
    91|                </a>
    92|              </li>
    93|                        <li>
    94|                <a
    95|                  href="https://ai-doll-generator.net"
    96|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
    97|                  title="AI Doll Generator"
    98|                >
    99|                  AI Doll Generator
   100|                </a>
   101|              </li>
   102|            <li>
   103|                <a
   104|                  href="https://brainrotwords.net"
   105|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   106|                  title="Brainrot Words"
   107|                >
   108|                  Brainrot Words
   109|                </a>
   110|              </li>
   111|            <li>
   112|                <a
   113|                  href="https://duck-duck-clicker.com"
   114|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   115|                  title="Duck Duck Clicker"
   116|                >
   117|                  Duck Duck Clicker
   118|                </a>
   119|              </li>
   120|            <li>
   121|                <a
   122|                  href="https://brickrodfisch.com"
   123|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   124|                  title="Brick Rod Fisch"
   125|                >
   126|                  Brick Rod Fisch
   127|                </a>
   128|              </li>
   129|            <li>
   130|              <a
   131|                href="https://changehaircolor.net"
   132|                className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   133|                title="Change Hair Color"
   134|              >
   135|                Change Hair Color
   136|              </a>
   137|            </li>
            <li>
                <a
                  href="https://omogle.net"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="Omogle - Free AI Face Rating"
                >
                  Omogle
                </a>
              </li>
   138|          </ul>
   139|          <p className="mt-6 sm:mt-0">
   140|              © {new Date().getFullYear()} {i18n._(siteConfig.name)} All rights reserved.
   141|          </p>
   142|        </div>
   143|      </div>
   144|    </footer>
   145|  </>
   146|)
   147|
   148|export default Footer
   149|
