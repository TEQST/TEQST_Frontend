module.exports = {
  module: {
    rules: [
      {
        test: /encoderWorker\.min\.js$/,
        use: [{ loader: 'file-loader' }]
      }
    ]
  }
};