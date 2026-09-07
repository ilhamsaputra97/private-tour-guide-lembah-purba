import { Font } from '@react-pdf/renderer'

Font.register({
  family: 'Fraunces',
  fonts: [
    { src: '/fonts/Fraunces-SemiBold.ttf', fontWeight: 600 },
  ],
})

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Inter-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Inter-SemiBold.ttf', fontWeight: 600 },
  ],
})

Font.register({
  family: 'IBM Plex Mono',
  fonts: [
    { src: '/fonts/IBMPlexMono-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/IBMPlexMono-Bold.ttf', fontWeight: 700 },
  ],
})
