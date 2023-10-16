export default function cloneDeep(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; // No es un objeto o es nulo, simplemente devolvemos el valor
    }

    if (Array.isArray(obj)) {
        const arrCopy = [];
        for (let i = 0; i < obj.length; i++) {
            arrCopy[i] = cloneDeep(obj[i]);
        }
        return arrCopy;
    }

    const objCopy = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            objCopy[key] = cloneDeep(obj[key]);
        }
    }

    return objCopy;
}
