import { Font } from '@react-pdf/renderer'
import path from 'path'

// Pada Next.js API Routes (Node.js), file sistem membutuhkan absolute path
const fontDir = path.join(process.cwd(), 'public', 'fonts')

  Font.register({
    family: 'Fraunces',
    src: path.join(fontDir, 'Fraunces-SemiBold.ttf'),
    fontWeight: 600,
  })

  Font.register({
    family: 'Inter',
    fonts: [
      { src: path.join(fontDir, 'Inter-Regular.ttf'), fontWeight: 400 },
      { src: path.join(fontDir, 'Inter-Medium.ttf'), fontWeight: 500 },
      { src: path.join(fontDir, 'Inter-SemiBold.ttf'), fontWeight: 600 },
    ],
  })

  // Dihapus karena IBM Plex Mono memicu error DataView pada react-pdf
