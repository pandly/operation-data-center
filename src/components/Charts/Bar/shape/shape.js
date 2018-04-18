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
      // const setting = types[shapeTypes](cfg, container, this, transpose);
      // return container.addShape('rect', {
      //   attrs: setting,
      // });
      shapeTypes.forEach(element => {
        const setting = types[element](cfg, container, this, transpose);
          container.addShape('rect', {
            attrs: setting,
          });
      });
    },
  });

};

export default shape;
