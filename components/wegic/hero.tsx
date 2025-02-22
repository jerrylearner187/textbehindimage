'use client'
import React, { useRef } from 'react'
import { t, Trans } from '@lingui/macro'
import { AVAILABLE_LOCALES } from '@/framework/locale/locale'
import { heroConfig } from '@/config/site'
import { i18n } from '@lingui/core'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero({params,}: {
  params: { lang: AVAILABLE_LOCALES }
}) {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-primary mb-6">
            <Trans>Add Customizable Text Layer Behind Your Images</Trans>
          </h1>
          <p className="text-gray-500 text-xl mb-8 max-w-2xl mx-auto">
            <Trans>
              Enhance your images with underlying text layers. Customize font, size, color, 
              position, and rotation to create perfect image-text compositions.
            </Trans>
          </p>
          <Link 
            href={`/${params?.lang || 'en'}/editor`}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg transition-all"
          >
            <Trans>Start Creating Now</Trans>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}