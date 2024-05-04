var lens = {'day':2,
            'month':2,
            'year':4}

function padAndTruncateInput(){
    var value = parseInt(this.value, 10);
    var len = lens[this.className]
    if (isNaN(value)) {
        this.value = '';
    } else {
        this.value = value.toString().padStart(len, '0').slice(-len);
    }
}


document.querySelectorAll('input[type="text"]').forEach(function(input) {
    input.addEventListener('input', padAndTruncateInput);
});
