"use strict";

const REGX = /^--([a-z0-9\-]+)=("?[a-z0-9\-]+"?)$/i;

let ParseArguments = function () {
  let $flags = {},
    $runtimeArguments = {},
    infer = function (args) {
      let payload = {};
      for (let parameter of args) {
        if (REGX.test(parameter) === true) {
          let _split = parameter.match(REGX),
            _value = (function (_v) {
              if (/^\d{1,}$/.test(_v) === true) {
                return _v * 1;
              }
              if (/^(true|false)$/.test(_v) === true) {
                return /^t/.test(_v);
              }
              return _v;
            })(_split[2]);
          payload[_split[1]] = _value;
        }
      }
      $flags = payload;
      return payload;
    },
    runtime = ($opts = {}) => {
      $runtimeArguments = Object.assign($opts, $flags);
      return $runtimeArguments;
    },
    get = () => ($runtimeArguments === {} ? $flags : $runtimeArguments);

  return { infer, runtime, get };
};

module.exports = new ParseArguments();
