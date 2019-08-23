
module.exports = [{
  mode: 'production',
  entry: './src/index.ts',
  plugins: [],
  output: {
    path: __dirname + '/dist',
    filename: 'binio.bundle.min.js',
    library: 'binio'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
},
{
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'source-map',
  plugins: [],
  output: {
    path: __dirname + '/dist',
    filename: 'binio.bundle.js',
    library: 'd2s'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}]