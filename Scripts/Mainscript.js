// When Page Loads


document.onload = pageSetUp();



// Page Load Function
function pageSetUp() {
    generateStartingGrid();
    loadLotties();
    let readywidth = document.getElementById("no100").offsetHeight;
    wait(readywidth, 0);


    FadeIn();
    GetDataBase();
}



