'use client'
import React from 'react'
import { Trans } from '@lingui/macro'
import { motion } from 'framer-motion'
import { FaLock, FaImage, FaMagic, FaDownload } from 'react-icons/fa'

const features = [
  {
    icon: <FaImage className="w-8 h-8 text-primary" />,
    title: <Trans>Flexible Text Positioning</Trans>,
    description: <Trans>Place text layers precisely where you want them behind your images. Adjust position, rotation, and alignment with ease.</Trans>
  },
  {
    icon: <FaMagic className="w-8 h-8 text-primary" />,
    title: <Trans>Rich Text Customization</Trans>,
    description: <Trans>Customize your text with various fonts, sizes, colors, and styles. Create perfect text-image compositions for your needs.</Trans>
  },
  {
    icon: <FaLock className="w-8 h-8 text-primary" />,
    title: <Trans>Non-Destructive Editing</Trans>,
    description: <Trans>Add text layers while preserving your original image quality. Make adjustments anytime without affecting the image.</Trans>
  },
  {
    icon: <FaDownload className="w-8 h-8 text-primary" />,
    title: <Trans>Easy Export</Trans>,
    description: <Trans>Download your completed image with text layers in multiple formats. Perfect for digital and print use.</Trans>
  }
]

export function Features() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            <Trans>Key Features</Trans>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            <Trans>
              Discover why thousands of users choose our Text Behind Image tool
              for their creative and security needs.
            </Trans>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
