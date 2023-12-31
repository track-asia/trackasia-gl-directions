'use strict';

const once = require('lodash.once');
const test = require('tape');

test('Directions#option', tt => {
  let container, map, directions;

  function setup(opts) {
    container = document.createElement('div');
    map = new trackasiagl.Map({ container: container });
    var TrackAsiaDirections = require('..');
    directions = new TrackAsiaDirections(opts);
    map.addControl(directions);
  }

  tt.test('option.styles', t => {
    t.plan(1);
    setup({
      styles: [{
        'id': 'foo',
        'type': 'circle',
        'source': 'directions',
        'paint': {
          'circle-color': '#f00'
        },
        'filter': [
          'all',
          ['in', '$type', 'Point'],
          ['in', 'marker-symbol', 'A']
        ]
      }]
    });

    directions.setOrigin([-77, 41]);
    directions.on('origin', once(() => {
      t.ok(map.getLayer('foo'), 'Custom layer is present');
    }));
  });

  tt.end();
});
