// ======================================
// HIAC DASHBOARD 2.0
// APP.JS
// MAIN CONTROLLER
// ======================================

// --------------------------------------
// INITIAL LOAD
// --------------------------------------

function init(){

renderAll();

if(window.innerWidth <= 768){

renderMobile();

}

}

// --------------------------------------
// MOBILE RENDERER
// --------------------------------------

function renderMobile(){

renderMobileOfficer();

renderMobileAttendance();

renderMobileTasks();

renderMobileEvents();

renderMobilePodcasts();

renderMobileMarketing();

renderMobileBudget();

}

// --------------------------------------
// DESKTOP RENDERER
// --------------------------------------

function renderDesktop(){

renderSummary();

renderOfficers();

renderAttendance();

renderTasks();

renderEvents();

renderPodcasts();

renderMarketing();

renderBudget();

}

// --------------------------------------
// RENDER EVERYTHING
// --------------------------------------

function renderAll(){

renderDesktop();

if(window.innerWidth <= 768){

renderMobile();

}

}

// --------------------------------------
// WINDOW RESIZE
// --------------------------------------

window.addEventListener(

"resize",

function(){

if(window.innerWidth <= 768){

renderMobile();

}else{

renderDesktop();

}

}

);

// --------------------------------------
// START APP
// --------------------------------------

document.addEventListener(

"DOMContentLoaded",

function(){

init();

}

);
