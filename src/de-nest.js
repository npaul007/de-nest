const Document = require('html-document');
const document = new Document();

const DeNester = Object.freeze({
    handleText(element,newElement,textOptions)
    {
        if(newElement.textContent.trim() == "")
        {

            if(textOptions.keepTextMatch)
            {
                let matches = element.textContent.match(textOptions.keepTextMatch);
                matches && matches.forEach(m =>{
                    newElement.textContent += m;
                });
            }

            if(textOptions.keepAllText)
            {
                newElement.textContent = element.textContent;            
            }
        }
    },
    handleAttributes:function(element,newElement,attributeOptions)
    {
        Array.from(element.attributes).forEach(attr => {
            let attrNameSpecified = false;
            let attrNameMatch = false;
            let attrValueMatch = false;
            let attrValueSpecified = false;

            // handling explicit name matches
            if(attributeOptions.keepTheseAttrByName && attributeOptions.keepTheseAttrByName.length > 0)
            {
                attrNameSpecified = attributeOptions.keepTheseAttrByName.findIndex(attributeName =>  {
                    return attributeName == attr.name
                }) > -1;    
            }

            // handling explicit value matches
            if(attributeOptions.keepTheseAttrByValue && attributeOptions.keepTheseAttrByValue.length > 0)
            {
                attrValueSpecified = attributeOptions.keepTheseAttrByValue.findIndex(attributeValue =>  {
                    return attributeValue == attr.value
                }) > -1;    
            }

            // handling regex for value
            if(attributeOptions.keepValueMatch)
            {
                attrValueMatch = ( attr.name.match(attributeOptions.keepValueMatch) || new Array() ).length > 0;
            }

            // handling regex for name
            if(attributeOptions.keepNameMatch)
            {
                attrNameMatch = ( attr.name.match(attributeOptions.keepNameMatch) || new Array() ).length > 0;
            }

            // we add the attribute if it is specified or if we are told to keep them all
            const condition = ( 
                                    attributeOptions.keepAllAttributes || 
                                    attrNameSpecified || 
                                    attrNameMatch || 
                                    attrValueMatch ||
                                    attrValueSpecified
                               );
                               
            if(condition)
            {
                newElement.setAttribute(attr.name,attr.value);
            }
        });
    },    
    denestElement:function(element,newElement,options)
    {
        // go down nest and retain particular content
        while(element && element.children)
        {
            if(element.attributes && (options && options.attributeOptions))
            {
               this.handleAttributes(element,newElement,options.attributeOptions);
            }

            if(element.textContent && options && options.textOptions)
            {
                this.handleText(element,newElement,options.textOptions);
            }
            
            // if a child exists we move to it
            if(element.children)
            {
                element = element.children[0];
            }
        }
    
        return newElement;
    },    
    getElementWithTag:function(element,options)
    {
        // handling tagNames
        if(options && options.tagName)
        {
            return document.createElement(options.tagName.toLowerCase());
        }
        else 
        {
            // set tag type to parent tag type of tagName isn't specified
            return document.createElement(element.tagName.toLowerCase());
        }
    },    
    denest:function (element,options)
    {
        // an empty shell element ready to be populated w/specified content
        let newElement = this.getElementWithTag(element,options);
    
        return this.denestElement(element,newElement,options);
    }
});



module.exports = DeNester;