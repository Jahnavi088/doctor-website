// Captures turntable frames from tools/sprites/index.html (served by `npm run dev`)
// and writes one horizontal sprite sheet per expertise item to public/images/expertise/.
// usage: node tools/sprites/render-sprites.mjs [baseUrl]   (needs: npm i -D playwright-core, python + Pillow)
import { createRequire } from 'module'
import { mkdirSync, writeFileSync } from 'fs'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright-core')
const here = path.dirname(fileURLToPath(import.meta.url))
const base = process.argv[2] ?? 'http://localhost:5173'
const FRAMES = 24
const items = ['replacement', 'arthroscopy', 'robotic', 'trauma']
const tmp = path.join(here, '.frames')
mkdirSync(tmp, { recursive: true })

const browser = await chromium.launch({ channel: 'msedge', args: ['--use-angle=d3d11', '--ignore-gpu-blocklist'] })
const page = await browser.newPage({ viewport: { width: 480, height: 480 } })
for (const item of items) {
  await page.goto(`${base}/tools/sprites/index.html?item=${item}`)
  await page.waitForFunction(() => window.ready === true, null, { timeout: 30000 })
  for (let i = 0; i < FRAMES; i++) {
    const url = await page.evaluate(([i, n]) => window.renderFrame(i, n), [i, FRAMES])
    writeFileSync(path.join(tmp, `${item}-${String(i).padStart(2, '0')}.png`), Buffer.from(url.split(',')[1], 'base64'))
  }
  console.log('rendered', item)
}
await browser.close()
execFileSync('python', [path.join(here, 'sheet.py'), tmp, path.join(here, '../../public/images/expertise'), String(FRAMES)], { stdio: 'inherit' })
