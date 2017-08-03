// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    }
  }
}