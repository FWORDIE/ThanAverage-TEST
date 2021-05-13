

gsap.registerPlugin(CSSRulePlugin, MorphSVGPlugin);

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
let time = 0.15;


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
const walkbeg = new Event('walkbeg');
const walkend = new Event('walkend');
// Load Lottie Files
function loadLotties() {
    longestTime = 0;
    if (PeopleGen == true) {
        return;
    }
    for (let n = 0; n < 100; n++) {
        let dot = document.createElement("div");
        dot.className = "dot";
        let divNo = "no" + (n);
        dot.id = divNo;
        let svgNum = "SVG"+Math.floor(getRandomArbitrary(1, 2));
        dot.innerHTML = SVGs[svgNum](n);
        dots[n] = dot;
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
        gsap.to(dot, {width:`${dotData[n][3]}%`});
        



        const tl = gsap.timeline({
            repeat: -1,
            paused: true
          });

          tl.to(dot,{
                duration: time, 
                ease: "power3.out", 
                rotation:-15,
                transformOrigin:"0% 100%"
            })
            .to(dot,{
                duration: time, 
                ease: "power3.out", 
                rotation:0,
                transformOrigin:"0% 100%"
            })
            .to(dot,{
                duration: time, 
                ease: "power3.out", 
                rotation:15,
                transformOrigin:"100% 100%"
            })
            .to(dot,{
                duration: time, 
                ease: "power3.out", 
                rotation:0,
                transformOrigin:"100% 100%"
            })
        
        
        

        dot.addEventListener("mouseenter", (e) => {
            tl.play();
        });
        dot.addEventListener("mouseleave", (e) => {
            tl.pause(0);
        });

 

    

        dot.addEventListener('walkbeg', () => {
            tl.play();
            moving++;
        });
        dot.addEventListener("walkend", () => {
            tl.pause(0);
            moving--;
        });
        //dotData[n][8] = People[svgNum][1]*dotData[n][3];
                        
        // container creation
        // let dot = document.createElement("div");
        // dot.className = "dot";
        // let divNo = "no" + (n + 1);
        // dot.id = divNo;
        // //movePeople(dot, intialArr, n, true);
        // let svgNum = Math.floor(getRandomArbitrary(0, 5));
        // let aniNom = bodymovin.loadAnimation({
        //     name: divNo,
        //     container: dot, // required
        //     animationData: People[svgNum][0],
        //     renderer: "svg", // required
        //     loop: true, // optional
        //     autoplay: false, // optional
        // });
        // dot.addEventListener('mouseenter', (e) => {
        //     aniNom.play();
        // });
        // dot.addEventListener('mouseleave', (e) => {
        //     aniNom.stop();
        // });
        // // dot.addEventListener("walkbeg", () => {
        // //     aniNom.setSpeed(2);
        // //     aniNom.play();
        // // });
        // // dot.addEventListener("walkend", () => {
        // //     aniNom.setSpeed(2);
        // //     aniNom.stop();
        // // });
        // let invert = Math.floor(getRandomArbitrary(1, 3));
        // if (invert == 1) {
        //     dot.className = "dot invert";
        // } else {
        // }
        // let sizeNum = getRandomArbitrary(0.8, 1.2);
        // dotData[n][3] = 4 * sizeNum.toFixed(1);
        // if(is_mobile == true){
        //     dotData[n][3] = 6 * sizeNum.toFixed(1);  
        // }
        // dotData[n][8] = People[svgNum][1]*dotData[n][3];
        dots[n] = dot;
        //document.getElementById("container").appendChild(dot);
    }
    console.log(dotData);
    //var readywidth = document.getElementById("no100").offsetHeight;
   
    
    showResults(50, true, true);
    for(n=0; n < dots.length; n++){
        document.getElementById("container").appendChild(dots[n]);
        //let dot = document.getElementById(`no${n}`);
        

    }
    resultState = false;    
}

// Wait
function wait(A, B) {
    if (document.getElementById("no99").offsetHeight == 0) {
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
        // walk(dot);
        let XP = (containerWidth/100)*dotData[n][0],
            YP = (containerHeight/100)*dotData[n][1];
        gsap.to(dot, {duration: dotData[n][2], x:XP, y:YP, onStart:walkstart, onStartParams:[dot], onComplete: walkstop, onCompleteParams:[dot]});
        //dot.dispatchEvent(walkbeg);
        
        // ,onStart:walkstart, onStartParams:[dot], onComplete: walkstop, onCompleteParams:[dot]
        // dot.setAttribute("style","left:"+dotData[n][0]+"%; top:" +dotData[n][1]+ "%; transition-duration:" + dotData[n][2]+"s; width:"+ dotData[n][3]+"%; z-index:"+dotData[n][6]+";");
        // dot.classList.remove("green","red","blue");
        // dot.classList.add(dotData[n][7]|| "blue");
    }
    console.log("write")
} 

function walkstart(dot){
    dot.dispatchEvent(walkbeg);
  }
  
function walkstop(dot){
    dot.dispatchEvent(walkend);

}
// var pizza = gsap.timeline({
//     repeat: -1,
//     paused: true
//     });

// function walk(dot){
//     var S1 = dot.querySelector('.S1'),
//     S2 = dot.querySelector('.S2'),
//     S3 = dot.querySelector('.S3'),
//     E1 = dot.querySelector('.E1'),
//     E2 = dot.querySelector('.E2'),
//     E3 = dot.querySelector('.E3');





// pizza.to(S1, {duration: time, ease: "power3.out", morphSVG:{ shape:S2, precompile: ['M54.5,60.2 C54.5,73.6 3,73 3,60.2 3,47.3 6.3,4 22.9,1.1 39.6,-1.7 54.5,46.7 54.5,60.2 z','M54.2,52.1 C54.2,65.5 2.7,73 2.7,60.1 2.7,47.2 -2.1,7.1 14.6,4.3 31.3,1.5 54.2,38.7 54.2,52.1 z']}})
// .to(E1, {duration: time, ease: "power3.out", morphSVG:{ shape:E2, precompile:['M18.9,19.1 C20,19.1 20.8,20 20.8,21 20.8,22 20,23 18.9,23 17.8,23 17,22.1 17,21.1 17,20.1 17.8,19.1 18.9,19.1 zM32.5,18.2 C33.3,18.2 34,18.9 34,19.7 34,20.5 33.3,21.2 32.5,21.2 31.7,21.2 31,20.5 31,19.7 31,18.9 31.7,18.2 32.5,18.2 z','M15.1,21.8 C16.2,21.6 17.2,22.3 17.4,23.4 17.6,24.5 16.9,25.5 15.8,25.7 14.7,25.9 13.7,25.2 13.5,24.1 13.3,23 14,22 15.1,21.8 zM28.4,18.6 C29.2,18.5 30,19 30.1,19.8 30.2,20.6 29.7,21.4 28.9,21.5 28.1,21.6 27.3,21.1 27.2,20.3 27,19.6 27.6,18.8 28.4,18.6 z']}},`-=${time}`)
// .to(S1, {duration: time/2, ease: "power1.out", morphSVG:{ shape:S1, precompile:['M54.2,52.1 C54.2,65.5 2.7,73 2.7,60.1 2.7,47.2 -2.1,7.1 14.6,4.3 31.3,1.5 54.2,38.7 54.2,52.1 z','M54.5,60.2 C54.5,73.6 3,73 3,60.2 3,47.3 6.3,4 22.9,1.1 39.6,-1.7 54.5,46.7 54.5,60.2 z']}})
// .to(E1, {duration: time/2, ease: "power1.out", morphSVG:{ shape:E1, precompile:['M15.1,21.8 C16.2,21.6 17.2,22.3 17.4,23.4 17.6,24.5 16.9,25.5 15.8,25.7 14.7,25.9 13.7,25.2 13.5,24.1 13.3,23 14,22 15.1,21.8 zM28.4,18.6 C29.2,18.5 30,19 30.1,19.8 30.2,20.6 29.7,21.4 28.9,21.5 28.1,21.6 27.3,21.1 27.2,20.3 27,19.6 27.6,18.8 28.4,18.6 z','M18.9,19.1 C20,19.1 20.8,20 20.8,21 20.8,22 20,23 18.9,23 17.8,23 17,22.1 17,21.1 17,20.1 17.8,19.1 18.9,19.1 zM32.5,18.2 C33.3,18.2 34,18.9 34,19.7 34,20.5 33.3,21.2 32.5,21.2 31.7,21.2 31,20.5 31,19.7 31,18.9 31.7,18.2 32.5,18.2 z']}},`-=${time/2}`)
// .to(S1, {duration: time, ease: "power3.out", morphSVG:{ shape:S3, precompile:['M54.5,60.2 C54.5,73.6 3,73 3,60.2 3,47.3 6.3,4 22.9,1.1 39.6,-1.7 54.5,46.7 54.5,60.2 z','M54.5,60.2 C54.5,73.6 3,65.6 3,52.7 3,39.8 15.9,7.1 32.5,4.2 49.2,1.3 54.5,46.7 54.5,60.2 z']}})
// .to(E1, {duration: time, ease: "power3.out", morphSVG:{ shape:E3, precompile:['M18.9,19.1 C20,19.1 20.8,20 20.8,21 20.8,22 20,23 18.9,23 17.8,23 17,22.1 17,21.1 17,20.1 17.8,19.1 18.9,19.1 zM32.5,18.2 C33.3,18.2 34,18.9 34,19.7 34,20.5 33.3,21.2 32.5,21.2 31.7,21.2 31,20.5 31,19.7 31,18.9 31.7,18.2 32.5,18.2 z','M24.4,17.7 C25.5,17.9 26.1,19 25.9,20 25.7,21.1 24.6,21.7 23.6,21.5 22.5,21.3 21.9,20.2 22.1,19.2 22.3,18.2 23.3,17.5 24.4,17.7 zM37.9,19.8 C38.7,20 39.2,20.8 39,21.6 38.8,22.4 38,22.9 37.2,22.7 36.4,22.5 35.9,21.7 36.1,20.9 36.3,20.1 37.1,19.6 37.9,19.8 z']}},`-=${time}`)
// .to(S1, {duration: time/2, ease: "power1.out", morphSVG:{ shape:S1, precompile:['M54.5,60.2 C54.5,73.6 3,65.6 3,52.7 3,39.8 15.9,7.1 32.5,4.2 49.2,1.3 54.5,46.7 54.5,60.2 z','M54.5,60.2 C54.5,73.6 3,73 3,60.2 3,47.3 6.3,4 22.9,1.1 39.6,-1.7 54.5,46.7 54.5,60.2 z']}})
// .to(E1, {duration: time/2, ease: "power1.out", morphSVG:{ shape:E1, precompile:['M24.4,17.7 C25.5,17.9 26.1,19 25.9,20 25.7,21.1 24.6,21.7 23.6,21.5 22.5,21.3 21.9,20.2 22.1,19.2 22.3,18.2 23.3,17.5 24.4,17.7 zM37.9,19.8 C38.7,20 39.2,20.8 39,21.6 38.8,22.4 38,22.9 37.2,22.7 36.4,22.5 35.9,21.7 36.1,20.9 36.3,20.1 37.1,19.6 37.9,19.8 z','M18.9,19.1 C20,19.1 20.8,20 20.8,21 20.8,22 20,23 18.9,23 17.8,23 17,22.1 17,21.1 17,20.1 17.8,19.1 18.9,19.1 zM32.5,18.2 C33.3,18.2 34,18.9 34,19.7 34,20.5 33.3,21.2 32.5,21.2 31.7,21.2 31,20.5 31,19.7 31,18.9 31.7,18.2 32.5,18.2 z']}},`-=${time/2}`);


// }




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
    return traveltime;
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

