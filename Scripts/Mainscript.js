// When Page Loads
var Logger = false;

document.onload = pageSetUp();



// Page Load Function
function pageSetUp() {
    generateStartingGrid();
    loadLotties();
    let readywidth = document.getElementById("no99").offsetHeight;
    wait(readywidth, 0);
    FadeIn();
    GetDataBase();
}

function logger(func,thing){
    if(Logger == true){
    console.log(`${func} whispers:`);
    console.log(thing);
    }
}



