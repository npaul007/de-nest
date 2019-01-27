let denest = (element,options) => 
{
    let newElement;

    // handling tagNames
    if(options && options.tagName)
    {
        newElement = document.createElement(options.tagName.toLowerCase());
    }
    else 
    {
        newElement = document.createElement(element.tagName.toLowerCase());
    }

    console.log(newElement);

    while(element && element.children)
    {
       if(element && element.children)
       {
           element = element.children[0];
       }
    }

    return newElement;
}