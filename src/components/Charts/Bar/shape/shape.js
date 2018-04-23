import {
  Shape,
} from 'bizcharts';
import borderRadius from './borderRadius';
import baseLine from './baseLine';

const types = {
  borderRadius,
  baseLine,
};
const shape = (transpose, shapeTypes) => {
  shape[Symbol.for('name')] = transpose ? `transpose${shapeTypes.join('')}` : shapeTypes.join('');

  Shape.registerShape('interval', shape[Symbol.for('name')], {
    draw(cfg, container) {
      for (let i = 0; i < shapeTypes.length; i++) {
        const setting = types[shapeTypes[i]](cfg, container, this, transpose);
        if (i === shapeTypes.length - 1) {
          return container.addShape('rect', {
            attrs: setting,
          });
        } else {
          container.addShape('rect', {
            attrs: setting,
          });
        }
      }
    },
  });

};

export default shape;
