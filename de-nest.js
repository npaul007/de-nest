
function denestElement(element,newElement,options)
{
    while(element && element.children)
    {
       if(element.children)
       {
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