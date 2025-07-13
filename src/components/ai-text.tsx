'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AITextProps {
  prompt: string
}

const DEFAULT_TEXTS = [
  'Conectando criadores a marcas de sucesso',
  'Cresça sua audiência com parcerias estratégicas',
  'Plataforma líder para influenciadores digitais',
  'Monetize seu conteúdo com as melhores marcas',
  'Transforme seu potencial em resultados reais',
]

const getRandomDefaultText = () => {
  return DEFAULT_TEXTS[Math.floor(Math.random() * DEFAULT_TEXTS.length)]
}

export function AIText({ prompt }: AITextProps) {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!prompt) {
      setText(getRandomDefaultText())
      setIsLoading(false)
      return
    }

    const generateText = async () => {
      setIsLoading(true)

      const cacheKey = `aiText-${btoa(prompt)}`
      const savedText =
        typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null

      if (savedText) {
        setText(savedText)
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch('/api/generate-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        })

        if (!response.ok) {
          throw new Error(`A requisição falhou com status: ${response.status}`)
        }

        const data = await response.json()

        if (data.text) {
          const processedText = data.text.trim().replace(/^"|"$/g, '')
          setText(processedText)
          if (typeof window !== 'undefined') {
            localStorage.setItem(cacheKey, processedText)
          }
        } else {
          throw new Error('A API não retornou um texto válido.')
        }
      } catch (error) {
        console.error('Falha ao gerar texto via IA:', error)
        setText(getRandomDefaultText())
      } finally {
        setIsLoading(false)
      }
    }

    generateText()
  }, [prompt])

  return (
    <motion.span
      className="text-gray-1 not-lg:text-xs block min-h-[20px]"
      key={text}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading ? (
        <span className="inline-flex gap-1">
          <span
            className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </span>
      ) : (
        text
      )}
    </motion.span>
  )
}
