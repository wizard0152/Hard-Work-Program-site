const workouts = {
  1: {
    title: "Верх А — силовой",
    note: "Жим штанги, подтягивания, грудь, спина и средние дельты.",
    exercises: [
      ["Жим штанги лежа", "3×6–8", "Не в отказ", "RIR 1–3"],
      ["Подтягивания", "3×6–10", "Не в отказ", "RIR 1–2"],
      ["Жим гантелей под наклоном", "3×8–12", "Не в отказ", "RIR 1–2"],
      ["Тяга штанги к поясу", "3×8–12", "Не в отказ", "RIR 1–3"],
      ["Отведения в стороны на кроссовере", "4×12–20", "Близко к отказу", "RIR 0–1"],
      ["Скамья Скотта", "3×10–12", "Близко к отказу", "RIR 0–1"],
      ["Французский жим", "3×10–12", "Близко к отказу", "RIR 0–1"]
    ]
  },
  2: {
    title: "Низ А — квадрицепс",
    note: "Присед с запасом. Экстеншин можно делать близко к отказу.",
    exercises: [
      ["Присед", "3×6–8", "Не в отказ", "RIR 1–3"],
      ["Жим ногами", "3×10–15", "Почти в отказ", "RIR 1–2"],
      ["Разгибания ног / экстеншин", "4×12–20", "Близко к отказу", "RIR 0–1"],
      ["Сгибания ног", "3×10–15", "Близко к отказу", "RIR 0–1"],
      ["Икры", "4×12–20", "Близко к отказу", "RIR 0–1"],
      ["Пресс", "3 подхода", "Не обязательно в отказ", "RIR 1–3"]
    ]
  },
  4: {
    title: "Верх Б — объем + плечи",
    note: "Главный акцент: плечи, ширина спины и задняя дельта.",
    exercises: [
      ["Жим гантелей сидя", "3×6–10", "Не в отказ", "RIR 1–2"],
      ["Подтягивания нейтральным хватом", "3×8–12", "Не в отказ", "RIR 1–2"],
      ["Тяга одной рукой / хаммер", "3×8–12", "Не в отказ", "RIR 1–2"],
      ["Бабочка", "3×12–15", "Близко к отказу", "RIR 0–1"],
      ["Отведения на среднюю дельту", "4×12–20", "Близко к отказу", "RIR 0–1"],
      ["Задняя дельта в бабочке", "4×12–20", "Близко к отказу", "RIR 0–1"],
      ["Молотки", "3×10–12", "Близко к отказу", "RIR 0–1"],
      ["Канат на трицепс", "3×10–15", "Близко к отказу", "RIR 0–1"]
    ]
  },
  5: {
    title: "Низ Б — задняя цепь",
    note: "Румынская тяга, бицепс бедра, ягодицы и добивка квадрицепса.",
    exercises: [
      ["Румынская тяга", "3×6–10", "Не в отказ", "RIR 1–3"],
      ["Болгарские выпады", "3×8–12", "Почти в отказ", "RIR 1–2"],
      ["Сгибания ног", "4×10–15", "Близко к отказу", "RIR 0–1"],
      ["Разгибания ног", "3×15–20", "Близко к отказу", "RIR 0–1"],
      ["Икры", "4×12–20", "Близко к отказу", "RIR 0–1"],
      ["Пресс", "3 подхода", "Не обязательно в отказ", "RIR 1–3"]
    ]
  }
};

const dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const scheduleNames = { 1: "Понедельник", 2: "Вторник", 4: "Четверг", 5: "Пятница" };

function getTodayWorkout() {
  const day = new Date().getDay();
  return workouts[day] || {
    title: "День отдыха",
    note: "Восстановление тоже часть прогресса. Поешь, выспись, прими креатин.",
    exercises: [
      ["Сон", "7–9 часов", "Обязательно", "Восстановление"],
      ["Калории", "2700–2900 ккал", "Стабильно", "Без переедания"],
      ["Белок", "120–130 г", "Каждый день", "База роста"],
      ["Креатин", "5 г", "Каждый день", "Без пропусков"]
    ],
    rest: true
  };
}

function renderToday() {
  const today = getTodayWorkout();

  document.getElementById("today-title").textContent =
    `${dayNames[new Date().getDay()]}: ${today.title}`;
  document.getElementById("today-note").textContent = today.note;

  const box = document.getElementById("today-workout");
  box.innerHTML = "";

  today.exercises.forEach(([name, reps, failure, rir], index) => {
    const isCloseFail = failure.toLowerCase().includes("отказ") && !failure.toLowerCase().includes("не в");
    const card = document.createElement("article");
    card.className = "exercise" + (today.rest ? " rest" : "");
    card.style.animationDelay = `${index * 70}ms`;
    card.innerHTML = `
      <div class="number">${index + 1}</div>
      <div>
        <h3>${name}</h3>
        <div class="exercise-sub">
          <span class="fail-tag ${isCloseFail ? "close-fail" : "no-fail"}">${failure}</span>
          <span class="fail-tag">${rir}</span>
        </div>
      </div>
      <div class="meta">${reps}</div>
    `;
    box.appendChild(card);
  });
}

function renderWeek() {
  const list = document.getElementById("week-list");
  list.innerHTML = "";

  Object.entries(workouts).forEach(([day, workout]) => {
    const card = document.createElement("article");
    card.className = "day-card";

    const items = workout.exercises
      .map(([name, reps, failure, rir]) => `<li>${name} — <strong>${reps}</strong><br>${failure}, ${rir}</li>`)
      .join("");

    card.innerHTML = `
      <h3>${scheduleNames[day]} — ${workout.title}</h3>
      <p>${workout.note}</p>
      <ul>${items}</ul>
    `;

    list.appendChild(card);
  });
}

document.getElementById("toggle-all").addEventListener("click", () => {
  const week = document.getElementById("week");
  week.classList.toggle("hidden");

  document.getElementById("toggle-all").textContent =
    week.classList.contains("hidden") ? "Показать всю неделю" : "Скрыть неделю";

  if (!week.classList.contains("hidden")) {
    week.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

renderToday();
renderWeek();

const quotes = [
  "Hard work builds the body. Discipline keeps it.",
  "No excuses. Just reps.",
  "Pain is temporary. Progress is permanent.",
  "Train hard. Eat big. Stay consistent.",
  "The body follows the discipline.",
  "Small steps. Heavy weights. Big changes.",
  "Earn the shape you want.",
  "Consistency beats motivation.",
  "Build in silence. Let progress speak.",
  "One more rep. One more day.",

  "The weight never lies.",
  "Results respect consistency.",
  "Strong habits create strong bodies.",
  "Discipline is stronger than motivation.",
  "Every workout counts.",
  "Muscle is earned, never given.",
  "Today's effort is tomorrow's physique.",
  "The grind never betrays you.",
  "Strength grows in the struggle.",
  "Champions are built on ordinary days.",

  "Trust the process.",
  "Your future body is watching.",
  "Stay hungry. Stay humble.",
  "Progress is hidden in repetition.",
  "Excuses burn zero calories.",
  "The mirror rewards patience.",
  "You don't find strength. You build it.",
  "Success is a thousand small choices.",
  "Lift today. Thank yourself tomorrow.",
  "Nothing changes if nothing changes.",

  "Comfort kills progress.",
  "Growth begins where comfort ends.",
  "Train with purpose.",
  "Every set is an investment.",
  "Strong body. Strong mind.",
  "The work you avoid is the work you need.",
  "Mass is built meal by meal.",
  "Discipline weighs more than talent.",
  "A better physique starts today.",
  "Stay consistent when nobody watches.",

  "Progress loves patience.",
  "Lift heavy. Recover harder.",
  "The goal is earned, not wished for.",
  "The gym rewards persistence.",
  "Focus on the next rep.",
  "The body adapts to what you demand.",
  "Hard work compounds.",
  "Get stronger than your excuses.",
  "Every meal matters.",
  "Every rep matters.",

  "The iron teaches discipline.",
  "Be stronger than yesterday.",
  "Strength is built under pressure.",
  "Stay committed.",
  "You can always do one more rep.",
  "Growth requires fuel.",
  "Train. Eat. Recover. Repeat.",
  "Your competition is yesterday's version of you.",
  "The best time to start was yesterday.",
  "The second best time is now.",

  "Results come to the consistent.",
  "A strong frame is built slowly.",
  "Muscles are rented. Rent is due every day.",
  "Do the work even when you don't feel like it.",
  "Strength loves routine.",
  "Every workout leaves a mark.",
  "The barbell rewards patience.",
  "Success is repetition.",
  "Master the basics.",
  "The process is the shortcut.",

  "Don't count the days. Make the days count.",
  "Your habits become your physique.",
  "Stay focused on the mission.",
  "The mirror shows the truth.",
  "The scale follows the habits.",
  "Big goals require boring consistency.",
  "Earn your calories.",
  "The strongest version of you is under construction.",
  "Nothing worth having comes easy.",
  "Show up and do the work.",

  "A year from now you'll thank yourself.",
  "Stay patient. Stay relentless.",
  "Mass takes time.",
  "Great physiques are built slowly.",
  "You are what you repeatedly do.",
  "Strength is a lifestyle.",
  "Consistency is a superpower.",
  "Work hard in silence.",
  "The results will make the noise.",
  "Every champion started somewhere.",

  "The next level requires the next effort.",
  "Discipline creates freedom.",
  "Feed the goal.",
  "Never skip the fundamentals.",
  "Progress hides in daily habits.",
  "Recovery is part of training.",
  "The grind pays interest.",
  "Stay hungry for improvement.",
  "The body achieves what the mind believes.",
  "Become impossible to ignore."
];

function setDailyQuote() {
  const today = new Date();
  const dayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;

  for (let i = 0; i < dayKey.length; i++) {
    hash = dayKey.charCodeAt(i) + ((hash << 5) - hash);
  }

  const quote = quotes[Math.abs(hash) % quotes.length];
  document.querySelector(".motto").textContent = quote;
}

setDailyQuote();
