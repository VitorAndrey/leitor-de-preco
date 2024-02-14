import axios from 'axios'

export async function speak(_, text) {
  const key = 'AIzaSyBTfoVWuEQNb5cukjKVIIZ7gm8JpT7aNrY'
  const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${key}`

  const payload = {
    audioConfig: {
      audioEncoding: 'MP3',
      effectsProfileId: ['small-bluetooth-speaker-class-device'],
      pitch: -3.5,
      speakingRate: 1.05
    },
    input: {
      text
    },
    voice: {
      languageCode: 'pt-BR',
      name: 'pt-BR-Standard-B'
    }
  }

  const { data } = await axios.post(endpoint, payload)
  return data
}
