const style = {
  mainContainer: {
    fontSize: '0.9em',
    fontFamily: 'sans-serif',
    color: 'white',
    background: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    '& section[data-id=goatstone-component-moveto]': {
      background: 'green',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
    },
  },
  displayResults: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '250px',
    padding: '0.25em',
    color: '#222',
    background: 'rgba(200,200,200, 0.8)',
    zIndex: 900,
    boxShadow: '10px 10px 10px rgba(100, 100, 100, 0.8)',
    '& ul': {
      padding: 0,
      margin: 0,
    },
    '& li': {
      background: '#ccc',
      margin: '0.25em',
      borderRadius: '3px',
      cursor: 'default',
      zIndex: 100,
    },
    '& li:hover': {
      background: 'white',
    },
  },
  drawerContainer: {
    color: 'orange',
    background: 'green',
  },
}

export default style
