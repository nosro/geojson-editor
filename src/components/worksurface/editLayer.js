const editLayer = {
    'id': 'editLayer',
    'type': 'fill',
    'source': 'reference',
    'layout': {},
    'paint': {
      'fill-color': '#faa',
      'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'active'], false],
        1,
        0.5
      ]
    }
  };
  
  export default editLayer;
  