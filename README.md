# De-Nest


Library that un-nests nested html elements.

## Getting Started

Run this command in your terminal
```
npm i denester
```

### Code Example
```
let d = require('denester');

let options = {
    tagName:'span',
    attributeOptions: {
        keepValueMatch:new RegExp("sheep","g")
    },
    textOptions:{
      keepTextMatch:new RegExp("Coffee","g")
    }
};

let unnestedEl = d.denest(nestedEl,options);
```
### Before
```
<span class="john-wick neo"> 
  <article class="foo" style="color:red;":ba ="sheep">
      <a href="http://google.com" bar="foo">
      <p data="bird is the word">Coffee is GREAT</p>
      woo
      </a>
  </article>
</span>
```
### After
```
<span :ba="sheep">Coffee</span>
```
# Options

#### options.attributeOptions.keepAllAttributes [Boolean]
When set to true all attributes within nested element will be retained

#### options.attributeOptions.keepTheseAttrByValue  [Array]
An array of values are named here. The denester will retain all attributes that have these exact values.

#### options.attributeOptions.keepTheseAttrByName  [Array]
An array of values are named here. The denester will retain all attributes that have these exact names.

#### options.attributeOptions.keepNameMatch  [RegExp]
Retains attributes whose names are matched in the defined Regular Expression.

#### options.attributeOptions.keepValueMatch  [RegExp]
Retains attributes whose values are matched in the defined Regular Expression.

#### options.textOptions.keepAllText  [Boolean]
When set to true text nodes within nested element will be retained

#### options.textOptions.keepTextMatch  [RegExp]
Retains text nodes that match the defined Regular Expression.
