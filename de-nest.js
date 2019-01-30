
function denestElement(element,newElement,options)
{
    while(element && element.children)
    {
       if(element.children)
       {
        console.log(element.attributes)

            if(element.attributes && (options && options.keepAllAttr))
            {
                Array.from(element.attributes).forEach(attr => {
                    newElement.setAttribute(attr.name,attr.value);
                });
            }

           element = element.children[0];
       }
    }

    return newElement;
}

function getTagName(element,options)
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
}

let denest = (element,options) => 
{
    let newElement = getTagName(element,options);

    return denestElement(element,newElement,options);
}