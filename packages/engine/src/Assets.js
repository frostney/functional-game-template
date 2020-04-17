const loadedAssets = {};

export const queue = assets =>
  Promise.all(
    Object.keys(assets).map(
      assetName =>
        new Promise((resolve, reject) => {
          const source = assets[assetName];

          const img = new Image();
          img.src = source;

          img.onload = () => {
            loadedAssets[assetName] = {
              source: img,
              width: img.width,
              height: img.height,
            };
            resolve(loadedAssets);
          };

          img.onerror = err => {
            reject(err);
          };
        })
    )
  );

export const resolve = assetName => loadedAssets[assetName];
