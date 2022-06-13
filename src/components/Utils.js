function isValidTemplate(template){
    var lb = 0;
    var rb = 0;
    for(let j=0;j<template.length;j++){
        //if(template[j]==0)
    }
}

export function convertTemplateToHTML(template){
    return template.replace(/\[\[.*\]\]/g,`_____`);
}

const dog = `
<main> <h2> see contract [[dog:cat]] 
<p1> [[wtf]] history</h2></main>`

