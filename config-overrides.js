module.exports = function override(config) {
  // Add polyfills for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    zlib: require.resolve("browserify-zlib")
  };

  // Suppress source map warnings
  config.module.rules = config.module.rules.map(rule => {
    if (rule.loader && rule.loader.includes('source-map-loader')) {
      return {
        ...rule,
        enforce: 'pre',
        exclude: [
          /@eth-optimism/,
          /@safe-global/,
          /@walletconnect/,
          /@metamask/,
          /eth-rpc-errors/,
          /json-rpc-engine/,
          /superstruct/
        ]
      };
    }
    return rule;
  });

  return config;
};