import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//cmd /c "set PATH=C:\Program Files\nodejs;%PATH% && npm run dev"
export default defineConfig({
  plugins: [react()],
  base: '/web-programming-digilocker/',
})
