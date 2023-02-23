import { Options } from './types'
import { cloneNode } from './clone-node'
import { embedImages } from './embed-images'
import { applyStyle } from './apply-style'
import { embedWebFonts, getWebFontCSS } from './embed-webfonts'
import {
  getImageSize,
  getPixelRatio,
  createImage,
  canvasToBlob,
  nodeToDataURL,
  checkCanvasDimensions,
} from './util'

export async function toSvg<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<string> {
  console.log('[toSvg]')
  const { width, height } = getImageSize(node, options)
  console.log({ width, height })
  console.log('cloning')
  const clonedNode = (await cloneNode(node, options, true)) as HTMLElement
  console.log('cloned')
  console.log('embedding web fonts')
  await embedWebFonts(clonedNode, options)
  console.log('embedded web fonts')
  console.log('embedding images')
  await embedImages(clonedNode, options)
  console.log('embedded images')
  console.log('applying style')
  applyStyle(clonedNode, options)
  console.log('applied style')
  console.log('node to data url...')
  const datauri = await nodeToDataURL(clonedNode, width, height)
  console.log('datauri: ', datauri)
  return datauri
}

export async function toCanvas<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<HTMLCanvasElement> {
  const { width, height } = getImageSize(node, options)
  console.log({ width, height })
  console.log('toSvg >>')
  const svg = await toSvg(node, options)
  console.log('toSvg <<')

  console.log('createImage >>')
  const img = await createImage(svg)
  console.log('createImage <<')

  console.log('creating canvas element')
  const canvas = document.createElement('canvas')
  console.log('created canvas element')

  const context = canvas.getContext('2d')!
  const ratio = options.pixelRatio || getPixelRatio()
  const canvasWidth = options.canvasWidth || width
  const canvasHeight = options.canvasHeight || height

  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio

  if (!options.skipAutoScale) {
    checkCanvasDimensions(canvas)
  }
  canvas.style.width = `${canvasWidth}`
  canvas.style.height = `${canvasHeight}`

  if (options.backgroundColor) {
    context.fillStyle = options.backgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  console.log('drawing image')
  context.drawImage(img, 0, 0, canvas.width, canvas.height)
  console.log('drew image')

  console.log('toCanvas finishing')
  return canvas
}

export async function toPixelData<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<Uint8ClampedArray> {
  const { width, height } = getImageSize(node, options)
  const canvas = await toCanvas(node, options)
  const ctx = canvas.getContext('2d')!
  return ctx.getImageData(0, 0, width, height).data
}

export async function toPng<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<string> {
  // return nodeToDataURL(node, 640, 640)

  console.log('[toPng] toCanvas ...')
  const canvas = await toCanvas(node, options)
  console.log('[toPng] toCanvased')

  console.log('toDataURL')
  return canvas.toDataURL()
}

export async function toJpeg<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<string> {
  const canvas = await toCanvas(node, options)
  return canvas.toDataURL('image/jpeg', options.quality || 1)
}

export async function toBlob<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<Blob | null> {
  const canvas = await toCanvas(node, options)
  const blob = await canvasToBlob(canvas)
  return blob
}

export async function getFontEmbedCSS<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<string> {
  return getWebFontCSS(node, options)
}
