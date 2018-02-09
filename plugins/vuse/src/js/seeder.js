import * as types from './types';
import { isObject } from './util';

const data = new Map([
  [types.Title, 'Awesome title'],
  [types.Text, 'Put your content here...'],
  [types.Avatar, '/static/img/avatar.png'],
  [types.Logo, '/static/img/google.svg'],
  [types.Link, 'http://example.com'],
  [types.Image, '/static/img/baianat.png'],
  [types.ClassList, () => []],
  [types.Button, () => ({ text: 'Click Me!', classes: [], href: 'http://example.com' })],
  [types.Quote, 'Put your content here...'],
  [types.Grid, () => ({mobile: '', tablet: '', screen: '', widescreen: ''})],
  [types.Boolean, true],
  [Number, 100],
  [String, 'This is pretty neat']
]);

export default class Seeder {
  // Seeds values using a schema.
  static seed (schema) {
    if (isObject(schema)) {
      return Object.keys(schema).reduce((values, key) => {
        values[key] = Seeder.seed(schema[key]);
        return values;
      }, {});
    } else if (Array.isArray(schema)) {
      return schema.map(s => {
        return Seeder.seed(s)
      });
    }

    let value = data.get(schema);
    if (value === undefined) {
      value = schema;
    }
    return typeof value === 'function' ? value() : value;
  }
};
