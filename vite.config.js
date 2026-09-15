import { defineConfig } from 'vite'
import { resolve } from 'path'

const city = (slug) => resolve(__dirname, `garage-cleanout-${slug}.html`)

export default defineConfig({
  server: { port: 3100 },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        realtors: resolve(__dirname, 'realtors.html'),
        estate: resolve(__dirname, 'estate-cleanouts-orlando.html'),
        // City landing pages
        winterPark: city('winter-park'),
        windermere: city('windermere'),
        drPhillips: city('dr-phillips'),
        lakeNona: city('lake-nona'),
        baldwinPark: city('baldwin-park'),
        lakeMary: city('lake-mary'),
        maitland: city('maitland'),
        winterGarden: city('winter-garden'),
        collegePark: city('college-park'),
        thorntonPark: city('thornton-park'),
        celebration: city('celebration'),
        heathrow: city('heathrow'),
        altamonteSprings: city('altamonte-springs'),
        oviedo: city('oviedo'),
        apopka: city('apopka'),
        kissimmee: city('kissimmee'),
        // Guides
        guideCost: resolve(__dirname, 'garage-cleanout-cost-orlando.html'),
        guideVsJunk: resolve(__dirname, 'garage-cleanout-vs-junk-removal.html'),
        guideEstatePrep: resolve(__dirname, 'how-to-prepare-estate-garage-cleanout.html'),
      }
    }
  }
})
