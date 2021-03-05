
const convertLowerSnakeCase =(srcString)=>(srcString?srcString.replace(/\s+/g, '_').toLowerCase():null);

const removeSpecialCharToLowerSnakeCase = (srcString) => {
    let finalString = srcString.trim();
    finalString = finalString.replace(/[&\/\\#, +()$~%.'":*?<>{}-]/g, '_').toLowerCase().replace(/_+/g, '_');
    if (finalString.lastIndexOf('_') === (finalString.length - 1)) {
        finalString = finalString.slice(0, finalString.lastIndexOf('_'));
    }
    return finalString;
};

export {convertLowerSnakeCase, removeSpecialCharToLowerSnakeCase};
