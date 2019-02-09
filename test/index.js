
console.log("***Commencing tests for de-nest module***");

const assert = require('assert');
const denester = require('../src/de-nest.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM(`<!DOCTYPE html><body></body></html>`)).window;


// setting up sample nested element
let html ='<span class="john-wick neo">'+ 
                    '<article class="foo" style="color:red;":ba ="sheep">'+
                        '<a href="http://google.com" bar="foo">'+
                        '<p data="bird is the word">Coffee is GREAT</p>'+
                        'woo'+
                        '</a>'+
                    '</article>'+
                '</span>';

let nestedEl =  document.createEleement('div');
nestedEl.innerHTML = html;

describe('Array', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
});