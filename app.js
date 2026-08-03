(() => {
  const lessons = [
    {
      tag: "Ý nghĩa",
      title: '"Have got" nghĩa là gì?',
      note:
        '“Have got” nghĩa là “có”. Ta dùng cấu trúc này để nói một người có đồ vật gì hoặc có đặc điểm như thế nào.',
      formula: [
        '<span class="subject">Ai đó</span><span>+</span><span class="verb">have/has got</span><span>+</span><span class="detail">đồ vật hoặc đặc điểm</span>',
      ],
      example: "I've got a big family.",
      label: "Jamie có một gia đình lớn.",
      audio: "read-01",
    },
    {
      tag: "Have got",
      title: "Khi nào dùng have got?",
      note:
        "Với I, you, we và they, các con dùng have got. Trong khi nói, “I have got” thường được đọc gọn thành “I've got”.",
      formula: [
        '<span class="subject">I / You / We / They</span><span>+</span><span class="verb">have got</span>',
        '<span class="subject">I</span><span>+</span><span class="verb">\'ve got</span>',
      ],
      example: "I've got a big family.",
      label: "I, you, we, they đi với have got.",
      audio: "read-01",
    },
    {
      tag: "Has got",
      title: "Khi nào dùng has got?",
      note:
        "Với he, she và it, các con dùng has got. “He has got” có thể đọc gọn thành “He's got”.",
      formula: [
        '<span class="subject">He / She / It</span><span>+</span><span class="verb">has got</span>',
        '<span class="subject">He</span><span>+</span><span class="verb">\'s got</span>',
      ],
      example: "He's got short black hair.",
      label: "He, she, it đi với has got.",
      audio: "read-02",
    },
    {
      tag: "Phủ định",
      title: "Muốn nói “không có”",
      note:
        "Dùng haven't got với I, you, we, they. Dùng hasn't got với he, she, it.",
      formula: [
        '<span class="subject">I / You / We / They</span><span>+</span><span class="verb">haven\'t got</span>',
        '<span class="subject">He / She / It</span><span>+</span><span class="verb">hasn\'t got</span>',
      ],
      example: "She hasn't got short hair.",
      label: "Haven't got và hasn't got có nghĩa là không có.",
      audio: "read-06",
    },
  ];

  const practicePrompts = [
    {
      code: "S-HG-01",
      type: "Câu khẳng định",
      instruction: "Con nói một câu hoàn chỉnh",
      cues: ["I", "a big family"],
    },
    {
      code: "S-HG-02",
      type: "Câu khẳng định",
      instruction: "Con nói một câu hoàn chỉnh",
      cues: ["Mum", "long black hair"],
    },
    {
      code: "S-HG-03",
      type: "Câu khẳng định",
      instruction: "Con nói một câu hoàn chỉnh",
      cues: ["Grandpa", "glasses"],
    },
    {
      code: "S-HG-04",
      type: "Câu phủ định",
      instruction: "Con nói một câu có nghĩa “không có”",
      cues: ["My sister", "not", "short hair"],
    },
    {
      code: "S-HG-05",
      type: "Câu phủ định",
      instruction: "Con nói một câu có nghĩa “không có”",
      cues: ["My cousins", "not", "glasses"],
    },
    {
      code: "S-HG-06",
      type: "Câu khẳng định",
      instruction: "Con nói một câu hoàn chỉnh",
      cues: ["Grandma", "curly grey hair"],
    },
  ];

  const sharedAudio = new Audio();
  let lessonIndex = 0;
  let practiceIndex = 0;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function stopAudio() {
    sharedAudio.pause();
    sharedAudio.currentTime = 0;
    sharedAudio.onended = null;
    sharedAudio.onerror = null;
    $("#playLesson").textContent = "▶ Nghe câu mẫu tiếng Anh";
  }

  function playEnglishExample(audioId) {
    stopAudio();
    sharedAudio.src = `assets/audio/${audioId}.mp3`;
    $("#playLesson").textContent = "Đang phát câu mẫu...";
    const finish = () => {
      sharedAudio.onended = null;
      sharedAudio.onerror = null;
      $("#playLesson").textContent = "▶ Nghe câu mẫu tiếng Anh";
    };
    sharedAudio.onended = finish;
    sharedAudio.onerror = finish;
    sharedAudio.play().catch(finish);
  }

  function selectView(viewName) {
    stopAudio();
    $$(".mode-tabs button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.view === viewName);
    });
    $$(".view").forEach((view) => view.classList.remove("is-active"));
    $(`#${viewName}View`).classList.add("is-active");
  }

  function renderDots(container, count, current, onSelect) {
    container.replaceChildren();
    for (let index = 0; index < count; index += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(index + 1);
      button.classList.toggle("is-active", index === current);
      button.setAttribute("aria-label", `Mở phần ${index + 1}`);
      button.addEventListener("click", () => onSelect(index));
      container.append(button);
    }
  }

  function renderLesson() {
    stopAudio();
    const lesson = lessons[lessonIndex];
    $("#lessonNumber").textContent = String(lessonIndex + 1);
    $("#lessonProgress").style.width = `${((lessonIndex + 1) / lessons.length) * 100}%`;
    $("#lessonTag").textContent = lesson.tag;
    $("#lessonTitle").textContent = lesson.title;
    $("#lessonNote").textContent = lesson.note;
    $("#lessonFormula").innerHTML = lesson.formula
      .map((row) => `<div class="formula-row">${row}</div>`)
      .join("");
    $("#lessonExample").textContent = lesson.example;
    $("#visualLabel").textContent = lesson.label;
    renderDots($("#lessonDots"), lessons.length, lessonIndex, (index) => {
      lessonIndex = index;
      renderLesson();
    });
  }

  function renderCueList(container, cues) {
    container.replaceChildren();
    cues.forEach((cue, index) => {
      if (index > 0) {
        const plus = document.createElement("span");
        plus.className = "cue-plus";
        plus.textContent = "+";
        container.append(plus);
      }
      const chip = document.createElement("span");
      chip.className = "cue-chip";
      chip.textContent = cue;
      container.append(chip);
    });
  }

  function setPracticeTotals() {
    $$("[data-practice-total]").forEach((element) => {
      element.textContent = String(practicePrompts.length);
    });
  }

  function renderPracticePrompt() {
    const prompt = practicePrompts[practiceIndex];
    const number = practiceIndex + 1;
    $("#practiceNumber").textContent = String(number);
    $("#practiceStageNumber").textContent = String(number);
    $("#practiceProgress").style.width = `${(number / practicePrompts.length) * 100}%`;
    $("#promptCode").textContent = prompt.code;
    $("#promptType").textContent = prompt.type;
    $("#promptInstruction").textContent = prompt.instruction;
    $("#previousPrompt").disabled = practiceIndex === 0;
    $("#nextPrompt").textContent =
      practiceIndex === practicePrompts.length - 1
        ? "Hoàn thành ✓"
        : "Câu tiếp theo ›";

    const cueList = document.createElement("div");
    cueList.className = "cue-list";
    renderCueList(cueList, prompt.cues);
    $("#promptContent").replaceChildren(cueList);
  }

  function resetPractice() {
    practiceIndex = 0;
    $("#practiceComplete").hidden = true;
    $("#practiceStage").hidden = true;
    $("#practiceIntro").hidden = false;
    $("#practiceNumber").textContent = "0";
    $("#practiceProgress").style.width = "0%";
  }

  $$(".mode-tabs button").forEach((button) => {
    button.addEventListener("click", () => selectView(button.dataset.view));
  });

  $("#playLesson").addEventListener("click", () => {
    playEnglishExample(lessons[lessonIndex].audio);
  });

  $("#previousLesson").addEventListener("click", () => {
    lessonIndex = (lessonIndex - 1 + lessons.length) % lessons.length;
    renderLesson();
  });

  $("#nextLesson").addEventListener("click", () => {
    lessonIndex = (lessonIndex + 1) % lessons.length;
    renderLesson();
  });

  $("#startPractice").addEventListener("click", () => {
    practiceIndex = 0;
    $("#practiceIntro").hidden = true;
    $("#practiceComplete").hidden = true;
    $("#practiceStage").hidden = false;
    renderPracticePrompt();
  });

  $("#previousPrompt").addEventListener("click", () => {
    if (practiceIndex === 0) return;
    practiceIndex -= 1;
    renderPracticePrompt();
  });

  $("#nextPrompt").addEventListener("click", () => {
    if (practiceIndex < practicePrompts.length - 1) {
      practiceIndex += 1;
      renderPracticePrompt();
      return;
    }
    $("#practiceStage").hidden = true;
    $("#practiceComplete").hidden = false;
    $("#practiceNumber").textContent = String(practicePrompts.length);
    $("#practiceProgress").style.width = "100%";
  });

  $("#restartPractice").addEventListener("click", resetPractice);

  setPracticeTotals();
  renderLesson();
  $("#practiceProgress").style.width = "0%";
})();
