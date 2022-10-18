const referenceLayer = {
    'id': 'referenceLayer',
    'type': 'fill',
    'source': 'reference',
    'layout': {},
    'paint': {
      'fill-color': '#67C',
      'fill-outline-color': '#000',
      'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
        1,
        0.75
      ]
    }
  };
  
  export default referenceLayer;
  