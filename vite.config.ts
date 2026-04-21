import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const itemStatusPlugin = () => ({
  name: 'item-status-plugin',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (req.url === '/api/save-status' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const dataPath = path.resolve(process.cwd(), 'src/data/item_status.json');
            const data = JSON.parse(body);
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
        return;
      }
      
      if (req.url === '/api/status' && req.method === 'GET') {
        try {
            const dataPath = path.resolve(process.cwd(), 'src/data/item_status.json');
            if (fs.existsSync(dataPath)) {
              res.setHeader('Content-Type', 'application/json');
              res.end(fs.readFileSync(dataPath));
            } else {
              res.end('{}');
            }
        } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
        }
        return;
      }
      next();
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), itemStatusPlugin()],
  base: '/frosthaven-items/',
})