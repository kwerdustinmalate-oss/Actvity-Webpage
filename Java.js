/* ============================================================
   SCRIPT.JS — Simple logic for the whole portfolio
   ============================================================ */

// ---------- MY DATA ----------
// Change these to YOUR stuff

const MY_PROJECTS = [
  {
    title: "My First Website",
    tag: "HTML/CSS",
    url: "https://github.com",
    desc: "This is the very first website I ever built. It taught me the basics of HTML and CSS."
  }
];

// Your favourite games (5 clickable cards)
const MY_GAMES = [
  { title: "Minecraft",         url: "https://www.minecraft.net" },
  { title: "Valorant",          url: "https://playvalorant.com" },
  { title: "Genshin Impact",    url: "https://genshin.hoyoverse.com" },
  { title: "League of Legends", url: "https://www.leagueoflegends.com" },
  { title: "Roblox",            url: "https://www.roblox.com" }
];

const MY_SKILLS = [
  { group: "Programming", items: [["HTML", 80], ["CSS", 70], ["JavaScript", 50], ["Python", 40]] },
  { group: "Tools",       items: [["VS Code", 85], ["GitHub", 60], ["Figma", 40]] }
];


// ---------- HELPERS ----------
function playClick() {
  const sfx = new Audio("click.mp3");
  sfx.volume = 0.5;
  sfx.play().catch(function () {});
}

function swapMenuArt(name) {
  document.body.dataset.screen = name;
}


// ---------- INTRO SCREEN ----------
const intro = document.getElementById("intro");
const music = document.getElementById("music");
music.volume = 0.3;

intro.addEventListener("click", function () {
  music.play().catch(function () {});
  playClick();
  intro.classList.add("hidden");
  setTimeout(function () { intro.remove(); }, 800);
});


// ---------- NAVIGATION ----------
const menuButtons = document.querySelectorAll(".menu-btn");
const screens = document.querySelectorAll(".screen");
let selectedIndex = 0;

function updateSelection() {
  menuButtons.forEach(function (btn, i) {
    if (i === selectedIndex) btn.classList.add("selected");
    else btn.classList.remove("selected");
  });
}

function goToScreen(name) {
  playClick();
  swapMenuArt(name);

  const wipe = document.getElementById("wipe");
  wipe.classList.remove("go");
  void wipe.offsetWidth;
  wipe.classList.add("go");

  setTimeout(function () {
    screens.forEach(function (s) { s.classList.remove("active"); });
    const target = document.getElementById(name);
    if (target) target.classList.add("active");

    if (name === "home") document.body.classList.remove("subpage");
    else document.body.classList.add("subpage");

    if (name === "skills") loadSkills();
    if (name === "projects") loadProjects();
  }, 150);
}

menuButtons.forEach(function (btn, i) {
  btn.addEventListener("mouseenter", function () {
    selectedIndex = i;
    updateSelection();
  });

  btn.addEventListener("click", function () {
    goToScreen(btn.dataset.go);
  });
});

document.querySelectorAll(".back").forEach(function (btn) {
  btn.addEventListener("click", function () {
    goToScreen("home");
  });
});


// ---------- KEYBOARD ----------
document.addEventListener("keydown", function (e) {
  const onHome = document.getElementById("home").classList.contains("active");

  if (onHome) {
    if (e.key === "ArrowDown") {
      selectedIndex = (selectedIndex + 1) % menuButtons.length;
      updateSelection();
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      selectedIndex = (selectedIndex - 1 + menuButtons.length) % menuButtons.length;
      updateSelection();
      e.preventDefault();
    } else if (e.key === "Enter") {
      goToScreen(menuButtons[selectedIndex].dataset.go);
    }
  } else if (e.key === "Escape") {
    goToScreen("home");
  }
});


// ---------- CLOCK ----------
setInterval(function () {
  const now = new Date();
  const hrs = String(now.getHours()).padStart(2, "0");
  const mins = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").textContent = hrs + ":" + mins;
}, 1000);


// ---------- SKILLS ----------
let skillsLoaded = false;

function loadSkills() {
  if (skillsLoaded) return;
  skillsLoaded = true;

  const container = document.getElementById("skills-list");

  MY_SKILLS.forEach(function (group) {
    const box = document.createElement("div");
    box.className = "skill-group";

    const title = document.createElement("h3");
    title.textContent = group.group;
    box.appendChild(title);

    group.items.forEach(function (item) {
      const row = document.createElement("div");
      row.className = "skill-row";

      const name = document.createElement("span");
      name.className = "name";
      name.textContent = item[0];

      const bar = document.createElement("div");
      bar.className = "skill-bar";
      const fill = document.createElement("div");
      fill.className = "fill";
      bar.appendChild(fill);

      const lv = document.createElement("span");
      lv.className = "lv";
      lv.textContent = item[1] + "%";

      row.appendChild(name);
      row.appendChild(bar);
      row.appendChild(lv);
      box.appendChild(row);

      setTimeout(function () {
        fill.style.width = item[1] + "%";
      }, 100);
    });

    container.appendChild(box);
  });
}


// ---------- PROJECTS + GAMES ----------
let projectsLoaded = false;

function loadProjects() {
  if (projectsLoaded) return;
  projectsLoaded = true;

  const featBox = document.getElementById("featured-cards");
  MY_PROJECTS.forEach(function (p) {
    const a = document.createElement("a");
    a.className = "card";
    a.href = p.url;
    a.target = "_blank";
    a.innerHTML =
      '<span class="lang">' + p.tag + '</span>' +
      "<h3>" + p.title + "</h3>" +
      "<p>" + p.desc + "</p>" +
      '<span class="go">View →</span>';
    featBox.appendChild(a);
  });

  document.getElementById("repo-status").textContent = "Games I play in my free time";
  const gameBox = document.getElementById("github-cards");
  MY_GAMES.forEach(function (g) {
    const a = document.createElement("a");
    a.className = "card";
    a.href = g.url;
    a.target = "_blank";
    a.innerHTML =
      '<span class="lang">GAME</span>' +
      "<h3>" + g.title + "</h3>" +
      '<span class="go">Play →</span>';
    gameBox.appendChild(a);
  });
}


// ---------- START ----------
updateSelection();