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
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
