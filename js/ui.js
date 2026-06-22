// ======================================
// HIAC DASHBOARD 2.0
// UI.JS
// DESKTOP RENDERERS
// ======================================
// ======================================
// HELPERS
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

// ======================================
// KPI SUMMARY
// ======================================

function renderSummary(){

const totalTasks =
tasks.length;

const completed =
tasks.filter(
t=>t.status==="Completed"
).length;

const eventCount =
events.length;

const attendanceRate =
Math.round(

attendance
.map(a=>attendancePercent(a))
.filter(x=>x!=="N/A")
.reduce((a,b)=>a+b,0)

/

attendance.length

);

document.getElementById(
"totalTasks"
).innerText =
totalTasks;

document.getElementById(
"completedTasks"
).innerText =
completed;

document.getElementById(
"eventCount"
).innerText =
eventCount;

document.getElementById(
"attendanceRate"
).innerText =
attendanceRate+"%";

}
function clean(value){

return String(value)
.replaceAll(" ","");

}

// ======================================
// SUMMARY KPI
// ======================================

function renderSummary(){

const totalTasks =
tasks.length;

const completedTasks =
tasks.filter(
t=>t.status==="Completed"
).length;

const eventCount =
events.length;

const avgAttendance =
attendance.length
?
Math.round(
attendance.reduce(
(sum,a)=>
sum+a.attendance,
0
)/attendance.length
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
completedTasks;

document.getElementById(
"eventCount"
).innerText =
eventCount;

document.getElementById(
"attendanceRate"
).innerText =
avgAttendance+"%";

}

// ======================================
// OFFICERS
// ======================================

function renderOfficers(){

const container =
document.getElementById(
"officerCards"
);

if(!container) return;

container.innerHTML =

`<div class="officer-grid">

${Object.keys(
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

<strong>
${related.length}
</strong>

</div>

<div class="officer-stat">

<small>Done</small>

<strong>
${completed}
</strong>

</div>

<div class="officer-stat">

<small>Active</small>

<strong>
${active}
</strong>

</div>

</div>

</div>

`;

}).join("")}

</div>`;

}

// ======================================
// ATTENDANCE
// ======================================

function renderAttendance(){

const container =
document.getElementById(
"attendanceCards"
);

if(!container) return;

container.innerHTML =

`<div class="card-grid">

${attendance.map(a=>`

<div class="card">

<div class="row">

<h3>
${a.name}
</h3>

<span class="badge Completed">

${a.attendance}%

</span>

</div>

<p>
${a.role}
</p>

<div class="progress">

<div
class="fill"
style="
width:${a.attendance}%
">
</div>

</div>

</div>

`).join("")}

</div>`;

}

// ======================================
// TASKS
// ======================================

function renderTasks(){

const container =
document.getElementById(
"taskCards"
);

if(!container) return;

container.innerHTML =

`<div class="card-grid">

${tasks.map(t=>`

<div class="card">

<div class="row">

<h3>
${t.task}
</h3>

<span class="badge ${clean(t.status)}">

${t.status}

</span>

</div>

<p>

Owner:
<b>${t.owner}</b>

</p>

<div class="progress">

<div
class="fill"
style="
width:${t.progress}%
">
</div>

</div>

<p>

${t.progress}%

</p>

</div>

`).join("")}

</div>`;

}

// ======================================
// EVENTS
// ======================================

function renderEvents(){

const container =
document.getElementById(
"eventCards"
);

if(!container) return;

container.innerHTML =

`<div class="card-grid">

${events.map(e=>`

<div class="card">

<div class="row">

<h3>
${e.event}
</h3>

<span class="badge ${clean(e.status)}">

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

`).join("")}

</div>`;

}

// ======================================
// PODCASTS
// ======================================

function renderPodcasts(){

const container =
document.getElementById(
"podcastCards"
);

if(!container) return;

container.innerHTML =

`<div class="card-grid">

${podcasts.map(p=>`

<div class="card">

<div class="row">

<h3>
${p.guest}
</h3>

<span class="badge ${clean(p.status)}">

${p.status}

</span>

</div>

<p>

Owner:
<b>${p.owner}</b>

</p>

</div>

`).join("")}

</div>`;

}

// ======================================
// MARKETING
// ======================================

function renderMarketing(){

const container =
document.getElementById(
"marketingCards"
);

if(!container) return;

container.innerHTML =

`<div class="card-grid">

${marketing.map(m=>`

<div class="card">

<div class="row">

<h3>
${m.task}
</h3>

<span class="badge ${clean(m.status)}">

${m.status}

</span>

</div>

<p>

Owner:
<b>${m.owner}</b>

</p>

</div>

`).join("")}

</div>`;

}

// ======================================
// HIMSS BUDGET
// ======================================

function renderBudget(){

const container =
document.getElementById(
"budgetCards"
);

if(!container) return;

container.innerHTML =

`<div class="card-grid">

${budget.map(b=>`

<div class="card">

<div class="row">

<h3>
${b.category}
</h3>

<span class="badge ${clean(b.status)}">

${b.status}

</span>

</div>

<h2>

$${Number(
b.amount
).toLocaleString()}

</h2>

</div>

`).join("")}

</div>`;

}

// ======================================
// RENDER ALL
// ======================================

function renderAll(){

renderSummary();

renderOfficers();

renderAttendance();

renderTasks();

renderEvents();

renderPodcasts();

renderMarketing();

renderBudget();

}
