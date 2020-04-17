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

const drawWithAngle = ({
  x,
  y,
  width,
  height,
  pivotX,
  pivotY,
  angle,
}) => callback => {
  // console.log(pivotX, width);

  const offsetX = pivotX * width;
  const offsetY = pivotY * height;

  context.save();

  context.translate(x + offsetX, y + offsetY);

  if (angle !== 0) {
    context.rotate(angle * (Math.PI / 180));
  }

  callback(offsetX, offsetY);

  context.restore();
};

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

  drawWithAngle({
    x,
    y,
    width: width || asset.width,
    height: height || asset.height,
    pivotX,
    pivotY,
    angle,
  })((offsetX, offsetY) => {
    context.drawImage(asset.source, -offsetX, -offsetY);
  });
};

export const clearRect = ({ x, y, width, height }) => () => {
  context.clearRect(x, y, width, height);
};

export const drawRect = ({ x, y, width, height, pivotX, pivotY, angle }) => ({
  color,
}) => {
  drawWithAngle({
    x,
    y,
    width,
    height,
    pivotX,
    pivotY,
    angle,
  })((offsetX, offsetY) => {
    context.fillStyle = color;
    context.fillRect(offsetX, offsetY, width, height);
  });
};

export function drawLine() {}
export function drawPoint() {}
