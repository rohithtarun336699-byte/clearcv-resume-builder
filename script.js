(() => {
  "use strict";
  const STORAGE_KEY = "clearcv_resume_v1";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = {
    name: "", title: "", email: "", phone: "", location: "", summary: "", linkedin: "", website: "",
    skills: "", projects: "", certifications: "", template: "modern",
    experience: [{ role: "", company: "", start: "", end: "", description: "" }],
    education: [{ degree: "", school: "", start: "", end: "", details: "" }]
  };
  let toastTimer;
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);
  const val = value => String(value || "").trim();
  const showToast = message => {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  };
  function readForm() {
    $$("[data-field]").forEach(input => { state[input.dataset.field] = input.value; });
    state.template = $("#templateSelect").value;
    state.experience = $$(".experience-card").map(card => Object.fromEntries(
      $$("[data-key]", card).map(input => [input.dataset.key, input.value])
    ));
    state.education = $$(".education-card").map(card => Object.fromEntries(
      $$("[data-key]", card).map(input => [input.dataset.key, input.value])
    ));
  }
  function saveDraft() {
    readForm();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      $("#savedStatus").textContent = "Draft saved on this device";
    } catch (_) {
      $("#savedStatus").textContent = "Draft could not be saved";
    }
  }
  function field(label, key, value, placeholder = "", wide = false) {
    return `<label class="${wide ? "wide" : ""}">${label}<input data-key="${key}" value="${escapeHTML(value)}" placeholder="${escapeHTML(placeholder)}"></label>`;
  }
  function textareaField(label, key, value, placeholder = "") {
    return `<label class="wide">${label}<textarea data-key="${key}" rows="3" placeholder="${escapeHTML(placeholder)}">${escapeHTML(value)}</textarea></label>`;
  }
  function renderRepeatList(type) {
    const items = state[type] || [];
    const root = type === "experience" ? $("#experienceList") : $("#educationList");
    const isWork = type === "experience";
    root.innerHTML = items.map((item, index) => {
      const cardClass = isWork ? "experience-card" : "education-card";
      return `<div class="entry-card ${cardClass}">
        <div class="entry-card-head"><span>${isWork ? "Experience" : "Education"} ${index + 1}</span>
        <button class="remove-entry" type="button" data-remove="${type}" data-index="${index}" ${items.length === 1 ? 'aria-label="Remove entry"' : ""}>Remove</button></div>
        <div class="entry-grid">${isWork ? [
          field("Job title", "role", item.role, "e.g. Sales Associate"),
          field("Company", "company", item.company, "Company name"),
          field("Start date", "start", item.start, "Jan 2023"),
          field("End date", "end", item.end, "Present"),
          textareaField("Key responsibilities & achievements", "description", item.description, "Use short, specific bullet points; separate lines if needed.")
        ].join("") : [
          field("Degree / qualification", "degree", item.degree, "e.g. B.Com"),
          field("School / institution", "school", item.school, "Institution name"),
          field("Start year", "start", item.start, "2020"),
          field("End year", "end", item.end, "2023"),
          textareaField("Additional details (optional)", "details", item.details, "Relevant coursework, achievements, grade")
        ].join("")}</div>
      </div>`;
    }).join("");
    root.querySelectorAll("[data-key]").forEach(input => input.addEventListener("input", update));
  }
  function restoreDraft() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      Object.keys(state).forEach(key => {
        if (parsed[key] !== undefined) state[key] = parsed[key];
      });
    } catch (_) { /* Ignore invalid or unavailable local storage. */ }
  }
  function setFormFromState() {
    $$("[data-field]").forEach(input => {
      input.value = state[input.dataset.field] || "";
    });
    $("#templateSelect").value = state.template || "modern";
    if (!Array.isArray(state.experience) || !state.experience.length) state.experience = [{ role: "", company: "", start: "", end: "", description: "" }];
    if (!Array.isArray(state.education) || !state.education.length) state.education = [{ degree: "", school: "", start: "", end: "", details: "" }];
    renderRepeatList("experience");
    renderRepeatList("education");
    renderPreview();
  }
  function setText(id, text, fallback = "") {
    $(id).textContent = val(text) || fallback;
  }
  function addTextList(id, raw, emptyFallback = []) {
    const values = String(raw || "").split(/\n/).map(val).filter(Boolean);
    const list = $(id);
    list.innerHTML = "";
    (values.length ? values : emptyFallback).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    $(id).closest(".resume-section").hidden = values.length === 0;
  }
  function renderItems(type) {
    const isWork = type === "experience";
    const root = isWork ? $("#previewExperience") : $("#previewEducation");
    const section = isWork ? $("#experienceSection") : $("#educationSection");
    const entries = state[type].filter(item => Object.values(item).some(value => val(value)));
    section.hidden = entries.length === 0;
    root.innerHTML = "";
    entries.forEach(item => {
      const wrap = document.createElement("div");
      wrap.className = "resume-item";
      const head = document.createElement("div");
      head.className = "resume-item-head";
      const h3 = document.createElement("h3");
      h3.textContent = val(isWork ? item.role : item.degree) || (isWork ? "Position" : "Qualification");
      const date = document.createElement("span");
      date.className = "date";
      date.textContent = [val(item.start), val(item.end)].filter(Boolean).join(" – ");
      head.append(h3, date);
      wrap.appendChild(head);
      const sublineText = [val(isWork ? item.company : item.school)].filter(Boolean).join("");
      if (sublineText) {
        const subline = document.createElement("div");
        subline.className = "subline";
        subline.textContent = sublineText;
        wrap.appendChild(subline);
      }
      const description = val(isWork ? item.description : item.details);
      if (description) {
        const p = document.createElement("p");
        p.textContent = description;
        wrap.appendChild(p);
      }
      root.appendChild(wrap);
    });
  }
  function renderPreview() {
    setText("#previewName", state.name, "Your Name");
    setText("#previewTitle", state.title, "Your Professional Title");
    const contacts = [state.email, state.phone, state.location].map(val).filter(Boolean);
    $("#previewContact").textContent = contacts.length ? contacts.join("  ·  ") : "Email · Phone · Location";
    const links = [state.linkedin, state.website].map(val).filter(Boolean);
    $("#previewLinks").textContent = links.join("  ·  ");
    $("#previewLinks").hidden = links.length === 0;
    setText("#previewSummary", state.summary, "Your professional summary will appear here. Describe your strengths, experience, and the value you bring.");
    $("#summarySection").hidden = !val(state.summary);
    renderItems("experience");
    renderItems("education");
    const skills = String(state.skills || "").split(",").map(val).filter(Boolean);
    const skillRoot = $("#previewSkills");
    skillRoot.innerHTML = "";
    (skills.length ? skills : ["Communication", "Problem solving", "Teamwork"]).forEach(skill => {
      const span = document.createElement("span");
      span.textContent = skill;
      skillRoot.appendChild(span);
    });
    $("#skillsSection").hidden = skills.length === 0;
    addTextList("#previewProjects", state.projects);
    addTextList("#previewCertifications", state.certifications);
    const resume = $("#resume");
    resume.className = `resume template-${state.template || "modern"}`;
    $$('[data-template-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.templateChoice === (state.template || 'modern')));
    });
    const required = [state.name, state.title, state.email, state.phone, state.location, state.summary].filter(v => val(v)).length;
    const pct = Math.round((required / 6) * 100);
    $("#progressText").textContent = `${pct}%`;
    $("#progressBar").style.width = `${pct}%`;
  }
  function update() {
    readForm();
    renderPreview();
    saveDraft();
  }
  function downloadPDF() {
    readForm();
    renderPreview();
    showToast("In the print window, choose “Save as PDF”.");
    window.print();
  }
  document.addEventListener("input", event => {
    if (event.target.matches("[data-field]")) update();
  });
  $("#templateSelect").addEventListener("change", update);
  document.addEventListener("click", event => {
    const add = event.target.closest("[data-add]");
    const remove = event.target.closest("[data-remove]");
    const templateChoice = event.target.closest("[data-template-choice]");
    if (templateChoice) {
      $("#templateSelect").value = templateChoice.dataset.templateChoice;
      update();
      return;
    }
    if (add) {
      readForm();
      if (add.dataset.add === "experience") {
        state.experience.push({ role: "", company: "", start: "", end: "", description: "" });
        renderRepeatList("experience");
      } else {
        state.education.push({ degree: "", school: "", start: "", end: "", details: "" });
        renderRepeatList("education");
      }
      update();
    }
    if (remove) {
      readForm();
      const type = remove.dataset.remove;
      const index = Number(remove.dataset.index);
      if (state[type].length <= 1) {
        state[type] = type === "experience"
          ? [{ role: "", company: "", start: "", end: "", description: "" }]
          : [{ degree: "", school: "", start: "", end: "", details: "" }];
      } else {
        state[type].splice(index, 1);
      }
      renderRepeatList(type);
      update();
    }
  });
  $("#downloadBtn").addEventListener("click", downloadPDF);
  $("#downloadBtnBottom").addEventListener("click", downloadPDF);
  $("#clearBtn").addEventListener("click", () => {
    if (!confirm("Clear this resume draft from this browser? This cannot be undone.")) return;
    localStorage.removeItem(STORAGE_KEY);
    Object.keys(state).forEach(key => {
      if (key === "experience") state[key] = [{ role: "", company: "", start: "", end: "", description: "" }];
      else if (key === "education") state[key] = [{ degree: "", school: "", start: "", end: "", details: "" }];
      else if (key === "template") state[key] = "modern";
      else state[key] = "";
    });
    setFormFromState();
    saveDraft();
    showToast("Draft cleared.");
  });
  restoreDraft();
  setFormFromState();
  $("#savedStatus").textContent = "Draft saved on this device";
})();
