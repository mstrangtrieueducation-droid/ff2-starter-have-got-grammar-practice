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
      audio: ["explain-01", "rule-01", "read-01"],
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
      audio: ["explain-02", "rule-02", "read-01"],
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
      audio: ["explain-03", "rule-03", "read-02"],
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
      audio: ["explain-04", "rule-04", "read-06"],
    },
  ];

  const readingItems = [
    {
      type: "read",
      audio: "read-01",
      sentence: "I've got a big family.",
      hint: "Chú ý đọc liền “I've got”.",
    },
    {
      type: "read",
      audio: "read-02",
      sentence: "He's got short black hair.",
      hint: "Đọc rõ “He's got” và âm cuối của “short”.",
    },
    {
      type: "cue",
      audio: "read-03",
      sentence: "She's got long black hair.",
      cues: ["Mum", "long black hair"],
      hint: "Con tự nói trước, sau đó nghe câu mẫu để kiểm tra.",
    },
    {
      type: "cue",
      audio: "read-06",
      sentence: "She hasn't got short hair.",
      cues: ["Sister", "not", "short hair"],
      hint: "Con nhớ dùng cấu trúc phủ định.",
    },
    {
      type: "cue",
      audio: "read-04",
      sentence: "Grandpa has got glasses.",
      cues: ["Grandpa", "glasses"],
      hint: "Con tự nói cả câu rồi mới nghe đáp án.",
    },
  ];

  const returnPrompts = [
    {
      code: "S-HG-01",
      type: "Đọc câu",
      instruction: "Con đọc to câu này",
      sentence: "I've got a big family.",
    },
    {
      code: "S-HG-02",
      type: "Đọc câu",
      instruction: "Con đọc to câu này",
      sentence: "He's got short black hair.",
    },
    {
      code: "S-HG-03",
      type: "Nói theo gợi ý",
      instruction: "Con nói một câu hoàn chỉnh",
      cues: ["Mum", "long black hair"],
    },
    {
      code: "S-HG-04",
      type: "Nói câu phủ định",
      instruction: "Con nói một câu có “không có”",
      cues: ["Sister", "not", "short hair"],
    },
    {
      code: "S-HG-05",
      type: "Nói theo gợi ý",
      instruction: "Con nói một câu hoàn chỉnh",
      cues: ["Grandpa", "glasses"],
    },
  ];

  const timings = window.GRAMMAR_AUDIO_TIMINGS ?? {};
  const sharedAudio = new Audio();
  let audioRun = 0;
  let audioFinish = null;
  let lessonIndex = 0;
  let readIndex = 0;
  let returnIndex = 0;
  let autoLessonRun = 0;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function stopAudio() {
    audioRun += 1;
    const finish = audioFinish;
    audioFinish = null;
    sharedAudio.pause();
    sharedAudio.currentTime = 0;
    sharedAudio.ontimeupdate = null;
    sharedAudio.onended = null;
    sharedAudio.onerror = null;
    clearSpeakingWords();
    if (finish) finish();
  }

  function clearSpeakingWords() {
    $$("#readSentence span").forEach((word) =>
      word.classList.remove("is-speaking"),
    );
  }

  function cancelAutoLesson() {
    autoLessonRun += 1;
    const button = $("#autoLesson");
    if (button) {
      button.classList.remove("is-running");
      button.textContent = "Tự động 4 phần";
    }
  }

  function playAudioSequence(ids, onTimeUpdate) {
    const run = ++audioRun;
    sharedAudio.pause();

    return ids.reduce(
      (sequence, id) =>
        sequence.then(
          () =>
            new Promise((resolve) => {
              if (run !== audioRun) {
                resolve(false);
                return;
              }

              sharedAudio.src = `assets/audio/${id}.mp3`;
              sharedAudio.currentTime = 0;
              sharedAudio.ontimeupdate = () => {
                if (run === audioRun && onTimeUpdate) {
                  onTimeUpdate(id, sharedAudio.currentTime, sharedAudio.duration);
                }
              };
              let settled = false;
              const finish = () => {
                if (settled) return;
                settled = true;
                if (audioFinish === finish) audioFinish = null;
                sharedAudio.ontimeupdate = null;
                sharedAudio.onended = null;
                sharedAudio.onerror = null;
                resolve(run === audioRun);
              };
              audioFinish = finish;
              sharedAudio.onended = finish;
              sharedAudio.onerror = finish;
              sharedAudio.play().catch(finish);
            }),
        ),
      Promise.resolve(true),
    );
  }

  function selectView(viewName) {
    cancelAutoLesson();
    stopAudio();
    $$(".mode-tabs button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.view === viewName);
    });
    $$(".view").forEach((view) => view.classList.remove("is-active"));
    $(`#${viewName}View`).classList.add("is-active");
  }

  $$(".mode-tabs button").forEach((button) => {
    button.addEventListener("click", () => selectView(button.dataset.view));
  });

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
      cancelAutoLesson();
      lessonIndex = index;
      renderLesson();
    });
  }

  $("#playLesson").addEventListener("click", () => {
    cancelAutoLesson();
    playAudioSequence(lessons[lessonIndex].audio);
  });

  $("#autoLesson").addEventListener("click", async () => {
    if ($("#autoLesson").classList.contains("is-running")) {
      cancelAutoLesson();
      stopAudio();
      return;
    }

    const run = ++autoLessonRun;
    $("#autoLesson").classList.add("is-running");
    $("#autoLesson").textContent = "Dừng tự động";
    for (let index = lessonIndex; index < lessons.length; index += 1) {
      if (run !== autoLessonRun) break;
      lessonIndex = index;
      renderLesson();
      const played = await playAudioSequence(lessons[index].audio);
      if (!played || run !== autoLessonRun) break;
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
    if (run === autoLessonRun) {
      $("#autoLesson").classList.remove("is-running");
      $("#autoLesson").textContent = "Tự động 4 phần";
    }
  });

  $("#previousLesson").addEventListener("click", () => {
    cancelAutoLesson();
    lessonIndex = (lessonIndex - 1 + lessons.length) % lessons.length;
    renderLesson();
  });

  $("#nextLesson").addEventListener("click", () => {
    cancelAutoLesson();
    lessonIndex = (lessonIndex + 1) % lessons.length;
    renderLesson();
  });

  function renderSentence(sentence) {
    const container = $("#readSentence");
    container.replaceChildren();
    sentence.split(/\s+/).forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word;
      container.append(span);
    });
  }

  function renderReadingCue(cues) {
    const container = $("#readCue");
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

  function revealPracticeAnswer(item) {
    renderSentence(item.sentence);
    $("#readSentence").hidden = false;
  }

  function renderReading() {
    stopAudio();
    const item = readingItems[readIndex];
    $("#readNumber").textContent = String(readIndex + 1);
    $("#readProgress").style.width = `${((readIndex + 1) / readingItems.length) * 100}%`;
    $("#readHint").textContent = item.hint;
    $("#turnNote").textContent = "";

    if (item.type === "cue") {
      $("#readTag").textContent = "Nói theo gợi ý";
      $("#readTitle").textContent = "Nhìn gợi ý và tự nói";
      renderReadingCue(item.cues);
      $("#readCue").hidden = false;
      $("#readSentence").hidden = true;
      $("#readSentence").replaceChildren();
      $("#markRead").className = "primary-button";
      $("#markRead").textContent = "Con tự nói trước";
      $("#playRead").className = "secondary-button";
      $("#playRead").textContent = "▶ Nghe đáp án";
      $("#markRead").parentElement.prepend($("#markRead"));
    } else {
      $("#readTag").textContent = "Nghe và nhắc lại";
      $("#readTitle").textContent = "Nghe và đọc theo";
      $("#readCue").hidden = true;
      renderSentence(item.sentence);
      $("#readSentence").hidden = false;
      $("#playRead").className = "primary-button";
      $("#playRead").textContent = "▶ Nghe câu mẫu";
      $("#markRead").className = "secondary-button";
      $("#markRead").textContent = "Đến lượt con đọc";
      $("#playRead").parentElement.prepend($("#playRead"));
    }

    renderDots($("#readDots"), readingItems.length, readIndex, (index) => {
      readIndex = index;
      renderReading();
    });
  }

  function highlightReadingWord(audioId, currentTime, duration) {
    const words = $$("#readSentence span");
    const boundaries = timings[audioId] ?? [];
    let activeIndex = -1;

    if (boundaries.length) {
      boundaries.forEach((boundary, index) => {
        if (currentTime >= boundary.start) activeIndex = index;
      });
    } else if (Number.isFinite(duration) && duration > 0) {
      activeIndex = Math.min(
        words.length - 1,
        Math.floor((currentTime / duration) * words.length),
      );
    }

    words.forEach((word, index) =>
      word.classList.toggle("is-speaking", index === activeIndex),
    );
  }

  $("#playRead").addEventListener("click", async () => {
    $("#turnNote").textContent = "";
    const item = readingItems[readIndex];
    if (item.type === "cue") revealPracticeAnswer(item);
    await playAudioSequence([item.audio], highlightReadingWord);
    clearSpeakingWords();
    $("#turnNote").textContent =
      item.type === "cue"
        ? "Con so sánh với câu mình vừa nói rồi đọc lại một lần."
        : "Đến lượt con tự đọc lại cả câu.";
  });

  $("#markRead").addEventListener("click", () => {
    stopAudio();
    const item = readingItems[readIndex];
    $("#turnNote").textContent =
      item.type === "cue"
        ? "Con nhìn hai gợi ý và tự nói một câu hoàn chỉnh."
        : "Con đọc chậm, rõ và không bỏ âm cuối nhé.";
  });

  $("#previousRead").addEventListener("click", () => {
    readIndex = (readIndex - 1 + readingItems.length) % readingItems.length;
    renderReading();
  });

  $("#nextRead").addEventListener("click", () => {
    readIndex = (readIndex + 1) % readingItems.length;
    renderReading();
  });

  function renderReturnPrompt() {
    const prompt = returnPrompts[returnIndex];
    $("#returnNumber").textContent = String(returnIndex + 1);
    $("#returnStageNumber").textContent = String(returnIndex + 1);
    $("#returnProgress").style.width = `${((returnIndex + 1) / returnPrompts.length) * 100}%`;
    $("#promptCode").textContent = prompt.code;
    $("#promptType").textContent = prompt.type;
    $("#promptInstruction").textContent = prompt.instruction;
    $("#previousPrompt").disabled = returnIndex === 0;
    $("#nextPrompt").textContent =
      returnIndex === returnPrompts.length - 1
        ? "Hoàn thành ✓"
        : "Câu tiếp theo ›";

    const content = $("#promptContent");
    content.replaceChildren();
    if (prompt.sentence) {
      const sentence = document.createElement("p");
      sentence.className = "return-sentence";
      sentence.textContent = prompt.sentence;
      content.append(sentence);
      return;
    }

    const cueList = document.createElement("div");
    cueList.className = "cue-list";
    prompt.cues.forEach((cue, index) => {
      if (index > 0) {
        const plus = document.createElement("span");
        plus.className = "cue-plus";
        plus.textContent = "+";
        cueList.append(plus);
      }
      const chip = document.createElement("span");
      chip.className = "cue-chip";
      chip.textContent = cue;
      cueList.append(chip);
    });
    content.append(cueList);
  }

  $("#returnForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("#studentName").value.trim();
    const studentClass = $("#studentClass").value.trim();
    if (!name) {
      $("#returnError").textContent = "Con nhập họ và tên trước nhé.";
      $("#studentName").focus();
      return;
    }

    $("#returnError").textContent = "";
    $("#returnStudent").textContent = name;
    $("#returnClass").textContent = studentClass ? `Lớp ${studentClass}` : "";
    $("#completeStudent").textContent = studentClass
      ? `${name} – Lớp ${studentClass}`
      : name;
    returnIndex = 0;
    $("#returnIntro").hidden = true;
    $("#returnComplete").hidden = true;
    $("#returnStage").hidden = false;
    renderReturnPrompt();
  });

  $("#previousPrompt").addEventListener("click", () => {
    if (returnIndex === 0) return;
    returnIndex -= 1;
    renderReturnPrompt();
  });

  $("#nextPrompt").addEventListener("click", () => {
    if (returnIndex < returnPrompts.length - 1) {
      returnIndex += 1;
      renderReturnPrompt();
      return;
    }
    $("#returnStage").hidden = true;
    $("#returnComplete").hidden = false;
    $("#returnNumber").textContent = "5";
    $("#returnProgress").style.width = "100%";
  });

  $("#restartReturn").addEventListener("click", () => {
    returnIndex = 0;
    $("#returnComplete").hidden = true;
    $("#returnIntro").hidden = false;
    $("#returnNumber").textContent = "1";
    $("#returnProgress").style.width = "20%";
  });

  renderLesson();
  renderReading();
  $("#returnProgress").style.width = "20%";
})();
