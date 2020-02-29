const config = { gMapAPIKey: '' }

try {
  const gKey = require('./g-key').default
  Object.assign(config, gKey)
} catch (e) {
  // eslint-disable-next-line
  console.warn('missing config files')
}

export default config
