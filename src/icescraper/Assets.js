let loadedAssets = {};

export const queue = assets => {
  return Promise.all(
    Object.keys(assets).map(assetName => {
      return new Promise((resolve, reject) => {
        const source = assets[assetName];

        let img = new Image();
        img.src = source;

        img.onload = () => {
          loadedAssets[assetName] = img;
          resolve(loadedAssets);
        };

        img.onerror = err => {
          reject(err);
        };
      });
    })
  );
};

export const resolve = assetName => loadedAssets[assetName];
