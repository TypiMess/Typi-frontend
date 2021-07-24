import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import fs from 'fs'

const sslPath = "/home/tom/ssl_keys/";

const httpsAvailable = fs.existsSync(sslPath + 'privkey.pem') && fs.existsSync(sslPath + 'cert.pem') && fs.existsSync(sslPath + 'chain.pem');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    host: "0.0.0.0",
    port: 2053,
    https: httpsAvailable ? {
      key: fs.readFileSync(sslPath + 'privkey.pem'),
      cert: fs.readFileSync(sslPath + 'cert.pem'),
      ca: fs.readFileSync(sslPath + 'chain.pem'),
    } : false
  }
})
