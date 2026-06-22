// ======================================
// HIAC DASHBOARD 2.0
// UI.JS
// DESKTOP RENDERERS
// ======================================

function clean(value){

return String(value)
.replaceAll(" ","");

}

function option(list,current){

return list.map(x=>`

<option
${x===current?"selected":""}
>

${x}

</option>

`).join("");

}

/* ======================================
SUMMARY
====================================== */

function renderSummary(){

const totalTasks =
tasks.length;

const completed =
tasks.filter(
t=>t.status==="Completed"
).length;

const progress =
tasks.filter(
t=>t.status==="In Progress"
).length;

const upcoming =
tasks.filter(
t=>t.status==="Not Started"
).length;

const blocked =
tasks.filter(
t=>
t.status==="Blocked" ||
t.status==="Declined"
).length;

const completion =
totalTasks
?
Math.round(
(completed/totalTasks)*100
)
:
0;

document.getElementById(
"totalTasks"
).innerText =
totalTasks;

document.getElementById(
"completedTasks"
).innerText =
completed;

document.getElementById(
"progressTasks"
).innerText =
progress;

document.getElementById(
"upcomingTasks"
).innerText =
upcoming;

document.getElementById(
"declinedTasks"
).innerText =
blocked;

document.getElementById(
"completionRate"
).innerText =
completion + "%";

}

/* ======================================
OFFICERS
====================================== */

function renderOfficers(){

const container =
document.getElementById(
"officerCards"
);

if(!container) return;

container.innerHTML =

Object.keys(
officerInfo
).map(name=>{

const related =
tasks.filter(
t=>t.owner===name
);

const completed =
related.filter(
t=>t.status==="Completed"
).length;

const active =
related.filter(
t=>t.status==="In Progress"
).length;

const rate =
related.length
?
Math.round(
(completed/related.length)*100
)
:
0;

return `

<div class="officer-card">

<div class="officer-header">

<div>

<div class="officer-name">
${name}
</div>

<div class="officer-role">
${officerInfo[name][0]}
</div>

</div>

<span class="badge Planned">
${officerInfo[name][1]}
</span>

</div>

<div class="progress">
<div
class="fill"
style="width:${rate}%">
</div>
</div>

<div class="officer-stats">

<div class="officer-stat">
<small>Tasks</small>
<strong>${related.length}</strong>
</div>

<div class="officer-stat">
<small>Done</small>
<strong>${completed}</strong>
</div>

<div class="officer-stat">
<small>Active</small>
<strong>${active}</strong>
</div>

</div>

</div>

`;

}).join("");

}

/* ======================================
ATTENDANCE
====================================== */

function renderAttendance(){

const table =
document.getElementById(
"attendanceTable"
);

if(!table) return;

table.innerHTML="";

attendance.forEach(a=>{

table.innerHTML += `

<tr>

<td>${a.name}</td>

<td>${a.role}</td>

<td>${a.attendance}%</td>

</tr>

`;

});

}

/* ======================================
TASKS
====================================== */

function renderTasks(){

const table =
document.getElementById(
"taskTable"
);

if(!table) return;

table.innerHTML="";

tasks.forEach((t,index)=>{

table.innerHTML += `

<tr>

<td>${t.agenda}</td>

<td>${t.task}</td>

<td>${t.owner}</td>

<td>${t.priority}</td>

<td>

<span
class="badge ${clean(t.status)}">

${t.status}

</span>

</td>

<td>${t.due}</td>

<td>

<div class="progress">

<div
class="fill"
style="
width:${t.progress}%
">
</div>

</div>

${t.progress}%

</td>

<td>${t.notes}</td>

<td>

<button
class="red"
onclick="deleteTask(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

/* ======================================
EVENTS
====================================== */

function renderEvents(){

const container =
document.getElementById(
"eventCards"
);

if(!container) return;

container.innerHTML =

events.map(e=>`

<div class="card">

<div class="row">

<h3>${e.event}</h3>

<span
class="badge ${clean(e.status)}">

${e.status}

</span>

</div>

<p>

Lead:
<b>${e.lead}</b>

</p>

<div class="progress">

<div
class="fill"
style="
width:${e.progress}%
">
</div>

</div>

</div>

`).join("");

}

/* ======================================
PODCASTS
====================================== */

function renderPodcasts(){

const table =
document.getElementById(
"podcastTable"
);

if(!table) return;

table.innerHTML="";

podcasts.forEach(p=>{

table.innerHTML += `

<tr>

<td>${p.guest}</td>

<td>${p.owner}</td>

<td>${p.status}</td>

<td>${p.target}</td>

<td>${p.notes}</td>

<td></td>

</tr>

`;

});

}

/* ======================================
MARKETING
====================================== */

function renderMarketing(){

const table =
document.getElementById(
"marketingTable"
);

if(!table) return;

table.innerHTML="";

marketing.forEach(m=>{

table.innerHTML += `

<tr>

<td>${m.task}</td>

<td>${m.owner}</td>

<td>${m.status}</td>

<td>${m.target}</td>

<td>${m.notes}</td>

<td></td>

</tr>

`;

});

}

/* ======================================
HIMSS BUDGET
====================================== */

function renderBudget(){

const table =
document.getElementById(
"himssBody"
);

if(!table) return;

table.innerHTML="";

budget.forEach(b=>{

table.innerHTML += `

<tr>

<td>${b.category}</td>

<td colspan="2"></td>

<td>

$${Number(
b.amount
).toLocaleString()}

</td>

<td>

<span
class="badge ${clean(b.status)}">

${b.status}

</span>

</td>

</tr>

`;

});

}

/* ======================================
ANALYTICS
====================================== */

function renderAnalytics(){

renderMiniChart(

"statusChart",

[
"Completed",
"In Progress",
"Not Started"
],

label=>

tasks.filter(
t=>t.status===label
).length

);

}

function renderMiniChart(
id,
labels,
fn
){

const el =
document.getElementById(id);

if(!el) return;

el.innerHTML="";

const max =
Math.max(
...labels.map(fn),
1
);

labels.forEach(label=>{

const value =
fn(label);

const height =
(value/max)*220;

el.innerHTML += `

<div class="barcol">

<div
class="bar"
style="
height:${height}px
">
</div>

<div>
${label}
</div>

<b>
${value}
</b>

</div>

`;

});

}

/* ======================================
CSV EXPORT
====================================== */

function exportCSV(){

let csv =
"Agenda,Task,Owner,Priority,Status,Due,Progress\n";

tasks.forEach(t=>{

csv +=

`${t.agenda},
${t.task},
${t.owner},
${t.priority},
${t.status},
${t.due},
${t.progress}\n`;

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
DELETE TASK
====================================== */

function deleteTask(index){

tasks.splice(index,1);

save();

renderAll();

}
