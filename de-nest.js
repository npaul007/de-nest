const DeNester = Object.freeze({
    handleText(element,newElement,textOptions)
    {
        // we only append if the elements immediate child is a text node so that we don't append duplicates
        if(textOptions.keepAllText && element.childNodes[0].nodeType == 3)
        {
            newElement.textContent += element.textContent;
        }
    },
    handleAttributes:function(element,newElement,attributeOptions)
    {
        Array.from(element.attributes).forEach(attr => {
            let attrNameSpecified = attributeOptions.keepTheseAttributes.findIndex(attributeName =>  attributeName == attr.name) > -1 ;
            
            // we add the attribute if it is specified or if we are told to keep them all
            if(attributeOptions.keepAllAttributes || attrNameSpecified)
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

            if(options && options.textOptions)
            {
                this.handleText(element,newElement,options.textOptions);
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



