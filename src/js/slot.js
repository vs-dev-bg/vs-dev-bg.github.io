(function () {
    "use strict";

    var column = document.getElementsByClassName('wheel'),
        logo = document.getElementsByClassName('logo')[0],
        spinBtn = document.getElementById('spin'),
        creditBtn = document.getElementById('credit'),
        resetBtn = document.getElementById('reset'),
        score = document.querySelector('#numbers > .score'),
        stake = document.querySelector('#numbers > .stake'),
        winTableCol = document.getElementsByClassName('column'),
        wheel = {
            left: {
                last: null,
                route: 0
            },
            center: {
                last: null,
                route: 0
            },
            right: {
                last: null,
                route: 0
            }
        },
        winTable = {
            left: [0, 3, 1, 5, 2, 4, 0],
            center: [2, 5, 0, 3, 4, 1, 2],
            right: [4, 1, 2, 5, 3, 0, 4]
        },
        creditStake = 300,
        stakePerPlay = 5,
        spins = 0;

    function getName(element) {
        var name = element.className.split(" ");
        return name[name.length - 1];
    }

    function randomize(min, max) {
        return Math.floor((Math.random() * max) + min);
    }

    function stop (i, len, height) {
        return i === len * height;
    }

    function win(prize) {
        var winnings = parseInt(winTableCol[prize].querySelector('div').innerHTML);

        logo.className += ' win';
        logo.innerHTML = 'WIN!';
        winTableCol[prize].className += ' active';
        animNumbers(score, winnings, true);
        animNumbers(stake, stakePerPlay, true);

        setTimeout(function () {
            logo.className = 'logo';
            logo.innerHTML = '';
            winTableCol[prize].className = 'column';
        }, 5000);
    }

    function credit() {
        if (stake.innerHTML == 0) {
            stake.innerHTML = creditStake;
        } else {
            alert('You have enough money');
        }
    }

    function reset() {
        var res = confirm("Do you want to reset");

        if (res == true) {
            score.innerHTML = '0';
            stake.innerHTML = '300';
        }
    }

    function spinEnd() {
        var evt = document.createEvent("Event");
        evt.initEvent("spinEnd", true, true);
        document.dispatchEvent(evt);
    }

    function onSpinEnd() {
        if (spins == 3) {
            if (winTable.left[wheel.left.last] == winTable.center[wheel.center.last] &&
                winTable.center[wheel.center.last] == winTable.right[wheel.right.last]) {
                win(winTable.right[wheel.right.last]);
            }
            spins = 0;
            addButtonListeners();
        }
    }

    function anim(i, element, len, height, stops, time) {
        if (i < height * len) {
            element.style.transform = "translateY(" + i + "px)";

            setTimeout(function() {
                if (wheel[getName(element)].route === 2) {
                    if (!stop(i, stops, height)) {
                        anim(++i, element, len, height, stops, time);
                    } else {
                        wheel[getName(element)].last = stops;
                        spins++;
                        spinEnd();
                    }
                } else {
                    anim(++i, element, len, height, stops, time);
                }
            }, time || 5);
        } else {
            if (i === height * len) {
                wheel[getName(element)].route++;
                anim(0, element, len, height, stops, time);
            }
        }
    }

    function animNumbers(el, num, positive) {
        var i = 0,
            part = num > 5 ? 10 : 1,
            chunk = positive ? + part : -part,
            timeout;

        timeout = setInterval(function () {
            if (i < num) {
                el.innerHTML = parseInt(el.innerHTML) + chunk;
                i += Math.abs(chunk);
            } else {
                clearTimeout(timeout);
            }
        }, positive ? 40 : 150);
    }

    function spinHandler() {
        removeButtonListeners();

        var itemHeight = column[0].children[0].offsetHeight,
            itemsLength = column[0].children.length - 1;

        wheel.left.route = 0;
        wheel.center.route = 0;
        wheel.right.route = 0;

        animNumbers(stake, stakePerPlay, false);
        anim(wheel.left.last ? wheel.left.last * itemHeight : 0, column[0], itemsLength, itemHeight, randomize(0, itemsLength), randomize(2, 5));
        anim(wheel.center.last ? wheel.center.last * itemHeight : 0, column[1], itemsLength, itemHeight, randomize(0, itemsLength), randomize(2, 5));
        anim(wheel.right.last ? wheel.right.last * itemHeight : 0, column[2], itemsLength, itemHeight, randomize(0, itemsLength), randomize(2, 5));
    }

    function addButtonListeners() {
        spinBtn.addEventListener("click", spinHandler, false);
        creditBtn.addEventListener("click", credit, false);
        resetBtn.addEventListener("click", reset, false);
    }

    function removeButtonListeners() {
        spinBtn.removeEventListener("click", spinHandler, false);
        creditBtn.removeEventListener("click", credit, false);
        resetBtn.removeEventListener("click", reset, false);
    }

    addButtonListeners();
    document.addEventListener("spinEnd",onSpinEnd,false);
})();