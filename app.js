
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function createRandom() {
    // create range
    var $arr = [];
    for (var i1=0; 25 > i1; i1++) {
        $arr.push(i1+1);
    }

    // Randomize Range
    var $shuffleArr = [];
    $arr = shuffle($arr);
    var arr = [];
    for (var i=0; 25 > i; i++) {
        if (i % 5 === 0) {
            if (i > 0) {
                $shuffleArr.push(arr);
            }
            arr = [];
        }
        arr.push($arr[i]);
    }
    $shuffleArr.push(arr);
    return $shuffleArr;
}

function createNode(value) {
    var html = document.createElement('div');
    html.appendChild(document.createTextNode(value));
    return html;
}

function checkWin(arrays) {
    function checkHorizontalVertical(arrays, pos) {
        var win = 0;
        var selected = null;
        for (var i =0; arrays.length > i; i++) {
            if (selected === null) {
                selected = arrays[i][pos];
            }
            if (arrays[i][pos] === selected) {
                win++;
            } else {
                break;
            }
        }

        return win;
    }
    function checkDiagonal(arrays) {
        var selected = [];
        for (var i =0; arrays.length > i; i++) {
            //console.log(arrays[i][1]);
            if (selected.indexOf(arrays[i][1]) < 0) {
                selected.push(arrays[i][1]);
                continue;
            }
            break;
        }

        return selected.length;
    }

    return checkHorizontalVertical(arrays, 0) === 5 || checkHorizontalVertical(arrays, 1) === 5
        || checkDiagonal(arrays) === 5;
}

window.onload = function () {
    var $id = document.getElementById('bingo-wrap');
    var $body = $id.getElementsByClassName('body-bingo');
    var rand = createRandom();
    var countSelect = 0;
    var currentSelected = [];
    for(var i = 0; rand.length > i; i++) {
        var div = createNode('');
            div.className = 'wrapped';
            $body[0].appendChild(div);
        for (var e=0; rand[i].length > e; e++) {
            var htm = createNode(rand[i][e]);
            htm.className = 'spec';
            htm.setAttribute('data-position', JSON.stringify([i, e]));
            htm.onclick = function () {
                if (countSelect > 4) {
                    return false;
                }
                if (this.className.match(/\s+selected/)) {
                    return false;
                }
                countSelect++;
                try {
                    var data = JSON.parse(this.getAttribute('data-position'));
                    if (data.length !== 2) {
                        alert('Kesalahan.. Mohon Muat Ulang');
                        return;
                    }
                } catch (e) {
                    alert('Kesalahan.. Mohon Muat Ulang');
                    return;
                }
                currentSelected.push(data);
                this.className += ' selected';
                if (countSelect === 5) {
                    if (checkWin(currentSelected)) {
                        alert('Hore Kamu Menang');
                    }
                }
            };

            div.appendChild(htm);
        }
    }
    var $reset = document.getElementById('stop');
    $reset.onclick = function () {
        countSelect = 0;
        currentSelected = [];
        var $s = document.getElementsByClassName('spec');
        for (var i = 0; $s.length > i; i++) {
            $s[i].className = $s[i].className.replace(/\s*selected/, '')
        }
    }
};