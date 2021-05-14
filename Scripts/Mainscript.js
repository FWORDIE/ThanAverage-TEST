// When Page Loads


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
    console.log(`${func} whispers:`);
    console.log(thing);
}



