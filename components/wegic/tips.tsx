'use client'
import React from 'react'
import { Trans } from '@lingui/macro'
import { motion } from 'framer-motion'
import Image from 'next/image'

const steps = [
  {
    number: "1",
    title: <Trans>Upload Your Image</Trans>,
    description: <Trans>Select or drag and drop any image file. We support all major image formats for your convenience.</Trans>
  },
  {
    number: "2",
    title: <Trans>Add Text Layer</Trans>,
    description: <Trans>Type your text and position it behind the image. Preview how it looks in real-time.</Trans>
  },
  {
    number: "3",
    title: <Trans>Customize Text Properties</Trans>,
    description: <Trans>Adjust font, size, color, position, and rotation to achieve your desired look.</Trans>
  },
  {
    number: "4",
    title: <Trans>Export Your Creation</Trans>,
    description: <Trans>Download your image with the customized text layer in your preferred format.</Trans>
  }
]

export function Tips() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            <Trans>How to Use Text Behind Image</Trans>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            <Trans>
              Follow these simple steps to add hidden text to your images
              in just a few minutes.
            </Trans>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}