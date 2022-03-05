export const utilService = {
    makeId,
    getRandomColor
}

function makeId(length = 8) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomColor() {
    const options = ['#aecbfa', '#e8eaed', '#e6c9a8', '#fdcfe8', '#d7aefb', '#cbf0f8', '#a7ffeb', '#ccff90', '#fff475', '#fbbc04', '#f28b82']
    return options[getRandomInt(0, options.length - 1)]
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}