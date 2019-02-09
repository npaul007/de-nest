
console.log("***Commencing tests for de-nest module***");

const Document = require('html-document');
const document = new Document();

const assert = require('assert');
const denester = require('../src/de-nest.js');

// setting up sample nested element
let html ='<span class="john-wick neo">'+ 
                    '<article class="foo" style="color:red;":ba ="sheep">'+
                        '<a href="http://google.com" bar="foo">'+
                        '<p data="bird is the word">Coffee is GREAT</p>'+
                        'woo'+
                        '</a>'+
                    '</article>'+
                '</span>';

let nestedEl = document.createElement('div');
nestedEl.innerHTML = nestedEl;


describe('Tests for DeNester', function() {
    it('1) Unest with no options', function() {
    	let unestedEl_1 = denester.denest(nestedEl);
    	console.log(unestedEl_1.outerHTML);

      	assert.equal([1,2,3].indexOf(4), -1);
    });
});