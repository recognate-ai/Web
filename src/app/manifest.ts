import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ReCognate - AI & IoT Product Development',
    short_name: 'ReCognate',
    description: 'Transforming creative ideas into intelligent, connected, scalable technology solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0f1d',
    theme_color: '#183efa',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo.png',
        sizes: '1024x1024',
        type: 'image/png',
      },
    ],
  }
}
