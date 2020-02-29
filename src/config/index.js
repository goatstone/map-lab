const config = { gMapAPIKey: '' }

try {
  // eslint-disable-next-line
  const gKey = require('./g-key').default
  Object.assign(config, gKey)
} catch (e) {
  // eslint-disable-next-line
  console.warn('missing config files')
}

export default config
