// ======================================
// HIAC DASHBOARD
// DATA.JS
// ======================================

const officers = [

"Agrani Sinha",
"Khanh Linh Lieu",
"Isabella Panya",
"Cynthia Simmons",
"Selena Hernandez",
"Emmanuelle Vinson",
"Kay Thiemann",
"All Officers"

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
"Fall 2026"
],

"Emmanuelle Vinson":[
"Marketing Assistant",
"Spring 2027"
],

"Kay Thiemann":[
"Faculty Advisor",
"Advisor"
]

};

const agendas = [

"First Board Meeting",
"Second Board Meeting",
"Third Board Meeting",
"Strategic Planning"

];

const priorities = [

"Critical",
"High",
"Medium",
"Low"

];

const taskStatuses = [

"Not Started",
"In Progress",
"Completed",
"On Hold",
"Blocked",
"Declined"

];

let currentOfficerIndex = 0;

/* ======================================
TASKS
====================================== */

let tasks = JSON.parse(

localStorage.getItem(
"hiac_tasks_v4"
)

) || [

{
agenda:"First Board Meeting",
task:"Password Tracker",
owner:"Agrani Sinha",
priority:"High",
status:"Completed",
due:"2026-05-10",
progress:100,
notes:"Completed"
},

{
agenda:"Second Board Meeting",
task:"June Newsletter",
owner:"Khanh Linh Lieu",
priority:"High",
status:"In Progress",
due:"2026-06-30",
progress:70,
notes:"Newsletter in progress"
},

{
agenda:"Third Board Meeting",
task:"HIMSS Budget Development",
owner:"Isabella Panya",
priority:"Critical",
status:"In Progress",
due:"2026-08-01",
progress:50,
notes:"Budget planning underway"
},

{
agenda:"Strategic Planning",
task:"Resume Workshop",
owner:"Cynthia Simmons",
priority:"Medium",
status:"Not Started",
due:"2026-10-31",
progress:0,
notes:"Upcoming"
}

];

/* ======================================
ATTENDANCE
====================================== */

let attendance = JSON.parse(

localStorage.getItem(
"hiac_attendance_v4"
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
attendance:75
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

/* ======================================
PODCASTS
====================================== */

let podcasts = JSON.parse(

localStorage.getItem(
"hiac_podcasts_v4"
)

) || [

{
guest:"Dr. Sarah Crespi",
owner:"Agrani Sinha",
status:"Recorded",
target:"2026-07-01",
notes:"Awaiting publication"
},

{
guest:"Dr. Shyam Paryani",
owner:"Agrani Sinha",
status:"Discussion",
target:"2026-07-31",
notes:"Initial outreach"
}

];

/* ======================================
EVENTS
====================================== */

let events = JSON.parse(

localStorage.getItem(
"hiac_events_v4"
)

) || [

{
event:"HIMSS Networking Event",
lead:"All Officers",
status:"Planning",
target:"2026-08-27",
progress:20
},

{
event:"HASA Collaboration",
lead:"Agrani Sinha",
status:"In Progress",
target:"2026-09-30",
progress:35
},

{
event:"Heads Up Workshop",
lead:"Agrani Sinha",
status:"Planning",
target:"2026-11-30",
progress:40
}

];

/* ======================================
MARKETING
====================================== */

let marketing = JSON.parse(

localStorage.getItem(
"hiac_marketing_v4"
)

) || [

{
task:"Executive Board Flyer",
owner:"Cynthia Simmons",
status:"Reviewing",
target:"2026-07-01",
notes:"Board introduction flyer"
},

{
task:"Fall Marketing Campaign",
owner:"Selena Hernandez",
status:"Not Started",
target:"2026-09-15",
notes:"Recruitment campaign"
},

{
task:"Spring Marketing Transition",
owner:"Emmanuelle Vinson",
status:"Not Started",
target:"2027-01-15",
notes:"Spring onboarding"
}

];

/* ======================================
HIMSS BUDGET
====================================== */

let budget = JSON.parse(

localStorage.getItem(
"hiac_budget_v4"
)

) || [

{
category:"Registration",
amount:8000,
status:"Budgeting"
},

{
category:"Hotel",
amount:6000,
status:"Planning"
},

{
category:"Flights",
amount:5000,
status:"Planning"
},

{
category:"Transportation",
amount:1000,
status:"Planning"
},

{
category:"Meals",
amount:1200,
status:"Planning"
},

{
category:"Funds Raised",
amount:2500,
status:"Fundraising"
}

];

/* ======================================
AVAILABILITY
====================================== */

let schedule = JSON.parse(

localStorage.getItem(
"hiac_schedule_v4"
)

) || {};

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
