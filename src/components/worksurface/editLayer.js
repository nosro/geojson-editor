const editLayer = {
    'id': 'editLayer',
    'type': 'fill',
    'source': 'reference',
    'layout': {},
    'paint': {
      'fill-color': '#faa',
      'fill-outline-color': '#000',
      'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
        1,
        0.8
      ]
    }
  };
  
  export default editLayer;
  