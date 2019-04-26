let context = null;

export function createContext(width, height) {
  const canvasElement = document.createElement('canvas');
  canvasElement.setAttribute('width', width);
  canvasElement.setAttribute('height', height);

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
