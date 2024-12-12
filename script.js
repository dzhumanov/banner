document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const roundEl = document.querySelector(".round");
  const focus = document.querySelector(".focus");
  const flowerName = document.querySelector(".flower-name");
  const wrapper = document.querySelector(".flower-wrapper");
  const modal = document.querySelector(".modal");
  const modalBackdrop = document.querySelector(".modal-backdrop");
  const modalTitle = document.querySelector(".modal-title");
  const icon = document.getElementById("icon");
  const modalSubtext = document.querySelector(".modal-subtext");
  const mainTitle = document.querySelector(".title");
  const botFlower = document.querySelector(".botFlower");
  let modalButton = document.querySelector(".modal-button");

  const phrases = ["Найдите ромашку", "А розу узнаете?", "Где здесь пион?"];
  const modalPhrases = [
    {
      success: "Но дальше будет посложнее",
      error: "Нет — это хризантема! Вот что о ней знает Умная камера",
    },
    {
      success: "Всё так! Похоже, вы опытный цветовод",
      error:
        "А вот и нет — это эустома. Умная камера расскажет о ней подробнее",
    },
    {
      success:
        "Наше почтение! Ну а если захотите убедиться, что за растение перед вами — просто откройте Умную камеру.",
      error: "— это камелия. Посмотрите главное о ней в Умной камере",
    },
  ];
  const db = {
    round1: [
      {
        name: "romashka",
        label: "Ромашка",
        img: "images/round1/flower-1.png",
      },
      {
        name: "chrisantema",
        label: "Хризантема",
        img: "images/round1/flower-2.png",
      },
      {
        name: "chrisantema",
        label: "Хризантема",
        img: "images/round1/flower-3.png",
      },
      {
        name: "chrisantema",
        label: "Хризантема",
        img: "images/round1/flower-4.png",
      },
    ],
    round2: [
      {
        name: "eustoma",
        label: "Эустома",
        img: "images/round2/flower-1.png",
      },
      {
        name: "eustoma",
        label: "Эустома",
        img: "images/round2/flower-2.png",
      },
      {
        name: "eustoma",
        label: "Эустома",
        img: "images/round2/flower-3.png",
      },
      {
        name: "rose",
        label: "Роза",
        img: "images/round2/flower-4.png",
      },
      {
        name: "eustoma",
        label: "Эустома",
        img: "images/round2/flower-5.png",
      },
      {
        name: "eustoma",
        label: "Эустома",
        img: "images/round2/flower-6.png",
      },
    ],
    round3: [
      {
        name: "kamelia",
        label: "Камелия",
        img: "images/round3/flower-1.png",
      },
      {
        name: "kamelia",
        label: "Камелия",
        img: "images/round3/flower-2.png",
      },
      {
        name: "pion",
        label: "Пион",
        img: "images/round3/flower-3.png",
      },
      {
        name: "kamelia",
        label: "Камелия",
        img: "images/round3/flower-4.png",
      },
    ],
  };

  let round = 1;
  let roundData = [];

  const loadRoundData = () => {
    roundData = db[`round${round}`];
    renderFlowers();
  };

  const renderFlowers = () => {
    wrapper.innerHTML = "";
    mainTitle.textContent = phrases[round - 1];
    botFlower.style.backgroundImage = `url("images/bg/bgflower${round}.png")`;

    wrapper.classList.add(`round${round}`);
    roundData.forEach((flower, index) => {
      const flowerElement = document.createElement("div");
      flowerElement.classList.add("flower", `flower-${index + 1}`);
      const img = document.createElement("img");
      img.src = flower.img;
      img.alt = "flower";
      flowerElement.appendChild(img);
      wrapper.appendChild(flowerElement);

      flowerElement.addEventListener("click", () => {
        flowerName.textContent = flower.label;

        setTimeout(() => {
          flowerName.style.display = "block";
        }, 300);

        const flowerRect = flowerElement.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();

        const top = flowerRect.top - wrapperRect.top;
        const left = flowerRect.left - wrapperRect.left;

        focus.style.width = `${flowerRect.width}px`;
        focus.style.height = `${flowerRect.height}px`;
        focus.style.backgroundImage = 'url("images/focus-bold.svg")';
        focus.style.top = `${top}px`;
        focus.style.left = `${left}px`;
        focus.style.transform = "none";

        setTimeout(() => {
          if (
            (flower === roundData[0] && round === 1) ||
            (flower === roundData[3] && round === 2) ||
            (flower === roundData[2] && round === 3)
          ) {
            modal.classList.add("success", "show");
            modalBackdrop.classList.add("show");
            modalTitle.textContent = "Верно!";
            modalSubtext.textContent = modalPhrases[round - 1].success;
            icon.classList.add("success");
            modalButton.classList.add("success");
            modalButton.textContent = "Следующий цветок";
            if (round === 3) {
              modalButton.textContent = "Попробовать";
              modalButton.classList.add("btnFinal");
            }
            modalButton.addEventListener("click", nextRound);
          } else {
            modal.classList.remove("success");
            icon.classList.remove("success");
            modal.classList.add("error", "show");
            modalBackdrop.classList.add("show");
            modalTitle.textContent = "Неверно!";
            modalSubtext.textContent = modalPhrases[round - 1].error;
            modalTitle.classList.add("error");
            icon.classList.add("error");
            modalButton.classList.add("error");
            modalButton.textContent = "Попробовать еще";
            if (round === 3) {
              modalButton.textContent = "Попробовать";
              modalButton.classList.add("btnFinal");
            }
            modalButton.addEventListener("click", tryAgain);
          }
        }, 1000);
      });
    });
  };

  roundEl.textContent = "1/3";

  const nextRound = () => {
    if (round === 3) {
      const link = document.createElement("a");
      link.id = "click_area";
      link.href = yandexHTML5BannerApi.getClickURLNum(1);
      modalButton.appendChild(link);
    }

    if (round === 1) {
      container.style.backgroundColor = "#B577D4";
    } else if (round === 2) {
      container.style.backgroundColor = "#FFAECB";
    } else if (round === 3) {
      return;
    }
    modal.classList.remove("show", "success", "error");
    modalBackdrop.classList.remove("show");
    modalTitle.classList.remove("error");
    modalButton.classList.remove("error");
    modalButton.replaceWith(modalButton.cloneNode(true));
    modalButton = document.querySelector(".modal-button");

    focus.style.width = "350px";
    focus.style.height = "350px";
    focus.style.top = "50%";
    focus.style.left = "50%";
    focus.style.transform = "translate(-50%, -50%)";
    flowerName.style.display = "none";

    round++;
    roundEl.textContent = `${round}/3`;

    loadRoundData();
  };

  const tryAgain = () => {
    modal.classList.remove("show", "success", "error");
    modalBackdrop.classList.remove("show");
    modalTitle.classList.remove("error");
    modalButton.classList.remove("error");
    modalButton.replaceWith(modalButton.cloneNode(true));
    modalButton = document.querySelector(".modal-button");

    focus.style.width = "350px";
    focus.style.height = "350px";
    focus.style.top = "50%";
    focus.style.left = "50%";
    focus.style.transform = "translate(-50%, -50%)";
    flowerName.style.display = "none";
  };

  loadRoundData();
});
