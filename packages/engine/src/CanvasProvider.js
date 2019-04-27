import ResizeObserver from 'resize-observer-polyfill';

let context = null;

export function createContext(width, height) {
  /* eslint no-restricted-syntax: 0 */

  const canvasElement = document.createElement('canvas');
  canvasElement.setAttribute('width', width);
  canvasElement.setAttribute('height', height);

  const ro = new ResizeObserver((entries) => {
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

export const drawImage = ({ x, y }) => (asset) => {
  context.drawImage(asset, x, y);
};

export const drawRect = ({
  x, y, w, h,
}) => ({ color }) => {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
};

export function drawLine() {}
export function drawPoint() {}
