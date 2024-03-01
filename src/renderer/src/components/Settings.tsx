import { createHashRouter, RouterProvider, Link } from 'react-router-dom'
import { CreateProduct } from './CreateProduct'
import { useEffect, useState } from 'react'

const router = createHashRouter([
  {
    path: '/',
    element: (
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <Link to="create-product">Criar Produto</Link>
        <Link to="speek-test">Speek test</Link>
      </div>
    )
  },
  {
    path: 'create-product',
    element: (
      <div>
        <CreateProduct />

        <Link to="/" className="absolute top-3 right-3">
          Voltar
        </Link>
      </div>
    )
  },
  {
    path: 'speek-test',
    element: <SpeekTest />
  }
])

export function Settings() {
  return <RouterProvider router={router} />
}

let speechRecognition: SpeechRecognition | null

function SpeekTest() {
  const [isRecording, setIsRecording] = useState(false)
  const [recording, setRecording] = useState('')

  function handleStartRecording() {
    setIsRecording(true)
    setRecording('')

    const isSpeechRecognitionAPIAvaliable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    console.log(isSpeechRecognitionAPIAvaliable)
    console.log(window.api.getEnv('GOOGLE_API_KEY'))

    if (!isSpeechRecognitionAPIAvaliable) {
      alert('Infelizmente seu navegador não suporta a API de gravação.')
      return
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setRecording(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  useEffect(() => handleStartRecording(), [])

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <span>{isRecording ? <p className="pulse">Recording...</p> : <p>Erro</p>}</span>
      <span>{recording}</span>

      <Link to="/" className="absolute top-3 right-3">
        Voltar
      </Link>
    </div>
  )
}
