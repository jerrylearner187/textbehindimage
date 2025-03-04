'use client'
import Link from 'next/link'
import I18nLink from '@/framework/locale/i18n-link'
import React from 'react'
import { AVAILABLE_LOCALES } from '@/framework/locale/locale'
import { t } from '@lingui/macro'
import { siteConfig, tdkConfig } from '@/config/site'
import { i18n } from '@lingui/core'
import { FaGithub, FaXTwitter, FaYoutube } from 'react-icons/fa6'

const getNavigation = () => {
  return [
    { name: t`Home`, href: '/' },
    { name: t`Pricing`, href: '/pricing' },
    { name: t`Blogs`, href: '/blogs' },
    /* { name: t`Explore`, href: '/user-case' }*/
  ]
}

const Footer = ({ params }: { params?: { lang: AVAILABLE_LOCALES } }) => (
  <>
      <footer className="md:pt-22 pt-10 mt-8 bg-white/90 px-4 md:px-0">
        <div className="text-gray-500 w-full max-w-7xl mx-auto  items-center gap-16 md:grid-cols-2 md:gap-24">
        <div className="flex flex-wrap gap-y-10 items-center justify-between">
          <div className="space-y-4">
            <h2 className="text-gray-300 text-lg font-semibold sm:text-2xl">
              {i18n._(tdkConfig.title)}
            </h2>
            {/*<p className="max-2xl">*/}
            {/*  {t`Create Awesome Chromakopia Avatar`}*/}
            {/*</p>*/}
            <div className="pt-2 flex items-center gap-x-6 text-gray-400">
              {/* <a href="https://x.com/golforbit" target="_blank" aria-label="Social media">
                <FaXTwitter />
              </a>
              <a href="https://www.youtube.com/@GolfOrbit-z8w" target="_blank" aria-label="Social media">
                <FaYoutube />
              </a>
              <a href="https://github.com/golforbitsupport" target="_blank" aria-label="Social media">
                <FaGithub />
              </a> */}
              {/*<a href="/" target="_blank" aria-label="Social media">
              <svg
                className="w-6 h-6 hover:text-gray-500 duration-150"
                fill="none"
                viewBox="0 0 28 28"
              >
                <g clipPath="url(#clip0_1274_2978)">
                  <path
                    fill="currentColor"
                    d="M25.927 0H2.067C.924 0 0 .902 0 2.018v23.959C0 27.092.924 28 2.067 28h23.86C27.07 28 28 27.092 28 25.982V2.018C28 .902 27.07 0 25.927 0zM8.307 23.86H4.151V10.495h4.156V23.86zM6.229 8.673a2.407 2.407 0 110-4.812 2.406 2.406 0 010 4.812zM23.86 23.86h-4.15v-6.497c0-1.547-.028-3.543-2.16-3.543-2.16 0-2.49 1.69-2.49 3.434v6.606h-4.144V10.495h3.98v1.826h.056c.552-1.05 1.908-2.16 3.926-2.16 4.206 0 4.982 2.767 4.982 6.366v7.333z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1274_2978">
                    <path fill="#fff" d="M0 0h28v28H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>*/}
            </div>
          </div>
        </div>
        <div></div>
        <div className="mt-8">
          <I18nLink params={params} />
        </div>
        <div className="mt-2 py-10 border-t flex-row-reverse items-center justify-between sm:flex">
          <div className="flex justify-center items-center">
              <a href={`${params?.lang !== 'en' ? `/${params?.lang}` : ''}/about/privacy-policy`} className="mr-5">{t`Privacy policy`}</a>
              <a href={`${params?.lang !== 'en' ? `/${params?.lang}` : ''}/about/terms-of-service`}>{t`Terms of service`}</a>
          </div>
          <ul className="flex flex-wrap items-center gap-4 sm:text-sm">
            {/*{getNavigation().map((item, idx) => (*/}
            {/*  <li*/}
            {/*    key={idx}*/}
            {/*    className="font-medium text-gray-500 hover:text-primary-200 duration-150"*/}
            {/*  >*/}
            {/*    <Link href={`/${params?.lang}${item.href}`}>{item.name}</Link>*/}
            {/*  </li>*/}
            {/*))}*/}
            <li>
              <a
                href="https://changehaircolor.net"
                className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                title="Change Hair Color"
              >
                Change Hair Color
              </a>
            </li>
          </ul>
          <p className="mt-6 sm:mt-0">
              © {new Date().getFullYear()} {i18n._(siteConfig.name)} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </>
)

export default Footer
