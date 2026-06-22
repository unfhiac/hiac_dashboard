// ======================================
// HIAC DASHBOARD 2.0
// APP.JS
// MAIN CONTROLLER
// ======================================

/* ======================================
SAVE
====================================== */

function save(){

localStorage.setItem(
"hiac_tasks_v4",
JSON.stringify(tasks)
);

localStorage.setItem(
"hiac_attendance_v4",
JSON.stringify(attendance)
);

localStorage.setItem(
"hiac_podcasts_v4",
JSON.stringify(podcasts)
);

localStorage.setItem(
"hiac_events_v4",
JSON.stringify(events)
);

localStorage.setItem(
"hiac_marketing_v4",
JSON.stringify(marketing)
);

localStorage.setItem(
"hiac_budget_v4",
JSON.stringify(budget)
);

localStorage.setItem(
"hiac_schedule_v4",
JSON.stringify(schedule)
);

}

/* ======================================
OFFICER NAVIGATION
====================================== */

function nextOfficer(){

currentOfficerIndex++;

if(
currentOfficerIndex >=
Object.keys(officerInfo).length
){

currentOfficerIndex = 0;

}

renderOfficers();

}

function prevOfficer(){

currentOfficerIndex--;

if(
currentOfficerIndex < 0
){

currentOfficerIndex =
Object.keys(officerInfo).length-1;

}

renderOfficers();

}

/* ======================================
ADD TASK
====================================== */

function addTask(){

tasks.unshift({

agenda:"Strategic Planning",

task:"New Task",

owner:"Agrani Sinha",

priority:"Medium",

status:"Not Started",

due:new Date()
.toISOString()
.split("T")[0],

progress:0,

notes:""

});

save();

renderAll();

}

/* ======================================
DELETE TASK
====================================== */

function deleteTask(index){

if(
!confirm(
"Delete this task?"
)
) return;

tasks.splice(index,1);

save();

renderAll();

}

/* ======================================
ADD PODCAST
====================================== */

function addPodcast(){

podcasts.unshift({

guest:"New Guest",

owner:"Agrani Sinha",

status:"Prospect",

target:"",

notes:""

});

save();

renderAll();

}

/* ======================================
ADD MARKETING TASK
====================================== */

function addMarketingTask(){

marketing.unshift({

task:"New Marketing Task",

owner:"Cynthia Simmons",

status:"Not Started",

target:"",

notes:""

});

save();

renderAll();

}

/* ======================================
ADD EVENT
====================================== */

function addEvent(){

events.unshift({

event:"New Event",

lead:"Agrani Sinha",

status:"Planning",

target:"",

progress:0

});

save();

renderAll();

}

/* ======================================
ADD BUDGET ITEM
====================================== */

function addBudgetItem(){

budget.unshift({

category:"New Category",

amount:0,

status:"Planning"

});

save();

renderAll();

}

/* ======================================
ADD MEETING
====================================== */

function addMeeting(){

const meetingName =
prompt(
"Meeting Name"
);

if(!meetingName)
return;

attendance.forEach(a=>{

if(!a.meetings){

a.meetings=[];

}

a.meetings.push({

name:meetingName,

status:"Present"

});

});

save();

renderAll();

}

/* ======================================
CSV EXPORT
====================================== */

function exportCSV(){

let csv =
"Agenda,Task,Owner,Priority,Status,Due,Progress\n";

tasks.forEach(t=>{

csv +=

`"${t.agenda}",
"${t.task}",
"${t.owner}",
"${t.priority}",
"${t.status}",
"${t.due}",
"${t.progress}"\n`;

});

const blob =
new Blob(
[csv],
{
type:"text/csv"
}
);

const link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"HIAC_Dashboard.csv";

link.click();

}

/* ======================================
SEARCH FILTERS
====================================== */

function initializeFilters(){

const search =
document.getElementById(
"search"
);

if(search){

search.addEventListener(
"keyup",
renderTasks
);

}

}

/* ======================================
WINDOW RESIZE
====================================== */

window.addEventListener(

"resize",

()=>{

renderAll();

}

);

/* ======================================
RENDER ALL
====================================== */

function renderAll(){

renderSummary();

/* MOBILE */

if(
window.innerWidth <= 768
){

renderMobileOfficer();

renderMobileAttendance();

renderMobileTasks();

renderMobileEvents();

renderMobilePodcasts();

renderMobileMarketing();

renderMobileBudget();

return;

}

/* DESKTOP */

renderOfficers();

renderAttendance();

renderTasks();

renderEvents();

renderPodcasts();

renderMarketing();

renderBudget();

renderAnalytics();

}

/* ======================================
INITIALIZATION
====================================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

initializeFilters();

renderAll();

}

);

/* ======================================
TOUCH SWIPE OFFICERS
====================================== */

let touchStartX = 0;

document.addEventListener(

"touchstart",

e=>{

touchStartX =
e.changedTouches[0].clientX;

}

);

document.addEventListener(

"touchend",

e=>{

const touchEndX =
e.changedTouches[0].clientX;

if(
touchStartX -
touchEndX > 60
){

nextOfficer();

}

if(
touchEndX -
touchStartX > 60
){

prevOfficer();

}

}

);

/* ======================================
AUTO SAVE EVERY 30 SEC
====================================== */

setInterval(

()=>{

save();

},

30000

);

/* ======================================
CONSOLE READY
====================================== */

console.log(

"HIAC Dashboard Loaded"

);
