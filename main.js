let dropDownLink = document.querySelector(
  "header .container  .main-nav > li:last-child > a"
);
let megaMenu = document.querySelector("header .mega-menu");
dropDownLink.addEventListener("click", function (e) {
  e.currentTarget.classList.toggle("open");
  e.currentTarget.classList.contains("open")
    ? megaMenu.classList.add("view")
    : megaMenu.classList.remove("view");
});
// megaMenu.addEventListener("mouseleave", () => {
//   megaMenu.classList.remove("view");
//   dropDownLink.classList.remove("open");
// });
// document.addEventListener("click", (e) => {
//   if (e.target !== megaMenu && e.target !== dropDownLink) {
//     megaMenu.classList.remove("view");
//     dropDownLink.classList.remove("open");
//   }
// });

// Progress

let skillsSection = document.querySelector(".skills");
let progressSpans = document.querySelectorAll(".skill .progress span");
let progressNumSpans = document.querySelectorAll(".skill h3>span");
let statSection = document.querySelector(".stats");
let statNumSpans = document.querySelectorAll(".stat-number");
let startFlags = new Array(2).fill(false);
progressSpans.forEach((span) => {
  span.style.width = "0";
});
let dateUnitElements = document.querySelectorAll(
  ".events .unit span:first-child"
);
console.log(dateUnitElements);
window.addEventListener("scroll", () => {
  // skills section
  setElementWidthOnScroll(skillsSection, progressSpans);
  increaseCountOnScroll(skillsSection, progressNumSpans, 0, 300);
  // stats section
  increaseCountOnScroll(statSection, statNumSpans, 1, 500);
});

let countDownDateInMilli = new Date("April 12, 2023 23:59:59").getTime();
let eventInterval = setInterval(eventCountDown, 1000);

let toTopBtn = document.querySelector(".movetotop");

window.addEventListener("scroll", showToTopBtn);
toTopBtn.onclick = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};
function showToTopBtn() {
  if (scrollY >= document.querySelector(".articles").offsetTop) {
    toTopBtn.classList.add("view");
    return;
  }
  toTopBtn.classList.remove("view");
}

function eventCountDown() {
  let dateNowInMilli = new Date().getTime();
  let dateDiffMilli = countDownDateInMilli - dateNowInMilli;
  if (dateDiffMilli <= 0) {
    clearInterval(eventInterval);
    let spanExpired = document.createElement("span");
    spanExpired.appendChild(document.createTextNode("Event was expired"));
    spanExpired.className = "expired";
    dateUnitElements[0].parentElement.parentElement.after(spanExpired);
    return;
  }
  let days = Math.floor(dateDiffMilli / (1000 * 60 * 60 * 24));
  let hoursInMilli = dateDiffMilli % (1000 * 60 * 60 * 24);
  let hours = Math.floor(hoursInMilli / (1000 * 60 * 60));
  let minutesInMilli = hoursInMilli % (1000 * 60 * 60);
  let minutes = Math.floor(minutesInMilli / (1000 * 60));
  let secondsInMIlli = minutesInMilli % (1000 * 60);
  let seconds = Math.floor(secondsInMIlli / 1000);
  let dateArr = [days, hours, minutes, seconds];
  dateUnitElements.forEach((dateElement, index) => {
    dateElement.textContent =
      dateArr[index] < 10 ? `0${dateArr[index]}` : dateArr[index];
  });
}

function setElementWidthOnScroll(section, spans) {
  // in scrolling zone ==> fill progress
  if (window.scrollY >= section.offsetTop - 300) {
    spans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
    return;
  }
  // out of scrolling zone ==> unfill progress
  spans.forEach((span) => {
    span.style.width = "0";
  });
}

function increaseCountOnScroll(section, numberSpans, index, offsetToStart) {
  // out of scrolling zone ==> startFlag false, back numbers to 0
  if (window.scrollY < section.offsetTop - offsetToStart) {
    startFlags[index] = false;
    numberSpans.forEach((numSpan) => {
      numSpan.textContent = "0";
    });
    return;
  }
  // in scrolling zone ==> increase element Count + startFlag True
  if (!startFlags[index]) {
    numberSpans.forEach((numSpan) => increaseElementCount(numSpan, index));
    startFlags[index] = true;
    return;
  }
}

function increaseElementCount(element) {
  let goal = element.dataset.goal;
  let count = setInterval(startIncrease, 800 / goal);
  function startIncrease() {
    if (element.textContent == goal) {
      clearInterval(count);
      return;
    }
    element.textContent++;
  }
}
