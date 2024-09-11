import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    include: ['@mui/icons-material','@emotion/styled', '@mui/material/Unstable_Grid2']
  }
})
