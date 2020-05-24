const plugins =
  process.env.NODE_ENV === 'production'
    ? ['autoprefixer', '@fullhuman/postcss-purgecss']
    : [];

module.exports = { plugins };