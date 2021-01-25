const style: any = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.9em',
    fontFamily: 'sans-serif',
    color: '#eee',
    background: 'gray',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    '& .info': {
      position: 'absolute',
    },
    '& #bing-map': {
      width: '100%',
    },
    '& header': {
      display: 'flex',
      justifyContent: 'center',
      background: 'white',
    },
    '& header h1': {
      color: 'gray',
      margin: '6px 12px',
    },
    '& header > div': {
      flexGrow: 1,
    },
    '& footer': {
      background: 'gray',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    '& .openlayer': {
      width: '25%',
    },
    '& .map-container': {
      position: 'relative',
      height: '100%',
    },
    '& .leaflet-map': {
      width: '25%',
      height: '100%',
    },
    '& .google-map': {
      width: '25%',
      height: '100%',
    },
    '& .map-frame': {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
  },
}
export default style
