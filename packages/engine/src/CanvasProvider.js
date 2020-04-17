import ResizeObserver from 'resize-observer-polyfill';

import { resolve } from './Assets';

let context = null;
let canvasElement;

export const getCanvasElement = () => canvasElement;

export function createContext(width, height) {
  /* eslint no-restricted-syntax: 0 */

  canvasElement = document.createElement('canvas');
  canvasElement.setAttribute('width', width);
  canvasElement.setAttribute('height', height);

  const ro = new ResizeObserver(entries => {
    for (const { contentRect } of entries) {
      if (contentRect.width < width) {
        const scale = contentRect.width / width;

        canvasElement.style.transform = `scale(${scale}, ${scale})`;
      } else if (contentRect.height < height) {
        const scale = contentRect.height / height;

        canvasElement.style.transform = `scale(${scale}, ${scale})`;
      } else {
        canvasElement.style.transform = 'scale(1.0, 1.0)';
      }
    }
  });

  ro.observe(document.body);

  document.body.appendChild(canvasElement);

  context = canvasElement.getContext('2d');
}

export const drawTexture = ({
  x,
  y,
  width,
  height,
  pivotX,
  pivotY,
  angle,
}) => assetName => {
  const asset = resolve(assetName);

  if (!asset) {
    return;
  }

  const w = width || asset.width;
  const h = height || asset.height;
  const offsetX = pivotX * w;
  const offsetY = pivotY * h;

  context.save();

  context.translate(x + offsetX, y + offsetY);

  if (angle !== 0) {
    context.rotate(angle * (Math.PI / 180));
  }

  context.drawImage(asset.source, -offsetX, -offsetY);

  context.restore();
};

export const clearRect = ({ x, y, w, h }) => () => {
  context.clearRect(x, y, w, h);
};

export const drawRect = ({ x, y, w, h }) => ({ color }) => {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
};

export function drawLine() {}
export function drawPoint() {}
