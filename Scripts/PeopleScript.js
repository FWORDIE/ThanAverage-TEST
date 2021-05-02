let containerHeight = document.getElementById("container").clientHeight;
let containerWidth = document.getElementById("container").clientWidth;
let speed = containerWidth / 4;
let bias = 100;
let x = 14;
let y = 10;
let t = 4;
let bx = 8;
let by = 4;  
let refWid = containerWidth / x;
let refHei = containerHeight / y;
let blobWid = refWid;
let blobHei = refHei;
let intialArr = [];
let resultState = false;
let moving = 0;
let oldArr = [];
let oldNum;
let PeopleGen = false;
let longestTime = 0;
let aninmationSpeed = 3;
let is_mobile = false;

console.log(containerHeight, containerWidth);


//Check Mobile
function Mobile() {      
    var checker = document.getElementById("some-element");
    if (window.getComputedStyle(checker).display === "none") {
        x = 10;
        y = 16;
        t = 8;
        bx = 6;
        by = 8;
        refWid = containerWidth / x;
        refHei = containerHeight / y;
        blobWid = refWid;
        blobHei = refHei;    
        is_mobile = true;  
    }
    console.log(is_mobile)
    console.log('x:'+ x, 'y:'+ y, 'bx:'+ bx, 'by:'+ by )

 };

// Test Button Show Results
function test3() {
    let inputVal = document.getElementById("inputId").value;
    showResults(inputVal);
}

// Test Button Runaway
function runaway() {
    console.log("Runway Start resultState " + resultState);
    showResults(oldNum, true);
    setTimeout(() => {
        for (let n = 1; n <= 100; n++) {
            let nsvg = document.getElementById("no" + n);
            nsvg.remove();
        }
        console.log("they gone boy!");
        resultState = false;
        PeopleGen = false;
    }, longestTime * 1000);
}

// Test Button Load LoadLotties
function test1() {
    loadLotties();
    reset();
}

// Test Button Reset People
function reset() {
    longestTime = 0;
    for (let n = 1; n <= 100; n++) {
        let nsvg = document.getElementById("no" + n);
        nsvg.classList.remove("green");
        nsvg.classList.remove("red");
        movePeople(nsvg, intialArr, n - 1);
    }
    resultState = false;
}

// Empty Grid creation
function emptyGrid() {
    var emptyGrid = [];
    emptyGrid.push(1);
    emptyGrid.push(y, x * y, x * y - (y - 1));
    for (let n = 0; n < t; n++) {
        emptyGrid.push(y * (x / 2 - t / 2) + 1 + n * y);
    }
    for (let n = 0; n < bx; n++) {
        for (let m = 0; m < by; m++) {
            emptyGrid.push(
                y * (x / 2 - bx / 2) + (y / 2 - by / 2) + 1 + n * y + m
            );
        }
    }
    return emptyGrid;
}

// Create Basic Grid Points
function generateStartingGrid() {
    Mobile();
    let Gaps = emptyGrid();
    let n = 1;
    let m = 0;
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            // grid generater
            let grid = document.createElement("div");
            grid.className = "grid " + n;
            grid.style.left = refWid * i + "px";
            grid.style.top = refHei * j + "px";
            grid.style.width = blobWid + "px";
            grid.style.height = blobHei + "px";
            document.getElementById("container").appendChild(grid);
            grid.innerHTML = n;
            // People point generater
            if (Gaps.includes(n)) {
            } else {
                var dotOffWid = getRandomArbitrary(0.2, 0.8) * refWid;
                var dotOffHei = getRandomArbitrary(0.2, 0.8) * refHei;
                let xData = refWid * i + dotOffWid;
                let yData = refHei * j + dotOffHei;
                intialArr[m] = [xData, yData];
                m++;
            }
            n++;
        }
    }
}

// Load Lottie Files
function loadLotties() {
    longestTime = 0;
    if (PeopleGen == true) {
        return;
    }
    for (let n = 0; n < 100; n++) {
        // container creation
        let dot = document.createElement("div");
        dot.className = "dot";
        let divNo = "no" + (n + 1);
        dot.id = divNo;
        document.getElementById("container").appendChild(dot);
        dot.style.transform = "translate(" + 0 + "px," + 0 + "px)";
        movePeople(dot, intialArr, n, true);
        let invert = Math.floor(getRandomArbitrary(1, 3));
        let svgNum = Math.floor(getRandomArbitrary(1, 6));
        let sizeNum = getRandomArbitrary(0.8, 1.2);

        let aniNom = bodymovin.loadAnimation({
            name: divNo,
            container: document.getElementById(divNo), // required
            path: "People SVGS/Jsons/" + svgNum + ".json", // required
            renderer: "svg", // required
            loop: true, // optional
            autoplay: false, // optional
        });
        document.getElementById(divNo).addEventListener("mouseenter", (e) => {
            aniNom.play();
        });
        document.getElementById(divNo).addEventListener("mouseleave", (e) => {
            aniNom.stop();
        });
        document.getElementById(divNo).addEventListener("transitionrun", () => {
            aniNom.setSpeed(aninmationSpeed);
            aniNom.play();
            moving++;
        });
        document.getElementById(divNo).addEventListener("transitionend", () => {
            aniNom.setSpeed(1);
            aniNom.stop();
            moving--;
        });
        if (invert == 1) {
            dot.className = "dot invert";
        } else {
        }
        dot.style.width = 4 * sizeNum + "vw";
        if(is_mobile == true){
            dot.style.width = 6 * sizeNum + "vw";  
        }
    }
    var readywidth = document.getElementById("no100").offsetHeight;
    showResults(50, true, true);
    resultState = false;
    PeopleGen = true;
}

// Wait
function wait(A, B) {
    if (document.getElementById("no100").offsetHeight == 0) {
        setTimeout(wait, 100, A, B);
    } else {
        reset();
    }
}

// Move People
function movePeople(item, Arr, n, instant) {
    //console.log(item);
    let xData = Arr[n][0] - item.offsetWidth / 2;
    let yData = Arr[n][1] - item.offsetHeight / 2;
    let zindex = Arr[n][1] + item.offsetHeight / 2;
    //console.log("Height:" + item.offsetHeight +", width:" +item.offsetWidth)
    let oldX = findXY(item)[0];
    let oldY = findXY(item)[1];
    if (instant == true) {
        s = Infinity;
    } else {
        s = speed;
    }
    item.style.transition = travel(xData, yData, oldX, oldY, s, item);
    item.style.transform = "translate(" + xData + "px," + yData + "px)";
    item.setAttribute("xData", xData);
    item.setAttribute("yData", yData);
    item.style.zIndex = Math.floor(zindex);
}

// Get Random Number
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Show Results
function showResults(num, runaway, instant) {
    var error = 0;
    var arr = [];
    if (runaway == true && resultState == false) {
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
    } else if (runaway == true && resultState == true) {
        arr = oldArr;
    } else {
        while (arr.length < num) {
            var r = Math.floor(Math.random() * 100) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
    }
    var pointsG = gridsetup(num, bias, 0, runaway);
    var pointsR = gridsetup(100 - num, bias, 1, runaway);
    var binG = [];
    var binR = [];
    longestTime = 0;
    for (let n = 100; n > 0; n--) {
        let nsvg = document.getElementById("no" + n);
        findXY(nsvg);
        let oldy = findXY(nsvg)[1];
        let oldx = findXY(nsvg)[0];
        if (arr.includes(n)) {
            nsvg.classList.remove("green");
            nsvg.classList.remove("red");
            if (runaway == true) {
            } else {
                nsvg.classList.add("green");
            }
            let closeP = pointchoice(oldx, oldy, pointsG, binG)[0];
            binG.push(closeP);
            movePeople(nsvg, pointsG, closeP, instant);
        } else {
        }
    }
    for (let n = 1; n < 101; n++) {
        let nsvg = document.getElementById("no" + n);
        findXY(nsvg);
        //console.log(runaway);
        let oldy = findXY(nsvg)[1];
        let oldx = findXY(nsvg)[0];
        //console.log(oldy, oldx);
        if (arr.includes(n)) {
        } else {
            nsvg.classList.remove("green");
            nsvg.classList.remove("red");
            if (runaway == true) {
            } else {
                nsvg.classList.add("red");
            }
            let closeP = pointchoice(oldx, oldy, pointsR, binR)[0];
            binR.push(closeP);
            movePeople(nsvg, pointsR, closeP, instant);
        }
    }
    oldArr = arr;
    oldNum = num;
    resultState = true;
}

//Speed controller
function travel(newx, newy, oldx, oldy, speed, item) {
    let x = newx - oldx;
    let y = newy - oldy;
    let d = Math.sqrt(x * x + y * y);
    let traveltime = d / speed;
    if (traveltime > longestTime) {
        longestTime = traveltime;
    }
    console.log("long:" + longestTime);
    return "all " + traveltime + "s cubic-bezier(.45,.05,.55,.95)";
}

//Generate Result Grid
function gridsetup(num, bias, rule, runaway) {
    let name = [];
    var i;

    for (i = 0; i < num; i++) {
        name[i] = randomPointOf(i, bias, rule);
        if (runaway == true) {
            if (rule == 0) {
                name[i][0] = name[i][0] - containerWidth / 4;
            } else {
                name[i][0] = name[i][0] + containerWidth / 4;
            }
        } else {
        }
    }

    //Ghost Points
    // for(let n = 0; n < name.length; n++){
    //     let dot = document.createElement('div');
    //     dot.className ='small';
    //     dot.id = "Demo" +n;
    //     dot.style.transform = "translate(" + name[n][0] + 'px,' + name[n][1]+ 'px)' ;
    //     document.getElementById('container').appendChild(dot);
    //     }
    //console.log(name);
    return name;
}

//Generate Result Grid Points
function randomPointOf(n, bias, val) {
    let h = (y - 2) * refHei;
    let w = ((x - bx) / 2) * refWid;
    let spread = Math.sqrt(bias);
    let xs = w / spread;
    let ys = h / spread;
    n = n % bias;
    let ny = (n % spread) * ys;
    let nx = Math.floor(n / spread) * xs;
    if (val == 1) {
        let xx = containerWidth - Math.floor(Math.random() * xs + nx);
        let yy = Math.floor(Math.random() * ys + ny) + refHei;
        return [xx, yy];
    } else {
        let xx = Math.floor(Math.random() * xs + nx);
        let yy = Math.floor(Math.random() * ys + ny) + refHei;
        return [xx, yy];
    }
}

// Choose what point to Go to
function pointchoice(oldx, oldy, array, bin) {
    let closet = Infinity;
    for (let p = 0; p < array.length; p++) {
        if (bin.includes(p)) {
        } else {
            let x = array[p][0] - oldx;
            let y = array[p][1] - oldy;
            let c = Math.sqrt(x * x + y * y);
            if (c < closet) {
                closet = c;
                closeP = p;
            }
        }
    }
    return [closeP, closet];
}

// Read Current XY
function findXY(div) {
    let el = div;
    let st = window.getComputedStyle(el, null);
    let tr =
        st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform");
    let values = tr.split("(")[1];
    values = values.split(")")[0];
    values = values.split(",");
    let a = values[0];
    let b = values[1];
    let c = values[2];
    let d = values[3];
    let x = values[4];
    let y = values[5];
    return [x, y];
}
