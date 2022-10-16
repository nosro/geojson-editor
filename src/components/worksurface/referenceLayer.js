const referenceLayer = {
    'id': 'referenceLayer',
    'type': 'fill',
    'source': 'reference',
    'layout': {},
    'paint': {
      'fill-color': '#627BC1',
      'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'active'], false],
        1,
        0.5
      ]
    }
  };
  
  export default referenceLayer;
  