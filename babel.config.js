module.exports = api => {
  api.cache(true);

  return {
    presets: [['@babel/env', { modules: false }]],
    plugins: ['@babel/proposal-export-namespace-from'],
    ignore: [/node_modules/],
  };
};
