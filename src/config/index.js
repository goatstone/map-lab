const config = {
  gMapAPIKey: '',
  bingAPIKey: '',
}

try {
  // eslint-disable-next-line
  const gKey = require('./g-key').default
  const configUpdate = require('./bingmap-key').default
  Object.assign(config, gKey, configUpdate)
} catch (e) {
  // eslint-disable-next-line
  console.warn('missing config files')
}

export default config
