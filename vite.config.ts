import { defineConfig } from 'vite'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: "multi-select-example",
  plugins: [
    react(),
    eslintPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/bonds.json',
          dest: './'
        }
      ]
    })
  ],
})
