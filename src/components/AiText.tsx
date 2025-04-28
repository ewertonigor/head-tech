'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AITextProps {
  prompt: string
}

const DEFAULT_TEXTS = [
  "Conectando criadores a marcas de sucesso",
  "Cresça sua audiência com parcerias estratégicas",
  "Plataforma líder para influenciadores digitais",
  "Monetize seu conteúdo com as melhores marcas",
  "Transforme seu potencial em resultados reais"
]

export function AIText({ prompt }: AITextProps) {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!prompt) {
      setText(DEFAULT_TEXTS[0])
      setIsLoading(false)
      return
    }

    const savedText = typeof window !== 'undefined' 
      ? localStorage.getItem(`aiText-${btoa(prompt)}`) 
      : null

    if (savedText) {
      setText(savedText)
      setIsLoading(false)
      return
    }

    const generateText = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/generate-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            prompt: prompt + " (Responda apenas com o texto solicitado, sem aspas ou formatação adicional)"
          }),
        })

        const data = await response.json()
        if (response.ok && data.text) {
          const processedText = data.text.trim()
          setText(processedText)
          
          if (typeof window !== 'undefined') {
            localStorage.setItem(`aiText-${btoa(prompt)}`, processedText)
          }
        }
      } catch (error) {
        console.error('Falha ao gerar texto:', error)
        setText(DEFAULT_TEXTS[Math.floor(Math.random() * DEFAULT_TEXTS.length)])
      } finally {
        setIsLoading(false)
      }
    }

    generateText()
  }, [prompt])

  return (
    <motion.span 
      className="text-gray-1 not-lg:text-xs block min-h-[20px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading ? (
        <span className="inline-flex gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
      ) : text}
    </motion.span>
  )
}