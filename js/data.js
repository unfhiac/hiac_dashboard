// ======================================
// HIAC DASHBOARD 2.0
// ADVANCED DATA.JS
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
  "Agrani Sinha": ["President", "Full Year"],
  "Khanh Linh Lieu": ["Vice President", "Full Year"],
  "Isabella Panya": ["Treasurer", "Full Year"],
  "Cynthia Simmons": ["Marketing Chair", "Full Year"],
  "Selena Hernandez": ["Marketing Assistant", "Fall"],
  "Emmanuelle Vinson": ["Marketing Assistant", "Spring"],
  "Kay Thiemann": ["Faculty Advisor", "Advisor"]
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

const eventStatuses = [
  "Proposed",
  "Planning",
  "Marketing",
  "Registration Open",
  "In Progress",
  "Completed",
  "Cancelled"
];

const podcastStatuses = [
  "Prospect",
  "Outreach Sent",
  "Discussion",
  "Confirmed",
  "Scheduled",
  "Recorded",
  "Editing",
  "Ready to Publish",
  "Published",
  "Completed",
  "Declined"
];

const marketingStatuses = [
  "Not Started",
  "Drafting",
  "Reviewing",
  "Scheduled",
  "Published",
  "Completed"
];

const budgetStatuses = [
  "Not Started",
  "Planning",
  "Budgeting",
  "Fundraising",
  "Approved",
  "Completed"
];

// ======================================
// TASKS
// ======================================

let tasks = JSON.parse(localStorage.getItem("hiac_tasks_v4")) || [
  {
    agenda: "First Board Meeting",
    task: "Password Tracker",
    owner: "Agrani Sinha",
    priority: "High",
    status: "Completed",
    due: "2026-05-10",
    progress: 100,
    notes: "Shared and completed."
  },
  {
    agenda: "Second Board Meeting",
    task: "June Newsletter",
    owner: "Khanh Linh Lieu",
    priority: "High",
    status: "In Progress",
    due: "2026-06-30",
    progress: 70,
    notes: "Newsletter is in progress."
  },
  {
    agenda: "Third Board Meeting",
    task: "HIMSS Budget Development",
    owner: "Isabella Panya",
    priority: "Critical",
    status: "In Progress",
    due: "2026-08-01",
    progress: 50,
    notes: "Budget planning for HIMSS 2027."
  },
  {
    agenda: "Strategic Planning",
    task: "Executive Board Flyer",
    owner: "Cynthia Simmons",
    priority: "Medium",
    status: "In Progress",
    due: "2026-07-01",
    progress: 75,
    notes: "Board introduction flyer."
  }
];

// ======================================
// ATTENDANCE
// ======================================

let meetings = JSON.parse(localStorage.getItem("hiac_meetings_v4")) || [
  "Board #1",
  "Board #2",
  "Board #3",
  "Strategic Planning"
];

let attendance = JSON.parse(localStorage.getItem("hiac_attendance_v4")) || [
  {
    name: "Agrani Sinha",
    role: "President",
    "Board #1": "Present",
    "Board #2": "Present",
    "Board #3": "Present",
    "Strategic Planning": "Present"
  },
  {
    name: "Khanh Linh Lieu",
    role: "Vice President",
    "Board #1": "Present",
    "Board #2": "Present",
    "Board #3": "Present",
    "Strategic Planning": "Present"
  },
  {
    name: "Isabella Panya",
    role: "Treasurer",
    "Board #1": "Present",
    "Board #2": "Present",
    "Board #3": "Present",
    "Strategic Planning": "Present"
  },
  {
    name: "Cynthia Simmons",
    role: "Marketing Chair",
    "Board #1": "Present",
    "Board #2": "Present",
    "Board #3": "Present",
    "Strategic Planning": "Present"
  },
  {
    name: "Selena Hernandez",
    role: "Marketing Assistant",
    "Board #1": "N/A",
    "Board #2": "Absent",
    "Board #3": "Present",
    "Strategic Planning": "N/A"
  },
  {
    name: "Emmanuelle Vinson",
    role: "Marketing Assistant",
    "Board #1": "N/A",
    "Board #2": "N/A",
    "Board #3": "Present",
    "Strategic Planning": "N/A"
  },
  {
    name: "Kay Thiemann",
    role: "Faculty Advisor",
    "Board #1": "Advisor Meeting",
    "Board #2": "Advisor Meeting",
    "Board #3": "Present",
    "Strategic Planning": "Advisor Meeting"
  }
];

// ======================================
// EVENTS
// ======================================

let events = JSON.parse(localStorage.getItem("hiac_events_v4")) || [
  {
    event: "HIMSS Networking Event",
    lead: "All Officers",
    status: "Planning",
    target: "2026-08-27",
    progress: 20
  },
  {
    event: "HASA Collaboration",
    lead: "Agrani Sinha",
    status: "In Progress",
    target: "2026-09-30",
    progress: 35
  },
  {
    event: "Resume Workshop",
    lead: "Cynthia Simmons",
    status: "Proposed",
    target: "2026-10-31",
    progress: 0
  }
];

// ======================================
// PODCASTS
// ======================================

let podcasts = JSON.parse(localStorage.getItem("hiac_podcasts_v4")) || [
  {
    guest: "Dr. Sarah Crespi",
    owner: "Agrani Sinha",
    status: "Recorded",
    target: "2026-07-01",
    notes: "Awaiting publication."
  },
  {
    guest: "Dr. Shyam Paryani",
    owner: "Agrani Sinha",
    status: "Discussion",
    target: "2026-07-31",
    notes: "Initial outreach underway."
  }
];

// ======================================
// MARKETING
// ======================================

let marketing = JSON.parse(localStorage.getItem("hiac_marketing_v4")) || [
  {
    task: "Executive Board Flyer",
    owner: "Cynthia Simmons",
    status: "Reviewing",
    target: "2026-07-01",
    notes: "Board introduction flyer."
  },
  {
    task: "Fall Marketing Campaign",
    owner: "Selena Hernandez",
    status: "Not Started",
    target: "2026-09-15",
    notes: "Fall recruitment campaign."
  },
  {
    task: "Spring Marketing Transition",
    owner: "Emmanuelle Vinson",
    status: "Not Started",
    target: "2027-01-15",
    notes: "Spring onboarding."
  }
];

// ======================================
// HIMSS BUDGET
// ======================================

let budget = JSON.parse(localStorage.getItem("hiac_budget_v4")) || [
  {
    category: "Registration",
    perStudent: 0,
    students: 8,
    status: "Budgeting"
  },
  {
    category: "Hotel",
    perStudent: 0,
    students: 8,
    status: "Planning"
  },
  {
    category: "Flight",
    perStudent: 0,
    students: 8,
    status: "Planning"
  },
  {
    category: "Transportation",
    perStudent: 0,
    students: 8,
    status: "Planning"
  },
  {
    category: "Meals",
    perStudent: 0,
    students: 8,
    status: "Planning"
  },
  {
    category: "Contingency",
    perStudent: 0,
    students: 8,
    status: "Planning"
  },
  {
    category: "Funds Raised",
    perStudent: 0,
    students: 1,
    status: "Fundraising"
  }
];

// ======================================
// AVAILABILITY
// ======================================

let schedule = JSON.parse(localStorage.getItem("hiac_schedule_v4")) || {};

// ======================================
// SAVE DATA
// ======================================

function saveData(){

  localStorage.setItem(
    "hiac_tasks_v4",
    JSON.stringify(tasks)
  );

  localStorage.setItem(
    "hiac_meetings_v4",
    JSON.stringify(meetings)
  );

  localStorage.setItem(
    "hiac_attendance_v4",
    JSON.stringify(attendance)
  );

  localStorage.setItem(
    "hiac_events_v4",
    JSON.stringify(events)
  );

  localStorage.setItem(
    "hiac_podcasts_v4",
    JSON.stringify(podcasts)
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
