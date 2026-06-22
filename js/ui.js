// ======================================
// HIAC DASHBOARD 2.0
// UI.JS
// DESKTOP RENDERERS + ADVANCED FEATURES
// ======================================

// ======================================
// HELPERS
// ======================================

function clean(value){
  return String(value || "")
    .replaceAll(" ","")
    .replaceAll("/","");
}

function option(list,current){
  return list.map(x=>`
    <option ${x===current?"selected":""}>
      ${x}
    </option>
  `).join("");
}

function safeNumber(value){
  return Number(value) || 0;
}

// ======================================
// ATTENDANCE CALCULATION
// ======================================

function attendancePercent(member){

  let eligible = 0;
  let present = 0;

  meetings.forEach(meeting=>{

    const value = member[meeting];

    if([
      "Present",
      "Absent",
      "Excused",
      "Virtual",
      "Advisor Meeting"
    ].includes(value)){

      eligible++;

      if(
        value === "Present" ||
        value === "Virtual" ||
        value === "Advisor Meeting"
      ){
        present++;
      }

      if(value === "Excused"){
        present += 0.5;
      }

    }

  });

  return eligible
    ? Math.round((present / eligible) * 100)
    : "N/A";

}

function averageAttendance(){

  const rates = attendance
    .map(a=>attendancePercent(a))
    .filter(x=>x !== "N/A");

  return rates.length
    ? Math.round(rates.reduce((a,b)=>a+b,0) / rates.length)
    : 0;

}

// ======================================
// SUMMARY KPI
// ======================================

function renderSummary(){

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    t=>t.status === "Completed"
  ).length;

  const eventCount = events.length;

  const avgAttendance = averageAttendance();

  const budgetTotal = calculateBudget().target;

  document.getElementById("totalTasks").innerText = totalTasks;

  document.getElementById("completedTasks").innerText = completedTasks;

  document.getElementById("eventCount").innerText = eventCount;

  document.getElementById("attendanceRate").innerText = avgAttendance + "%";

  const budgetEl = document.getElementById("budgetTotal");

  if(budgetEl){
    budgetEl.innerText = "$" + budgetTotal.toLocaleString();
  }

}

// ======================================
// OFFICERS
// ======================================

function renderOfficers(){

  const container = document.getElementById("officerCards");

  if(!container) return;

  container.innerHTML = `
    <div class="officer-grid">

      ${Object.keys(officerInfo).map(name=>{

        const related = tasks.filter(
          t=>t.owner === name || t.owner === "All Officers"
        );

        const completed = related.filter(
          t=>t.status === "Completed"
        ).length;

        const active = related.filter(
          t=>t.status === "In Progress"
        ).length;

        const upcoming = related.filter(
          t=>t.status === "Not Started"
        ).length;

        const rate = related.length
          ? Math.round((completed / related.length) * 100)
          : 0;

        const memberAttendance = attendancePercent(
          attendance.find(a=>a.name === name) || {}
        );

        const workload =
          related.length > 8
          ? "High"
          : related.length > 4
          ? "Medium"
          : "Low";

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
              <div class="fill" style="width:${rate}%"></div>
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

              <div class="officer-stat">
                <small>Upcoming</small>
                <strong>${upcoming}</strong>
              </div>

              <div class="officer-stat">
                <small>Attendance</small>
                <strong>
                  ${memberAttendance}${memberAttendance==="N/A"?"":"%"}
                </strong>
              </div>

              <div class="officer-stat">
                <small>Workload</small>
                <strong>${workload}</strong>
              </div>

            </div>

          </div>
        `;

      }).join("")}

    </div>
  `;

}

// ======================================
// ATTENDANCE MATRIX
// ======================================

function renderAttendance(){

  const container = document.getElementById("attendanceCards");

  if(!container) return;

  const statuses = [
    "Present",
    "Absent",
    "Excused",
    "Virtual",
    "Advisor Meeting",
    "N/A"
  ];

  container.innerHTML = `
    <div class="attendance-summary-grid">

      <div class="mini-summary-card">
        <span>Total Meetings</span>
        <strong>${meetings.length}</strong>
      </div>

      <div class="mini-summary-card">
        <span>Average Attendance</span>
        <strong>${averageAttendance()}%</strong>
      </div>

      <div class="mini-summary-card">
        <span>Members</span>
        <strong>${attendance.length}</strong>
      </div>

    </div>

    <button onclick="addMeeting()" class="section-btn">
      + Add Board Meeting
    </button>

    <div class="table-wrap">

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            ${meetings.map(m=>`<th>${m}</th>`).join("")}
            <th>Attendance %</th>
          </tr>
        </thead>

        <tbody>

          ${attendance.map((member,rowIndex)=>`

            <tr>

              <td>${member.name}</td>

              <td>${member.role}</td>

              ${meetings.map(meeting=>`

                <td>
                  <select
                    onchange="
                      attendance[${rowIndex}]['${meeting}']=this.value;
                      saveData();
                      renderAll();
                    "
                  >
                    ${option(statuses,member[meeting] || "N/A")}
                  </select>
                </td>

              `).join("")}

              <td>
                <strong>
                  ${attendancePercent(member)}
                  ${attendancePercent(member)==="N/A"?"":"%"}
                </strong>
              </td>

            </tr>

          `).join("")}

        </tbody>

      </table>

    </div>
  `;

}

// ======================================
// TASK FILTERS + EDITABLE TASKS
// ======================================

function renderTasks(){

  const container = document.getElementById("taskCards");

  if(!container) return;

  const searchValue =
    document.getElementById("taskSearch")?.value?.toLowerCase() || "";

  const agendaValue =
    document.getElementById("agendaFilter")?.value || "All Agendas";

  const ownerValue =
    document.getElementById("ownerFilter")?.value || "All Owners";

  const statusValue =
    document.getElementById("statusFilter")?.value || "All Statuses";

  const filteredTasks = tasks.filter(t=>{

    const searchMatch =
      (t.task + t.owner + t.agenda + t.notes)
      .toLowerCase()
      .includes(searchValue);

    const agendaMatch =
      agendaValue === "All Agendas" || t.agenda === agendaValue;

    const ownerMatch =
      ownerValue === "All Owners" || t.owner === ownerValue;

    const statusMatch =
      statusValue === "All Statuses" || t.status === statusValue;

    return searchMatch && agendaMatch && ownerMatch && statusMatch;

  });

  container.innerHTML = `
    <div class="filters">

      <input
        id="taskSearch"
        placeholder="Search tasks..."
        onkeyup="renderTasks()"
        value="${searchValue}"
      >

      <select id="agendaFilter" onchange="renderTasks()">
        <option>All Agendas</option>
        ${option(agendas,agendaValue)}
      </select>

      <select id="ownerFilter" onchange="renderTasks()">
        <option>All Owners</option>
        ${option(officers,ownerValue)}
      </select>

      <select id="statusFilter" onchange="renderTasks()">
        <option>All Statuses</option>
        ${option(taskStatuses,statusValue)}
      </select>

    </div>

    <div class="table-wrap">

      <table>

        <thead>
          <tr>
            <th>Agenda</th>
            <th>Task</th>
            <th>Owner</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due</th>
            <th>Progress</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          ${filteredTasks.map(t=>{

            const index = tasks.indexOf(t);

            return `
              <tr>

                <td>
                  <select
                    onchange="
                      tasks[${index}].agenda=this.value;
                      saveData();
                      renderAll();
                    "
                  >
                    ${option(agendas,t.agenda)}
                  </select>
                </td>

                <td
                  contenteditable="true"
                  onblur="
                    tasks[${index}].task=this.innerText;
                    saveData();
                    renderAll();
                  "
                >
                  ${t.task}
                </td>

                <td>
                  <select
                    onchange="
                      tasks[${index}].owner=this.value;
                      saveData();
                      renderAll();
                    "
                  >
                    ${option(officers,t.owner)}
                  </select>
                </td>

                <td>
                  <select
                    onchange="
                      tasks[${index}].priority=this.value;
                      saveData();
                      renderAll();
                    "
                  >
                    ${option(priorities,t.priority)}
                  </select>
                </td>

                <td>
                  <select
                    onchange="
                      tasks[${index}].status=this.value;
                      if(this.value==='Completed'){
                        tasks[${index}].progress=100;
                      }
                      saveData();
                      renderAll();
                    "
                  >
                    ${option(taskStatuses,t.status)}
                  </select>
                </td>

                <td>
                  <input
                    type="date"
                    value="${t.due || ""}"
                    onchange="
                      tasks[${index}].due=this.value;
                      saveData();
                      renderAll();
                    "
                  >
                </td>

                <td>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value="${t.progress}"
                    onchange="
                      tasks[${index}].progress=parseInt(this.value);
                      saveData();
                      renderAll();
                    "
                  >

                  <div class="progress">
                    <div
                      class="fill"
                      style="width:${t.progress}%"
                    ></div>
                  </div>

                  <small>${t.progress}%</small>
                </td>

                <td>
                  <textarea
                    onblur="
                      tasks[${index}].notes=this.value;
                      saveData();
                    "
                  >${t.notes || ""}</textarea>
                </td>

                <td>
                  <button
                    class="danger-btn"
                    onclick="
                      tasks.splice(${index},1);
                      saveData();
                      renderAll();
                    "
                  >
                    Delete
                  </button>
                </td>

              </tr>
            `;

          }).join("")}

        </tbody>

      </table>

    </div>
  `;

}

// ======================================
// EVENTS
// ======================================

function renderEvents(){

  const container = document.getElementById("eventCards");

  if(!container) return;

  container.innerHTML = `
    <div class="card-grid">

      ${events.map((e,index)=>`

        <div class="card">

          <div class="row">
            <input
              value="${e.event}"
              onchange="
                events[${index}].event=this.value;
                saveData();
                renderAll();
              "
            >

            <span class="badge ${clean(e.status)}">
              ${e.status}
            </span>
          </div>

          <label>Lead</label>
          <select
            onchange="
              events[${index}].lead=this.value;
              saveData();
              renderAll();
            "
          >
            ${option(officers,e.lead)}
          </select>

          <label>Status</label>
          <select
            onchange="
              events[${index}].status=this.value;
              saveData();
              renderAll();
            "
          >
            ${option(eventStatuses,e.status)}
          </select>

          <label>Target Date</label>
          <input
            type="date"
            value="${e.target || ""}"
            onchange="
              events[${index}].target=this.value;
              saveData();
              renderAll();
            "
          >

          <label>Progress</label>
          <input
            type="range"
            min="0"
            max="100"
            value="${e.progress}"
            onchange="
              events[${index}].progress=parseInt(this.value);
              saveData();
              renderAll();
            "
          >

          <div class="progress">
            <div class="fill" style="width:${e.progress}%"></div>
          </div>

          <small>${e.progress}%</small>

        </div>

      `).join("")}

    </div>
  `;

}

// ======================================
// PODCASTS
// ======================================

function renderPodcasts(){

  const container = document.getElementById("podcastCards");

  if(!container) return;

  container.innerHTML = `
    <button onclick="addPodcast()" class="section-btn">
      + Add Podcast Guest
    </button>

    <div class="card-grid">

      ${podcasts.map((p,index)=>`

        <div class="card">

          <input
            value="${p.guest}"
            onchange="
              podcasts[${index}].guest=this.value;
              saveData();
              renderAll();
            "
          >

          <label>Owner</label>
          <select
            onchange="
              podcasts[${index}].owner=this.value;
              saveData();
              renderAll();
            "
          >
            ${option(officers,p.owner)}
          </select>

          <label>Status</label>
          <select
            onchange="
              podcasts[${index}].status=this.value;
              saveData();
              renderAll();
            "
          >
            ${option(podcastStatuses,p.status)}
          </select>

          <label>Target Date</label>
          <input
            type="date"
            value="${p.target || ""}"
            onchange="
              podcasts[${index}].target=this.value;
              saveData();
              renderAll();
            "
          >

          <label>Notes</label>
          <textarea
            onblur="
              podcasts[${index}].notes=this.value;
              saveData();
            "
          >${p.notes || ""}</textarea>

        </div>

      `).join("")}

    </div>
  `;

}

// ======================================
// MARKETING
// ======================================

function renderMarketing(){

  const container = document.getElementById("marketingCards");

  if(!container) return;

  const total = marketing.length;

  const completed = marketing.filter(
    m=>m.status==="Completed" || m.status==="Published"
  ).length;

  const rate =
    total
    ? Math.round((completed/total)*100)
    : 0;

  container.innerHTML = `
    <div class="attendance-summary-grid">

      <div class="mini-summary-card">
        <span>Total Marketing Tasks</span>
        <strong>${total}</strong>
      </div>

      <div class="mini-summary-card">
        <span>Completed</span>
        <strong>${completed}</strong>
      </div>

      <div class="mini-summary-card">
        <span>Completion Rate</span>
        <strong>${rate}%</strong>
      </div>

    </div>

    <button onclick="addMarketingTask()" class="section-btn">
      + Add Marketing Task
    </button>

    <div class="card-grid">

      ${marketing.map((m,index)=>`

        <div class="card">

          <input
            value="${m.task}"
            onchange="
              marketing[${index}].task=this.value;
              saveData();
              renderAll();
            "
          >

          <label>Owner</label>
          <select
            onchange="
              marketing[${index}].owner=this.value;
              saveData();
              renderAll();
            "
          >
            ${option([
              "Cynthia Simmons",
              "Selena Hernandez",
              "Emmanuelle Vinson"
            ],m.owner)}
          </select>

          <label>Status</label>
          <select
            onchange="
              marketing[${index}].status=this.value;
              saveData();
              renderAll();
            "
          >
            ${option(marketingStatuses,m.status)}
          </select>

          <label>Due Date</label>
          <input
            type="date"
            value="${m.target || ""}"
            onchange="
              marketing[${index}].target=this.value;
              saveData();
              renderAll();
            "
          >

          <label>Notes</label>
          <textarea
            onblur="
              marketing[${index}].notes=this.value;
              saveData();
            "
          >${m.notes || ""}</textarea>

        </div>

      `).join("")}

    </div>
  `;

}

// ======================================
// HIMSS BUDGET
// ======================================

function calculateBudget(){

  let target = 0;
  let raised = 0;

  budget.forEach(b=>{

    const rowTotal =
      safeNumber(b.perStudent) *
      safeNumber(b.students);

    if(b.category === "Funds Raised"){
      raised = rowTotal;
    }else{
      target += rowTotal;
    }

  });

  return {
    target,
    raised,
    gap: Math.max(target-raised,0)
  };

}

function renderBudget(){

  const container = document.getElementById("budgetCards");

  if(!container) return;

  const totals = calculateBudget();

  container.innerHTML = `
    <div class="attendance-summary-grid">

      <div class="mini-summary-card">
        <span>Target Budget</span>
        <strong>$${totals.target.toLocaleString()}</strong>
      </div>

      <div class="mini-summary-card">
        <span>Funds Raised</span>
        <strong>$${totals.raised.toLocaleString()}</strong>
      </div>

      <div class="mini-summary-card">
        <span>Remaining Gap</span>
        <strong>$${totals.gap.toLocaleString()}</strong>
      </div>

    </div>

    <div class="table-wrap">

      <table>

        <thead>
          <tr>
            <th>Category</th>
            <th>Per Student</th>
            <th>Students</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          ${budget.map((b,index)=>{

            const total =
              safeNumber(b.perStudent) *
              safeNumber(b.students);

            return `
              <tr>

                <td>${b.category}</td>

                <td>
                  <input
                    type="number"
                    value="${b.perStudent}"
                    onchange="
                      budget[${index}].perStudent=Number(this.value);
                      saveData();
                      renderAll();
                    "
                  >
                </td>

                <td>
                  <input
                    type="number"
                    value="${b.students}"
                    onchange="
                      budget[${index}].students=Number(this.value);
                      saveData();
                      renderAll();
                    "
                  >
                </td>

                <td>
                  <strong>
                    $${total.toLocaleString()}
                  </strong>
                </td>

                <td>
                  <select
                    onchange="
                      budget[${index}].status=this.value;
                      saveData();
                      renderAll();
                    "
                  >
                    ${option(budgetStatuses,b.status)}
                  </select>
                </td>

              </tr>
            `;

          }).join("")}

        </tbody>

      </table>

    </div>
  `;

}

// ======================================
// ADD BUTTONS
// ======================================

function addTask(){

  tasks.unshift({
    agenda:"Strategic Planning",
    task:"New Task",
    owner:"Agrani Sinha",
    priority:"Medium",
    status:"Not Started",
    due:"",
    progress:0,
    notes:""
  });

  saveData();

  renderAll();

}

function addPodcast(){

  podcasts.unshift({
    guest:"New Podcast Guest",
    owner:"Agrani Sinha",
    status:"Prospect",
    target:"",
    notes:""
  });

  saveData();

  renderAll();

}

function addMarketingTask(){

  marketing.unshift({
    task:"New Marketing Task",
    owner:"Cynthia Simmons",
    status:"Not Started",
    target:"",
    notes:""
  });

  saveData();

  renderAll();

}

// ======================================
// CSV EXPORT
// ======================================

function exportCSV(){

  let csv =
    "Agenda,Task,Owner,Priority,Status,Due,Progress,Notes\n";

  tasks.forEach(t=>{

    csv +=
      `"${t.agenda}","${t.task}","${t.owner}","${t.priority}","${t.status}","${t.due}","${t.progress}%","${t.notes}"\n`;

  });

  const blob =
    new Blob(
      [csv],
      {type:"text/csv"}
    );

  const a =
    document.createElement("a");

  a.href =
    URL.createObjectURL(blob);

  a.download =
    "HIAC_Dashboard_Tasks.csv";

  a.click();

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
