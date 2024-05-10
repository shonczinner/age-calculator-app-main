var lens = {'day':2,
            'month':2,
            'year':4}

function padAndTruncateInput(e){
    var value = parseInt(e.currentTarget.value, 10);
    var len = lens[e.currentTarget.className]
    if (isNaN(value)) {
        e.currentTarget.value = '';
    } else {
        e.currentTarget.value = value.toString().padStart(len, '0').slice(-len);
    }
}


document.querySelectorAll('input[type="text"]').forEach(function(input) {
    input.addEventListener('input', padAndTruncateInput);
});
