import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import router from "../../src/index";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), router()],
})
