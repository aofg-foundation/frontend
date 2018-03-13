import Vue from 'vue'

const isString = val => val && typeof val === 'string' && val.length > 0;
const isPObject = val =>
  val &&
  typeof val === 'object' &&
  val !== null &&
  val.constructor === Object &&
  Object.keys(val).length > 0;

const hyphenate = str => str.replace(/\B([A-Z])/g, '-$1').toLowerCase();

function bemNames(entitys, delimiters) {
  let resultString = '';
  const names = entitys || { mods: {}, mixin: '' };
  const delims = {
    ns: '',
    el: '__',
    mod: '--',
    modVal: '-',
    ...delimiters,
  };
  const mixin = isString(names.mixin) ? ' ' + names.mixin : '';

  if (!names.block) return '';
  resultString = delims.ns ? delims.ns + names.block : names.block;

  if (names.el) resultString += delims.el + names.el;

  if (isPObject(names.mods)) {
    resultString += Object.keys(names.mods).reduce((prev, name) => {
      const val = names.mods[name];
      /* eslint-disable no-param-reassign */
      if (val === true) {
        prev += ' ' + resultString + delims.mod + name;
      } else if (isString(val)) {
        prev += ' ' + resultString + delims.mod + name + delims.modVal + names.mods[name];
      }
      /* eslint-enable no-param-reassign */

      return prev;
    }, '');
  }
  return resultString + mixin;
}

function bemCn(block, opt = { delimiters: {} }) {
  const options = {
    hyphenate: false,
    ...opt,
    delimiters: {
      ...opt.delimiters,
    },
  };
  if (!isString(block)) return '';

  return function entitys(elem, mods, mix) {
    const resultObj = {
      block,
      el: '',
      mods: {},
      mixin: '',
    };

    if (isPObject(mods)) resultObj.mods = mods;

    if (isString(elem)) {
      resultObj.el = elem;
    } else if (isPObject(elem)) {
      resultObj.mods = elem;
    }

    if (isString(mods)) {
      resultObj.mixin =
        resultObj.mixin.length > 0 ? `${resultObj.mixin} ${mods}` : resultObj.mixin + mods;
    }
    if (isString(mix)) {
      resultObj.mixin =
        resultObj.mixin.length > 0 ? `${resultObj.mixin} ${mix}` : resultObj.mixin + mix;
    }

    if (options.hyphenate) {
      return hyphenate(bemNames(resultObj, options.delimiters));
    }

    return bemNames(resultObj, options.delimiters);
  };
}

const cfg = {
  hyphenate: false,
  methodName: 'b',
  delimiters: {
    ns: '',
    el: '__',
    mod: '--',
    modVal: '-',
  }
}

Vue.mixin({
  props: ['mods'],
  computed: {
    _mods () {
      return Object.assign(this.modificators || {}, this.mods || {})
    }
  },
  created() {
    const block = this.$options.block || this.$options.name
    let generator = null

    if (typeof block !== 'string') return

    generator = bemCn(block, cfg)
    this[cfg.methodName] = (...args) => {
      args.push(this._mods)
      return generator(...args)
    }
  }
})