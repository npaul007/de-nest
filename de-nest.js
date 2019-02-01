const DeNester = Object.freeze({
    handleAttributes:function(element,newElement,attributeOptions)
    {
        Array.from(element.attributes).forEach(attr => {
            let attrNameSpecified = attributeOptions.keepTheseAttributes.findIndex(attributeName =>  attributeName == attr.name) > -1 ;

            if(attributeOptions.keepAllAttributes || attrNameSpecified)
            {
                newElement.setAttribute(attr.name,attr.value);
            }
        });
    },    
    denestElement:function(element,newElement,options)
    {
        while(element && element.children)
        {
            if(element.attributes && (options && options.attributeOptions))
            {
               this. handleAttributes(element,newElement,options.attributeOptions);
            }
    
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
            return document.createElement(element.tagName.toLowerCase());
        }
    },    
    denest:function (element,options)
    {
        let newElement = this.getElementWithTag(element,options);
    
        return this.denestElement(element,newElement,options);
    }
});



