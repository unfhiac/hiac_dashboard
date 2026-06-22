// ======================================
// HIAC DASHBOARD
// MOBILE.JS
// MOBILE APP RENDERERS
// ======================================

function renderMobileOfficer(){

const el =
document.getElementById(
"mobileOfficer"
);

if(!el) return;

el.innerHTML = `

<div class="mobile-section">

<h2 class="mobile-title">

Executive Board

</h2>

${Object.keys(officerInfo).map(name=>`

<div class="mobile-card">

<h3>${name}</h3>

<div class="mobile-row">

<span class="mobile-label">
Role
</span>

<span class="mobile-value">
${officerInfo[name][0]}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Term
</span>

<span class="mobile-value">
${officerInfo[name][1]}
</span>

</div>

</div>

`).join("")}

</div>

`;

}

// ======================================
// ATTENDANCE
// ======================================

function renderMobileAttendance(){

const el =
document.getElementById(
"mobileAttendance"
);

if(!el) return;

el.innerHTML = `

<div class="mobile-section">

<h2 class="mobile-title">

Attendance

</h2>

${attendance.map(a=>`

<div class="mobile-card">

<h3>
${a.name}
</h3>

<div class="mobile-row">

<span class="mobile-label">
Role
</span>

<span class="mobile-value">
${a.role}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Attendance
</span>

<span class="mobile-value">
${a.attendance}%
</span>

</div>

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

</div>

`;

}

// ======================================
// TASKS
// ======================================

function renderMobileTasks(){

const el =
document.getElementById(
"mobileTasks"
);

if(!el) return;

el.innerHTML = `

<div class="mobile-section">

<h2 class="mobile-title">

Agenda Tasks

</h2>

${tasks.map(t=>`

<div class="mobile-card">

<h3>
${t.task}
</h3>

<div class="mobile-row">

<span class="mobile-label">
Agenda
</span>

<span class="mobile-value">
${t.agenda}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Owner
</span>

<span class="mobile-value">
${t.owner}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Priority
</span>

<span class="mobile-value">
${t.priority}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Status
</span>

<span class="badge ${clean(t.status)}">
${t.status}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Due
</span>

<span class="mobile-value">
${t.due}
</span>

</div>

<div class="progress">

<div
class="fill"
style="
width:${t.progress}%
">
</div>

</div>

<p>

${t.progress}% Complete

</p>

</div>

`).join("")}

</div>

`;

}

// ======================================
// EVENTS
// ======================================

function renderMobileEvents(){

const el =
document.getElementById(
"mobileEvents"
);

if(!el) return;

el.innerHTML = `

<div class="mobile-section">

<h2 class="mobile-title">

Events

</h2>

${events.map(e=>`

<div class="mobile-card">

<h3>
${e.event}
</h3>

<div class="mobile-row">

<span class="mobile-label">
Lead
</span>

<span class="mobile-value">
${e.lead}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Status
</span>

<span class="badge ${clean(e.status)}">
${e.status}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Target Date
</span>

<span class="mobile-value">
${e.target}
</span>

</div>

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

</div>

`;

}

// ======================================
// PODCASTS
// ======================================

function renderMobilePodcasts(){

const el =
document.getElementById(
"mobilePodcasts"
);

if(!el) return;

el.innerHTML = `

<div class="mobile-section">

<h2 class="mobile-title">

Podcasts

</h2>

${podcasts.map(p=>`

<div class="mobile-card">

<h3>
${p.guest}
</h3>

<div class="mobile-row">

<span class="mobile-label">
Owner
</span>

<span class="mobile-value">
${p.owner}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Status
</span>

<span class="badge ${clean(p.status)}">
${p.status}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Target
</span>

<span class="mobile-value">
${p.target}
</span>

</div>

<p>
${p.notes}
</p>

</div>

`).join("")}

</div>

`;

}

// ======================================
// MARKETING
// ======================================

function renderMobileMarketing(){

const el =
document.getElementById(
"mobileMarketing"
);

if(!el) return;

el.innerHTML = `

<div class="mobile-section">

<h2 class="mobile-title">

Marketing

</h2>

${marketing.map(m=>`

<div class="mobile-card">

<h3>
${m.task}
</h3>

<div class="mobile-row">

<span class="mobile-label">
Owner
</span>

<span class="mobile-value">
${m.owner}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Status
</span>

<span class="badge ${clean(m.status)}">
${m.status}
</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Due
</span>

<span class="mobile-value">
${m.target}
</span>

</div>

<p>
${m.notes}
</p>

</div>

`).join("")}

</div>

`;

}

// ======================================
// HIMSS BUDGET
// ======================================

function renderMobileBudget(){

const el =
document.getElementById(
"mobileBudget"
);

if(!el) return;

el.innerHTML = `

<div class="mobile-section">

<h2 class="mobile-title">

HIMSS Budget

</h2>

${budget.map(b=>`

<div class="mobile-card">

<h3>
${b.category}
</h3>

<div class="mobile-row">

<span class="mobile-label">
Amount
</span>

<span class="mobile-value">

$${Number(
b.amount
).toLocaleString()}

</span>

</div>

<div class="mobile-row">

<span class="mobile-label">
Status
</span>

<span class="badge ${clean(b.status)}">

${b.status}

</span>

</div>

</div>

`).join("")}

</div>

`;

}
