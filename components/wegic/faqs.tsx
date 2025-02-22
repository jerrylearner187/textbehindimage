'use client'
import { Trans } from '@lingui/macro'
import { motion } from 'framer-motion'
import { useState } from 'react'

const faqs = [
  {
    question: <Trans>What is Text Behind Image technology?</Trans>,
    answer: <Trans>Text Behind Image is a tool that allows you to add customizable text layers behind your images. You can adjust the text's font, size, color, position, and rotation to create perfect compositions while maintaining the original image quality.</Trans>
  },
  {
    question: <Trans>How can I customize the text layer?</Trans>,
    answer: <Trans>You have complete control over your text layers. You can change the font family, size, color, position, rotation angle, and alignment. All changes are made in real-time with instant preview.</Trans>
  },
  {
    question: <Trans>What image formats are supported?</Trans>,
    answer: <Trans>Our tool supports all major image formats including JPG, PNG, and WebP. You can import and export in your preferred format while maintaining the text layer properties.</Trans>
  },
  {
    question: <Trans>Can I edit the text layer after saving?</Trans>,
    answer: <Trans>Yes, you can always re-edit your text layers by uploading the original project file. This allows you to make adjustments to text properties whenever needed.</Trans>
  },
  {
    question: <Trans>Is this suitable for both digital and print use?</Trans>,
    answer: <Trans>Absolutely! The text layers are rendered at high quality, making them suitable for both digital display and print materials. You can adjust text properties to ensure optimal visibility in your intended medium.</Trans>
  }
]

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            <Trans>Frequently Asked Questions</Trans>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            <Trans>
              Find answers to common questions about our Text Behind Image tool
              and how it can help you.
            </Trans>
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <span className="text-primary">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </div>
                {openIndex === index && (
                  <p className="mt-4 text-gray-500">{faq.answer}</p>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}