const jobs = [
  {
    id: 1,
    companyName: "Mobile First Crop",
    position: "React Native Developer",
    location: "Bangladesh",
    type: " Remote.Full-Time",
    salary: " $130,000 - $175,000",
    description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "NOT APPLIED"
  },
  {
    id: 2,
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Dhaka,Bangladesh",
    type: " Los Angeles, CA-Part-time",
    salary: "$80,000 - $120,000",
    description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking",
    status: "NOT APPLIED"
  },
  {
    id: 3,
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-Time",
    salary: "$125,000 - $165,000",
    description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "NOT APPLIED"
  },
  {
    id: 4,
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: " Full-time",
    salary: " $140,000 - $190,000",
    description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    status: "NOT APPLIED"
  },
  {
    id: 5,
    companyName: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Los Angeles, USA",
    type: "Full-Time",
    salary: "$110,000 - $150,000",
    description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
    status: "NOT APPLIED"
  },
  {
    id: 6,
    companyName: "MegaCorp Solutions",
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-Time",
    salary: "$130,000 - $170,00",
    description: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
    status: "NOT APPLIED"
  },
  {
    id: 7,
    companyName: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Stockholm, Sweden",
    type: "Remote-Full-time",
    salary: "$120,000 - $160,000",
    description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
    status: "NOT APPLIED"
  },
  {
    id: 8,
    companyName: "TechCorp Industries",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-Time",
    salary: "$130,000 - $175,000",
    description: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
    status: "NOT APPLIED"
  }
];

const jobsContainer = document.getElementById("jobsContainer");
const tabs = document.querySelectorAll(".tab");
const emptyState = document.getElementById("emptyState");

const totalCount = document.getElementById("totalCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const sectionCount = document.getElementById("sectionCount");

let currentTab = "all";

function renderJobs() {
  jobsContainer.innerHTML = "";

  const filtered = currentTab === "all"
    ? jobs
    : jobs.filter(job => job.status === currentTab);

  sectionCount.textContent = `${filtered.length} Jobs`;

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");

    filtered.forEach(job => {
      const card = document.createElement("div");
      card.className = "card bg-base-100 shadow";

      card.innerHTML = `
        <div class="card-body">
          <h2 class="card-title">${job.position}</h2>
          <p class="font-semibold">${job.companyName}</p>
          <p class="text-sm text-gray-500">${job.location}</p>
          <p class="text-sm">${job.type}</p>
          <p class="text-sm font-medium">${job.salary}</p>
          <p class="text-sm font-medium">${job.status}
          <p class="text-sm mt-2">${job.description}</p>

          <div class="card-actions mt-4 flex flex-wrap gap-2">
            <button class="btn btn-primary btn-sm interview-btn" data-id="${job.id}">
              Interview
            </button>
            <button class="btn btn-error btn-sm rejected-btn" data-id="${job.id}">
              Rejected
            </button>
            <button class="btn btn-neutral btn-sm delete-btn" data-id="${job.id}">
              Delete
            </button>
          </div>
        </div>
      `;

      jobsContainer.appendChild(card);
    });
  }

  updateCounts();
}

function updateCounts() {
  totalCount.textContent = jobs.length;
  interviewCount.textContent = jobs.filter(j => j.status === "interview").length;
  rejectedCount.textContent = jobs.filter(j => j.status === "rejected").length;
}

jobsContainer.addEventListener("click", function(e) {
  const id = Number(e.target.dataset.id);
  const job = jobs.find(j => j.id === id);

  if (!job) return;

  if (e.target.classList.contains("interview-btn")) {
    job.status = job.status === "interview" ? "all" : "interview";
  }

  if (e.target.classList.contains("rejected-btn")) {
    job.status = job.status === "rejected" ? "all" : "rejected";
  }

  if (e.target.classList.contains("delete-btn")) {
    const index = jobs.findIndex(j => j.id === id);
    jobs.splice(index, 1);
  }

  renderJobs();
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("tab-active"));
    tab.classList.add("tab-active");
    currentTab = tab.dataset.tab;
    renderJobs();
  });
});

renderJobs();