// ======================================
// HIAC DASHBOARD 2.0
// DATA.JS
// ======================================

// --------------------------------------
// OFFICERS
// --------------------------------------

const officers = [

"Agrani Sinha",
"Khanh Linh Lieu",
"Isabella Panya",
"Cynthia Simmons",
"Selena Hernandez",
"Emmanuelle Vinson",
"Kay Thiemann"

];

const officerInfo = {

"Agrani Sinha":[
"President",
"Full Year"
],

"Khanh Linh Lieu":[
"Vice President",
"Full Year"
],

"Isabella Panya":[
"Treasurer",
"Full Year"
],

"Cynthia Simmons":[
"Marketing Chair",
"Full Year"
],

"Selena Hernandez":[
"Marketing Assistant",
"Fall"
],

"Emmanuelle Vinson":[
"Marketing Assistant",
"Spring"
],

"Kay Thiemann":[
"Faculty Advisor",
"Advisor"
]

};

// --------------------------------------
// TASKS
// --------------------------------------

let tasks = JSON.parse(
localStorage.getItem(
"hiac_tasks"
)
) || [

{
task:"Password Tracker",
owner:"Agrani Sinha",
status:"Completed",
progress:100
},

{
task:"June Newsletter",
owner:"Khanh Linh Lieu",
status:"In Progress",
progress:70
},

{
task:"Executive Board Flyer",
owner:"Cynthia Simmons",
status:"In Progress",
progress:60
}

];

// --------------------------------------
// ATTENDANCE
// --------------------------------------

let attendance = JSON.parse(
localStorage.getItem(
"hiac_attendance"
)
) || [

{
name:"Agrani Sinha",
role:"President",
attendance:100
},

{
name:"Khanh Linh Lieu",
role:"Vice President",
attendance:100
},

{
name:"Isabella Panya",
role:"Treasurer",
attendance:100
},

{
name:"Cynthia Simmons",
role:"Marketing Chair",
attendance:100
},

{
name:"Selena Hernandez",
role:"Marketing Assistant",
attendance:80
},

{
name:"Emmanuelle Vinson",
role:"Marketing Assistant",
attendance:100
},

{
name:"Kay Thiemann",
role:"Faculty Advisor",
attendance:100
}

];

// --------------------------------------
// EVENTS
// --------------------------------------

let events = JSON.parse(
localStorage.getItem(
"hiac_events"
)
) || [

{
event:"HIMSS Networking Event",
lead:"All Officers",
status:"Planning",
progress:20
},

{
event:"HASA Collaboration",
lead:"Agrani Sinha",
status:"In Progress",
progress:35
},

{
event:"Resume Workshop",
lead:"Cynthia Simmons",
status:"Planned",
progress:0
}

];

// --------------------------------------
// PODCASTS
// --------------------------------------

let podcasts = JSON.parse(
localStorage.getItem(
"hiac_podcasts"
)
) || [

{
guest:"Dr. Sarah Crespi",
owner:"Agrani Sinha",
status:"Recorded"
},

{
guest:"Dr. Shyam Paryani",
owner:"Agrani Sinha",
status:"Discussion"
}

];

// --------------------------------------
// MARKETING
// --------------------------------------

let marketing = JSON.parse(
localStorage.getItem(
"hiac_marketing"
)
) || [

{
task:"Executive Board Flyer",
owner:"Cynthia Simmons",
status:"Reviewing"
},

{
task:"Fall Campaign",
owner:"Selena Hernandez",
status:"Planned"
},

{
task:"Spring Transition",
owner:"Emmanuelle Vinson",
status:"Planned"
}

];

// --------------------------------------
// HIMSS BUDGET
// --------------------------------------

let budget = JSON.parse(
localStorage.getItem(
"hiac_budget"
)
) || [

{
category:"Registration",
amount:0,
status:"Planning"
},

{
category:"Hotel",
amount:0,
status:"Planning"
},

{
category:"Flight",
amount:0,
status:"Planning"
},

{
category:"Meals",
amount:0,
status:"Planning"
}

];

// --------------------------------------
// SAVE ALL
// --------------------------------------

function saveData(){

localStorage.setItem(
"hiac_tasks",
JSON.stringify(tasks)
);

localStorage.setItem(
"hiac_attendance",
JSON.stringify(attendance)
);

localStorage.setItem(
"hiac_events",
JSON.stringify(events)
);

localStorage.setItem(
"hiac_podcasts",
JSON.stringify(podcasts)
);

localStorage.setItem(
"hiac_marketing",
JSON.stringify(marketing)
);

localStorage.setItem(
"hiac_budget",
JSON.stringify(budget)
);

}

// --------------------------------------
// BUTTON ACTIONS
// --------------------------------------

function addTask(){

tasks.unshift({

task:"New Task",

owner:"Agrani Sinha",

status:"Not Started",

progress:0

});

saveData();

renderAll();

}

function addMeeting(){

alert(
"Attendance module coming next"
);

}

function exportCSV(){

alert(
"CSV export coming next"
);

}
