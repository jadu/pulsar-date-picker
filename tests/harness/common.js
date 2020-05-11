'use strict';

var $ = require('jquery'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    chaiDom = require('chai-dom'),
    sinonjQuery = require('sinon-jquery').default;

require('babel-polyfill');

// Expose jQuery globals
window.$ = window.jQuery = $;

// Load chai extensions
chai.use(sinonChai);
chai.use(chaiDom);

// Load sinonjQuery
sinonjQuery.useWith(sinon, $)

// Expose tools in the global scope
window.chai = chai;
window.describe = describe;
window.expect = chai.expect;
window.it = it;
window.sinon = sinon;
