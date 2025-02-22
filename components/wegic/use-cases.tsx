'use client'
import { Trans } from '@lingui/macro'
import { motion } from 'framer-motion'
import { FaPalette, FaImage, FaBookOpen, FaBrush } from 'react-icons/fa'

const cases = [
  {
    icon: <FaPalette className="w-12 h-12 text-primary" />,
    title: <Trans>Creative Design</Trans>,
    description: <Trans>Add customizable text layers beneath your images. Perfect for designers who want to create unique visual compositions with text and image combinations.</Trans>
  },
  {
    icon: <FaImage className="w-12 h-12 text-primary" />,
    title: <Trans>Image Attribution</Trans>,
    description: <Trans>Easily add credits, copyright information, or descriptions beneath your images. Customize text style, position, and rotation to match your design needs.</Trans>
  },
  {
    icon: <FaBookOpen className="w-12 h-12 text-primary" />,
    title: <Trans>Educational Materials</Trans>,
    description: <Trans>Create engaging visual materials with explanatory text beneath images. Ideal for textbooks, presentations, and educational content.</Trans>
  },
  {
    icon: <FaBrush className="w-12 h-12 text-primary" />,
    title: <Trans>Artistic Typography</Trans>,
    description: <Trans>Experiment with text placement and styling beneath images to create unique artistic compositions. Control font, size, color, and positioning for perfect results.</Trans>
  }
]

export function UseCases() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            <Trans>Use Cases</Trans>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            <Trans>
              Explore how Text Behind Image can enhance your visual content
              by adding customizable text layers beneath your images.
            </Trans>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-8 rounded-lg hover:shadow-md transition-all"
            >
              <div className="mb-4">{useCase.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-500">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
