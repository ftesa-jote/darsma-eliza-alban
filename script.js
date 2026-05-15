const countdown = document.querySelector(".countdown");
const target = new Date(countdown.dataset.target).getTime();

const units = {
  days: countdown.querySelector("[data-days]"),
  hours: countdown.querySelector("[data-hours]"),
  minutes: countdown.querySelector("[data-minutes]"),
  seconds: countdown.querySelector("[data-seconds]"),
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const remaining = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);

  units.days.textContent = pad(Math.floor(totalSeconds / 86400));
  units.hours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
  units.minutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
  units.seconds.textContent = pad(totalSeconds % 60);
}

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
