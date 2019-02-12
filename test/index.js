
console.log("***Commencing tests for denester module***");

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();

// and in the run-code inside some object
const document = mock.getDocument();

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
nestedEl.innerHTML = html;

// testing code
describe('Tests for DeNester', function() {
    it('1) Un-nest with no options', function() {

    	let unnestedEl = denester.denest(nestedEl);
    	
      	assert.equal(unnestedEl.tagName, "DIV");
        assert.equal(unnestedEl.textContent.trim(), "");
        assert.equal(unnestedEl.attributes.length, 0);
    });

    it('2) Un-nest with set tagname and all attributes', function() {

        let options = {
            tagName:'span',
            attributeOptions: {
                keepAllAttributes:true
            }
        };

        let unnestedEl = denester.denest(nestedEl,options);
        
        assert.equal(unnestedEl.tagName, "SPAN");
        assert.equal(unnestedEl.textContent.trim(), "");
        assert.equal(unnestedEl.attributes['bar'].value,'foo');
    });

    it("3) Un-nest and retain all text",function(){
        let options = {
            textOptions:{
                keepAllText:true                
            }
        };

        let unnestedEl = denester.denest(nestedEl,options);

        assert.equal(unnestedEl.textContent,"Coffee is GREATwoo");
        assert.equal(unnestedEl.tagName, 'DIV'); 
    });
});