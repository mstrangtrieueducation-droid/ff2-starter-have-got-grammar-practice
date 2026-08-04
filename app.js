(() => {
  const lessons = [
    {
      tag: "Have got · Ý nghĩa",
      title: '"Have got" nghĩa là gì?',
      note:
        '“Have got” nghĩa là “có”. Ta dùng cấu trúc này để nói một người có đồ vật gì hoặc có đặc điểm như thế nào.',
      formula: [
        '<span class="subject">Ai đó</span><span>+</span><span class="verb">have/has got</span><span>+</span><span class="detail">đồ vật hoặc đặc điểm</span>',
      ],
      example: "I've got a big family.",
      label: "Jamie có một gia đình lớn.",
      audio: "read-01",
      visual: "family",
    },
    {
      tag: "Have got · Chủ ngữ số nhiều",
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
      visual: "family",
    },
    {
      tag: "Have got · Chủ ngữ số ít",
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
      visual: "family",
    },
    {
      tag: "Have got · Phủ định",
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
      visual: "family",
    },
    {
      tag: "There is / There are · Số ít",
      title: "Khi nào dùng there is?",
      note:
        "Dùng there is để nói có một người hoặc một đồ vật ở đâu đó. Khi nói, “there is” thường được đọc gọn thành “there’s”.",
      formula: [
        '<span class="verb">There is / There\'s</span><span>+</span><span class="detail">một người hoặc một đồ vật</span><span>+</span><span class="subject">vị trí</span>',
      ],
      example: "There's a pillow on the table.",
      label: "Có một chiếc gối ở trên bàn.",
      audio: "read-07",
      visual: "room",
    },
    {
      tag: "There is / There are · Số nhiều",
      title: "Khi nào dùng there are?",
      note:
        "Dùng there are để nói có từ hai người hoặc hai đồ vật trở lên. Nhìn số lượng để chọn đúng there is hoặc there are.",
      formula: [
        '<span class="verb">There are</span><span>+</span><span class="detail">hai hoặc nhiều người, đồ vật</span><span>+</span><span class="subject">vị trí</span>',
      ],
      example: "There are three dolls under the bed.",
      label: "Có ba con búp bê ở dưới giường.",
      audio: "read-08",
      visual: "room",
    },
    {
      tag: "Giới từ chỉ vị trí",
      title: "In, on và under",
      note:
        "In nghĩa là ở trong. On nghĩa là ở trên và có chạm vào bề mặt. Under nghĩa là ở dưới. Con nhìn vị trí thật kỹ trước khi nói.",
      formula: [
        '<span class="detail">in</span><span>=</span><span>ở trong</span>',
        '<span class="detail">on</span><span>=</span><span>ở trên</span>',
        '<span class="detail">under</span><span>=</span><span>ở dưới</span>',
      ],
      example: "The teddy bear is in the cupboard.",
      label: "Gấu bông ở trong tủ.",
      audio: "read-09",
      visual: "room",
    },
  ];

  const imageCue = (image) => ({ image });

  const practicePrompts = [
    {
      group: "Have got",
      type: "Have got · Câu khẳng định",
      instruction: "Con nói một câu hoàn chỉnh",
      cues: ["I", "a big", imageCue("family")],
      answer: "I've got a big family.",
      visual: "family",
    },
    {
      group: "Have got",
      type: "Have got · Câu khẳng định",
      instruction: "Con nói một câu hoàn chỉnh",
      cues: ["Mum", "long black", imageCue("hair-long-black")],
      answer: "Mum has got long black hair.",
      visual: "family",
    },
    {
      group: "Have got",
      type: "Have got · Câu khẳng định",
      instruction: "Con nói một câu hoàn chỉnh",
      cues: ["Grandpa", imageCue("glasses")],
      answer: "Grandpa has got glasses.",
      visual: "family",
    },
    {
      group: "Have got",
      type: "Have got · Câu phủ định",
      instruction: "Con nói một câu có nghĩa “không có”",
      cues: ["My sister", "not", "short", imageCue("hair-short-black")],
      answer: "My sister hasn't got short hair.",
      visual: "family",
    },
    {
      group: "Have got",
      type: "Have got · Câu phủ định",
      instruction: "Con nói một câu có nghĩa “không có”",
      cues: ["My cousins", "not", imageCue("glasses")],
      answer: "My cousins haven't got glasses.",
      visual: "family",
    },
    {
      group: "Have got",
      type: "Have got · Câu khẳng định",
      instruction: "Con nói một câu hoàn chỉnh",
      cues: ["Grandma", "curly grey", imageCue("hair-curly-grey")],
      answer: "Grandma has got curly grey hair.",
      visual: "family",
    },
    {
      group: "There is / There are",
      type: "There is · Một đồ vật",
      instruction: "Con nói một câu bắt đầu bằng There’s",
      cues: ["a", imageCue("pillow"), "on", imageCue("table")],
      answer: "There's a pillow on the table.",
      visual: "room",
    },
    {
      group: "There is / There are",
      type: "There are · Nhiều đồ vật",
      instruction: "Con nói một câu bắt đầu bằng There are",
      cues: ["three", imageCue("dolls"), "under", imageCue("bed")],
      answer: "There are three dolls under the bed.",
      visual: "room",
    },
    {
      group: "There is / There are",
      type: "There is · Một đồ vật",
      instruction: "Con nói một câu bắt đầu bằng There’s",
      cues: ["a", imageCue("teddy-bear"), "in", imageCue("cupboard")],
      answer: "There's a teddy bear in the cupboard.",
      visual: "room",
    },
    {
      group: "There is / There are",
      type: "There is · Một đồ vật",
      instruction: "Con nói một câu bắt đầu bằng There’s",
      cues: ["a", imageCue("pillow"), "under", imageCue("table")],
      answer: "There's a pillow under the table.",
      visual: "room",
    },
    {
      group: "There is / There are",
      type: "There are · Nhiều đồ vật",
      instruction: "Con nói một câu bắt đầu bằng There are",
      cues: ["three", imageCue("dolls"), "on", imageCue("bed")],
      answer: "There are three dolls on the bed.",
      visual: "room",
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
    const roomLesson = lesson.visual === "room";
    $("#lessonNumber").textContent = String(lessonIndex + 1);
    $("#lessonTotal").textContent = String(lessons.length);
    $("#lessonProgress").style.width = `${((lessonIndex + 1) / lessons.length) * 100}%`;
    $("#lessonTag").textContent = lesson.tag;
    $("#lessonTitle").textContent = lesson.title;
    $("#lessonNote").textContent = lesson.note;
    $("#lessonFormula").innerHTML = lesson.formula
      .map((row) => `<div class="formula-row">${row}</div>`)
      .join("");
    $("#lessonExample").textContent = lesson.example;
    $("#visualLabel").textContent = lesson.label;
    $("#lessonVisual").src = roomLesson
      ? "assets/starter-room-scene.webp"
      : "assets/family-birthday.webp";
    $("#lessonVisual").alt = roomLesson
      ? "Phòng ngủ có đồ vật ở các vị trí khác nhau"
      : "Một gia đình đang ngồi bên bàn sinh nhật";
    renderDots($("#lessonDots"), lessons.length, lessonIndex, (index) => {
      lessonIndex = index;
      renderLesson();
    });
  }

  function createVocabularyImage(name, compact = false) {
    const image = document.createElement("span");
    image.className = `cue-image cue-image--${name}`;
    if (compact) image.classList.add("is-compact");
    image.setAttribute("role", "img");
    image.setAttribute("aria-label", "Hình từ vựng");
    return image;
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
      if (typeof cue === "object" && cue.image) {
        container.append(createVocabularyImage(cue.image));
        return;
      }
      const chip = document.createElement("span");
      chip.className = "cue-chip";
      chip.textContent = cue;
      container.append(chip);
    });
  }

  function renderAnswerSheet() {
    const answerGroups = $("#answerGroups");
    answerGroups.replaceChildren();

    const groups = new Map();
    practicePrompts.forEach((prompt, index) => {
      if (!groups.has(prompt.group)) groups.set(prompt.group, []);
      groups.get(prompt.group).push({ prompt, index });
    });

    groups.forEach((items, groupName) => {
      const section = document.createElement("section");
      section.className = "answer-group";

      const heading = document.createElement("h3");
      heading.textContent = groupName;
      section.append(heading);

      const list = document.createElement("ol");
      list.className = "answer-list";
      list.start = items[0].index + 1;

      items.forEach(({ prompt }) => {
        const item = document.createElement("li");
        const thumbnails = document.createElement("div");
        thumbnails.className = "answer-thumbnails";
        prompt.cues
          .filter((cue) => typeof cue === "object" && cue.image)
          .forEach((cue) => {
            thumbnails.append(createVocabularyImage(cue.image, true));
          });

        const answer = document.createElement("p");
        answer.textContent = prompt.answer;
        const row = document.createElement("div");
        row.className = "answer-row";
        row.append(thumbnails, answer);
        item.append(row);
        list.append(item);
      });

      section.append(list);
      answerGroups.append(section);
    });
  }

  function setPracticeTotals() {
    $$("[data-practice-total]").forEach((element) => {
      element.textContent = String(practicePrompts.length);
    });
  }

  function renderPracticePrompt() {
    const prompt = practicePrompts[practiceIndex];
    const roomPrompt = prompt.visual === "room";
    const number = practiceIndex + 1;
    $("#practiceNumber").textContent = String(number);
    $("#practiceStageNumber").textContent = String(number);
    $("#practiceProgress").style.width = `${(number / practicePrompts.length) * 100}%`;
    $("#promptType").textContent = prompt.type;
    $("#promptInstruction").textContent = prompt.instruction;
    $("#practiceVisual").src = roomPrompt
      ? "assets/starter-room-vocabulary.webp"
      : "assets/family-birthday.webp";
    $("#practiceVisual").alt = roomPrompt
      ? "Bộ hình từ vựng đồ vật trong phòng"
      : "Hình gia đình gợi ý cho bài nói";
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
    $("#practiceComplete").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("#restartPractice").addEventListener("click", resetPractice);

  setPracticeTotals();
  renderAnswerSheet();
  renderLesson();
  $("#practiceProgress").style.width = "0%";
})();
