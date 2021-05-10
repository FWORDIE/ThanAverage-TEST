let containerHeight = document.getElementById("container").clientHeight;
let containerWidth = document.getElementById("container").clientWidth;
let speed = containerWidth / 50;
let bias = 100;
let x = 14;
let y = 10;
let t = 4;
let bx = 8;
let by = 4;  
let refWid = 100 / x;
let refHei = 100 / y;
let blobWid = refWid;
let blobHei = refHei;
let dotData = [];
let resetData = [];
let resultState = false;
let moving = 0;
let oldArr = [];
let oldNum;
let PeopleGen = false;
let longestTime = 0;
let aninmationSpeed = 3;
let is_mobile = false;
let dots = [];

//console.log(containerHeight, containerWidth);


//Check Mobile
function Mobile() {      
    var checker = document.getElementById("some-element");
    if (window.getComputedStyle(checker).display === "none") {
        x = 10;
        y = 16;
        t = 8;
        bx = 6;
        by = 8;
        refWid = 100 / x;
        refHei = 100 / y;
        blobWid = refWid;
        blobHei = refHei;    
        is_mobile = true;  
        speed = containerWidth / 15;
    }
    //console.log(is_mobile)
    //console.log('x:'+ x, 'y:'+ y, 'bx:'+ bx, 'by:'+ by )

 };

// Test Button Show Results
function test3() {
    let inputVal = document.getElementById("inputId").value;
    showResults(inputVal);
}

// Test Button Runaway
function runaway() {
    //console.log("Runway Start resultState " + resultState);
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
    for (let n = 0; n < 100; n++) {
        dotData[n][7] = "";
        movePeople(n, resetData, n);
    }
    writeData();
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
            // People point generater
            if (Gaps.includes(n)) {
            } else {
                var dotOffWid = getRandomArbitrary(0.2, 0.8) * refWid;
                var dotOffHei = getRandomArbitrary(0.2, 0.8) * refHei;
                let xData = refWid * i + dotOffWid;
                let yData = refHei * j + dotOffHei;
                dotData[m] = [xData, yData, 0, 0, 0, 0, 0,"blue"];
                resetData[m] = [xData, yData];
                m++;
            }
            n++;
        }
    }
    console.log("generateStartingGrid: " + dotData)
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
        //movePeople(dot, intialArr, n, true);
        let svgNum = Math.floor(getRandomArbitrary(0, 5));
        let aniNom = bodymovin.loadAnimation({
            name: divNo,
            container: dot, // required
            animationData: People[svgNum][0],
            renderer: "svg", // required
            loop: true, // optional
            autoplay: false, // optional
        });
        dot.addEventListener("mouseenter", (e) => {
            aniNom.play();
        });
        dot.addEventListener("mouseleave", (e) => {
            aniNom.stop();
        });
        dot.addEventListener("transitionrun", () => {
            aniNom.setSpeed(aninmationSpeed);
            aniNom.play();
            moving++;
        });
        dot.addEventListener("transitionend", () => {
            aniNom.setSpeed(1);
            aniNom.stop();
            moving--;
        });
        let invert = Math.floor(getRandomArbitrary(1, 3));
        if (invert == 1) {
            dot.className = "dot invert";
        } else {
        }
        let sizeNum = getRandomArbitrary(0.8, 1.2);
        dotData[n][3] = 4 * sizeNum.toFixed(1);
        if(is_mobile == true){
            dotData[n][3] = 6 * sizeNum.toFixed(1);  
        }
        dotData[n][8] = People[svgNum][1]*dotData[n][3];
        dots[n] = dot;
        //document.getElementById("container").appendChild(dot);
    }
    console.log(dotData);
    //var readywidth = document.getElementById("no100").offsetHeight;
   
    
    showResults(50, true, true);
    for(n=0; n < dots.length; n++){
        document.getElementById("container").appendChild(dots[n]);
    }
    resultState = false;    
}

// Wait
function wait(A, B) {
    if (document.getElementById("no100").offsetHeight == 0) {
        setTimeout(wait, 100, A, B);
    } else {
        reset();
    }
}

// Set Movement Data
function setData(n){
}

// Write Movement Data
function writeData(){
 
    for(n=0;n<100;n++){
        let dot = dots[n];
        dot.setAttribute("style","left:"+dotData[n][0]+"%; top:" +dotData[n][1]+ "%; transition-duration:" + dotData[n][2]+"; width:"+ dotData[n][3]+"%; z-index:"+dotData[n][6]+";");
        dot.classList.remove("green","red","blue");
        dot.classList.add(dotData[n][7]|| "blue");
    }
    console.log("write")


} 

// Move People
function movePeople(item, Arr, n, instant) {
    
    let xData = Arr[n][0];
    let yData = Arr[n][1];
    let oldX = dotData[item][0];
    let oldY = dotData[item][1];
    if (instant == true) {
        s = Infinity;
    } else {
        s = speed;
    }
    dotData[item][2] = travel(xData, yData, oldX, oldY, s);
    dotData[item][4] = oldX;
    dotData[item][5] = oldY;
    dotData[item][0] = xData;
    dotData[item][1] = yData;
    dotData[item][6] = ((yData + (dotData[item][8]/2))*10).toFixed(0);
    //console.log(dotData[item]);
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
        arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
                31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
                41, 42, 43, 44, 45, 46, 47, 48, 49, 50
            ];
    } else if (runaway == true && resultState == true) {
        arr = oldArr;
    } else {
        while (arr.length < num) {
            var r = Math.floor(Math.random() * 100) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
    }
    var pointsG = gridsetup(num, bias, 0, runaway); // Green Point Arr
    var pointsR = gridsetup(100 - num, bias, 1, runaway); // Red Point Arr
    //console.log(pointsG, pointsR)
    var binG = [];
    var binR = [];
    longestTime = 0;
    for (let n = 100; n > 0; n--) {

        let oldx = dotData[n-1][0];
        let oldy = dotData[n-1][1];

        if (arr.includes(n)) {

            if (runaway == true) {
            } else {
                dotData[n-1][7] = 'green';
            }
            let closeP = pointchoice(oldx, oldy, pointsG, binG)[0];
            binG.push(closeP);
            movePeople(n-1, pointsG, closeP, instant);
        } else {
        }
    }
    for (let n = 1; n < 101; n++) {

        let oldx = dotData[n-1][0];
        let oldy = dotData[n-1][1];

        if (arr.includes(n)) {
        } else {

            if (runaway == true) {
            } else {
                dotData[n-1][7] = 'red';
            }
            let closeP = pointchoice(oldx, oldy, pointsR, binR)[0];
            binR.push(closeP);
            movePeople(n-1, pointsR, closeP, instant);
        }
    }
    oldArr = arr;
    oldNum = num;
    resultState = true;
    console.log(dotData);
    writeData();
}

//Speed controller
function travel(newx, newy, oldx, oldy, speed) {
    let x = newx - oldx;
    let y = newy - oldy;
    let d = Math.sqrt(x * x + y * y);
    let traveltime = d / speed;
    if (traveltime > longestTime) {
        longestTime = traveltime;
    }
    //console.log("long:" + longestTime);
    return traveltime + "s";
}

//Generate Result Grid
function gridsetup(num, bias, rule, runaway) {
    let gridArr = [];
    var i;
    for (i = 0; i < num; i++) {
        gridArr[i] = randomPointOf(i, bias, rule);
        if (runaway == true) {
            if (rule == 0) {
                gridArr[i][0] = parseFloat(gridArr[i][0])-20;
            } else {
                gridArr[i][0] = parseFloat(gridArr[i][0])+20;
            }
        } else {
        }
        gridArr[i][1] = gridArr[i][1]-0;
        gridArr[i][0] = gridArr[i][0]-0;
    }
    console.log(gridArr)

    return gridArr;
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
    let nx = (n / spread) * xs;
    let xx = 0;
    let yy = 0;
    if (val == 1) {
        xx = 100 - (Math.random() * xs + nx);
        yy = (Math.random() * ys + ny) + refHei;
    } else {
        xx = (Math.random() * xs + nx);
        yy = (Math.random() * ys + ny) + refHei;   
    }
    
    return [xx.toFixed(1), yy.toFixed(1)];
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

