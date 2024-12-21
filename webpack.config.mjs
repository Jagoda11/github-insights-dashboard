import path from 'path'

export default {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/github-insights-dashboard/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
