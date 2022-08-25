const $ = (el) => [...document.querySelectorAll(el)];

const radios = $("input[name='rating']");
const ratingBody = $(".rating-body");
const labels = $(".rate");

/* ANIMATIONS! */

const invalidAnimate = (parent, labels) => {
  /* ANIMATION IN CSS BECAUSE WHY NOT */
  const shake = [
    { transform: "translate3d(-1px, 0, 0)" },
    { transform: "translate3d(2px, 0, 0)" },
    { transform: "translate3d(-4px, 0, 0)" },
    { transform: "translate3d(4px, 0, 0)" },
    { transform: "translate3d(-4px, 0, 0)" },
    { transform: "translate3d(4px, 0, 0)" },
    { transform: "translate3d(-4px, 0, 0)" },
    { transform: "translate3d(2px, 0, 0)" },
    { transform: "translate3d(-1px, 0, 0)" },
  ];

  parent.animate(shake, {
    duration: 820,
    easing: "cubic-bezier(.36,.07,.19,.97)",
    fill: "both",
  });

  labels.forEach((label) => {
    label.classList.toggle("invalid");
    setTimeout(() => {
      label.classList.toggle("invalid");
    }, 820);
  });
};

/* SLIDE BETWEEN WINDOWS */
const toggleWindows = (rateNumber) => {
  ratingBody.forEach((window) => {
    $(".rate--submited")[0].innerText = rateNumber;
    window.classList.toggle("hidden");
  });
};

/* MAKES ALL CHECKBOXES BEHAVE LIKE RADIO FOR UNSELECTION */

const toBehaveLikeRadio = (input) => {
  radios.forEach((item) => {
    if (item !== input) item.checked = false;
  });
};

radios.forEach((button) => {
  button.addEventListener("click", () => {
    toBehaveLikeRadio(button);
  });
});

/* ALL MAGIC RAPPENDS HERE */

$(".rating-body__button").forEach((button) => {
  button.addEventListener("click", () => {
    const isEveryChecked = radios.some((el) => el.checked === true);
    if (isEveryChecked) {
      const givenRate = radios.filter((radio) => radio.checked == true)[0].id;
      toggleWindows(givenRate);
    } else {
      invalidAnimate(ratingBody[0], labels);
    }
  });
});

$(".rollback")[0].addEventListener("click", () => {
  toggleWindows();
});
