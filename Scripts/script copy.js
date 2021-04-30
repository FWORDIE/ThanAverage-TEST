let containerHeight = document.getElementById('container').clientHeight;
let containerWidth = document.getElementById('container').clientWidth;
let speed = 150;
let bias = 100;
let x= 14;
let y = 10;
let t = 4;
let bx = 8;
let by = 4;
const refWid = containerWidth/x;
const refHei = containerHeight/y;
const blobWid = refWid;
const blobHei = refHei;
let intialArr = [];


console.log(containerHeight,containerWidth);

document.onload = generateStartingGrid();

// Test Buttons
function test3(){
let inputVal = document.getElementById("inputId").value;
showResults(inputVal);
}

function test2(){
    for(let n = 1; n <=100; n++){
        let nsvg = document.getElementById('no'+ n);
        nsvg.classList.remove("green");
        nsvg.classList.remove("red");
        let oldy = nsvg.getAttributeNode("yData").value;
        let oldx = nsvg.getAttributeNode("xData").value;
        nsvg.style.transform = "translate(" +oldx + 'px,' + oldy+ 'px)' ;
    }
}

// Empty Grid creation
function emptyGrid(){
var emptyGrid = []
emptyGrid.push(1);
emptyGrid.push(y,x*y,x*y-(y-1));
for(let n=0; n<t; n++){
    emptyGrid.push((y)*((x/2)-(t/2))+1+(n*y));
}
for(let n=0; n<bx; n++){
    for(let m=0; m<by; m++){
        emptyGrid.push((y)*((x/2)-(bx/2))+((y/2)-(by/2))+1+(n*y)+m);
    }
}
return emptyGrid;
}

// Create Basic Grid Points
function generateStartingGrid(){
let Gaps = emptyGrid();
let n = 1;
let m = 0;
for(let i=0; i < x; i++){
    for(let j=0; j< y; j++){
    // grid generater 
    let grid = document.createElement('div');
    grid.className = 'grid ' +n ;
    grid.style.left = refWid*i +'px';
    grid.style.top = refHei*j +'px';
    grid.style.width = blobWid +'px';
    grid.style.height = blobHei +'px';
    document.getElementById('container').appendChild(grid);
    grid.innerHTML = n;
    // People point generater
    if(Gaps.includes(n)){
    }else{
        var dotOffWid = getRandomArbitrary(0.2,0.8)*refWid;
        var dotOffHei = getRandomArbitrary(0.2,0.8)*refHei;
        let xData = refWid*i + dotOffWid;
        let yData = refHei*j + dotOffHei;
        intialArr[m] = [xData,yData];
        m++
    };
    n++;
    }
}
console.log(intialArr);
} 



function loadLotties(){
    for(let n = 0; n < 100; n++){
        // container creation
        let dot = document.createElement('div');
        dot.className ='dot';
        let divNo = "no" +(n+1);
        dot.id = divNo;
        document.getElementById('container').appendChild(dot); 
        // let xData = intialArr[n][0]- (dot.offsetWidth/2);
        // let yData = intialArr[n][1]- (dot.offsetWidth);
        // dot.style.transform = "translate(" +xData + 'px,' + yData+ 'px)' ;
        // dot.setAttribute("xData",xData);
        // dot.setAttribute("yData",yData);
        // dot.style.zIndex = Math.floor(yData);
        movePeople(intialArr, n);
        let invert = Math.floor(getRandomArbitrary(1, 3));
        let svgNum = Math.floor(getRandomArbitrary(1, 3));
        let sizeNum = getRandomArbitrary(0.5, 1.5);
        let aniNom = bodymovin.loadAnimation({
            name: divNo,
            container: document.getElementById(divNo), // required
            path: 'People SVGS/Jsons/'+ svgNum +'.json', // required
            renderer: 'svg', // required
            loop: true, // optional
            autoplay: false, // optional
        });
        document.getElementById(divNo).addEventListener('mouseenter', (e) => {
            aniNom.play();
        });
        document.getElementById(divNo).addEventListener('mouseleave', (e) => {
            aniNom.stop();
        });
        document.getElementById(divNo).addEventListener("transitionrun", () => {
            aniNom.setSpeed(3);
            aniNom.play();
        });
        document.getElementById(divNo).addEventListener("transitionend", () => {
            aniNom.setSpeed(3);
            aniNom.stop();
        });
        if(invert == 1){
            dot.className = 'dot invert';
        }else{};
    }
}

// fucntion movePeople(Arr, n){
//         let xData = intialArr[n][0]- (dot.offsetWidth/2);
//         let yData = intialArr[n][1]- (dot.offsetWidth);
//         dot.style.transform = "translate(" +xData + 'px,' + yData+ 'px)' ;
//         dot.setAttribute("xData",xData);
//         dot.setAttribute("yData",yData);
//         dot.style.zIndex = Math.floor(yData);

// }

function getRandomArbitrary(min, max) {
return Math.random() * (max - min) + min;
}

function showResults(num){
    var error = 0;
    var arr = [];
    while(arr.length < num){
        var r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    //gridsetup(num, red);
    var pointsG = gridsetup(num, bias, 0);
    var pointsR = gridsetup(100-num, bias, 1);
    // console.log(num, pointsG);
    // console.log(100-num, pointsR);
    var binG =[];
    var binR =[];

    for(let n = 100; n > 0; n--){
        let nsvg = document.getElementById('no'+ n);
        findXY(nsvg);
        let oldy = findXY(nsvg)[1];
        let oldx = findXY(nsvg)[0];
        //console.log(oldy, oldx);
        if(arr.includes(n)){       
            nsvg.classList.remove("green");
            nsvg.classList.remove("red");
            nsvg.classList.add("green");
            let closeP = pointchoice(oldx, oldy, pointsG, binG)[0];
            binG.push(closeP);
            //console.log(binG, closeP, closet);
            let newy = pointsG[closeP][1]- (nsvg.offsetWidth);
            let newx = pointsG[closeP][0] - (nsvg.offsetWidth/2);
            //console.log(travel(closet, speed, nsvg), closet);
            nsvg.style.transition = travel(newx, newy, oldx, oldy, speed, nsvg);
            nsvg.style.transform = "translate(" +newx + 'px,' + newy+ 'px)' ;
            nsvg.style.zIndex = Math.floor(newy);
        }else{
        }
    }
        for(let n = 1; n < 101; n++){
            let nsvg = document.getElementById('no'+ n);
            findXY(nsvg);
            let oldy = findXY(nsvg)[1];
            let oldx = findXY(nsvg)[0];
            //console.log(oldy, oldx);
            if(arr.includes(n)){       
            }else{
                nsvg.classList.remove("green");
                nsvg.classList.remove("red");
                nsvg.classList.add("red");
                let closeP = pointchoice(oldx, oldy, pointsR, binR)[0];
                binR.push(closeP);
                //console.log(binR, closeP, closet);
                let newy = pointsR[closeP][1]- (nsvg.offsetWidth);
                let newx = pointsR[closeP][0] - (nsvg.offsetWidth/2);
                nsvg.style.transition = travel(newx, newy, oldx, oldy, speed, nsvg);
                nsvg.style.transform = "translate(" +newx + 'px,' + newy+ 'px)' ;
                nsvg.style.zIndex = Math.floor(newy);
            }

    }
}

//Speed controller
function travel(newx, newy, oldx, oldy, speed, item){
    let x = newx -oldx;
    let y = newy -oldy;
    let d = Math.sqrt((x*x)+(y*y));
    let traveltime = (d)/speed;
    return "all " + traveltime + "s cubic-bezier(.45,.05,.55,.95)";
}

//Generate Result Grid
function gridsetup(num, bias, rule){
    let name = [];
    var i;
    for(i = 0; i < num; i ++){
        name[i] = randomPointOf(i,bias,rule); 
}
//Ghost Points
    for(let n = 0; n < name.length; n++){
        let dot = document.createElement('div');
        dot.className ='small';
        dot.id = "Demo" +n;
        dot.style.transform = "translate(" + name[n][0] + 'px,' + name[n][1]+ 'px)' ;
        document.getElementById('container').appendChild(dot); 
        }
    console.log(name);
    return name;
}

//Generate Result Grid Points
function randomPointOf(n, bias, val){
    let h = (y)*refHei;
    let w = (x-bx)/2 * refWid;
    let spread = Math.sqrt(bias);
    let xs = w / spread; 
    let ys = h / spread; 
    n = n % bias
    let ny = (n % spread) * ys;
    let nx = (Math.floor(n / spread)) * xs;
    if(val == 1){
        let xx = containerWidth - (Math.floor(Math.random() *  xs + nx));
        let yy = Math.floor(Math.random() *  ys + ny);
        return [xx,yy];
    } else{
        let xx = Math.floor(Math.random() *  xs + nx);
        let yy = Math.floor(Math.random() *  ys + ny);
        return [xx,yy];
    }
}

// Choose what point to Go to
function pointchoice(oldx,oldy,array,bin){
let closet = Infinity;
for(let p = 0; p < array.length; p++){
    if(bin.includes(p)){
    }else{
            let x = array[p][0] - oldx;
            let y = array[p][1] - oldy;
            let c = Math.sqrt((x*x)+(y*y));
            if(c < closet){
                closet = c;
                closeP = p;
            }

    }    
}
return [closeP, closet];

}

// Read Current XY
function findXY(div){
let el = div;
let st = window.getComputedStyle(el, null);
let tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform");
        let values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        let a = values[0];
        let b = values[1];
        let c = values[2];
        let d = values[3];
        let x = values[4];
        let y = values[5];
return [x,y];
}