(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function calculate() {
    const selected = $$(".score-button.is-on");
    const score = selected.length;
    $("#score").textContent = String(score);

    const name = $("#gradingName").value.trim() || "Học sinh";
    const studentClass = $("#gradingClass").value.trim();
    const needsWork = [];

    $$(".grading-item").forEach((item) => {
      const code = item.dataset.code;
      const sentenceOn = item.querySelector('[data-point="sentence"]').classList.contains("is-on");
      const speechOn = item.querySelector('[data-point="speech"]').classList.contains("is-on");
      if (!sentenceOn && !speechOn) {
        needsWork.push(`${code}: luyện lại câu và phát âm`);
      } else if (!sentenceOn) {
        needsWork.push(`${code}: luyện lại cấu trúc`);
      } else if (!speechOn) {
        needsWork.push(`${code}: đọc chậm và rõ hơn`);
      }
    });

    const heading = studentClass
      ? `${name} – Lớp ${studentClass}`
      : name;
    const lines = [
      `${heading}`,
      `FF2 Starter – Have got: ${score}/10.`,
    ];

    if (needsWork.length === 0) {
      lines.push("Con dùng đúng cấu trúc và đọc rõ cả 5 câu.");
    } else {
      lines.push(`Cần luyện thêm: ${needsWork.join("; ")}.`);
    }

    $("#feedback").value = lines.join("\n");
  }

  $$(".score-button").forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      button.classList.toggle("is-on");
      button.setAttribute(
        "aria-pressed",
        button.classList.contains("is-on") ? "true" : "false",
      );
      calculate();
    });
  });

  $("#gradingName").addEventListener("input", calculate);
  $("#gradingClass").addEventListener("input", calculate);

  $("#copyFeedback").addEventListener("click", async () => {
    const button = $("#copyFeedback");
    try {
      await navigator.clipboard.writeText($("#feedback").value);
      button.textContent = "Đã sao chép";
    } catch {
      $("#feedback").select();
      document.execCommand("copy");
      button.textContent = "Đã sao chép";
    }
    setTimeout(() => {
      button.textContent = "Sao chép nhận xét";
    }, 1500);
  });

  $("#resetGrading").addEventListener("click", () => {
    $("#gradingName").value = "";
    $("#gradingClass").value = "";
    $$(".score-button").forEach((button) => {
      button.classList.remove("is-on");
      button.setAttribute("aria-pressed", "false");
    });
    calculate();
    $("#gradingName").focus();
  });

  calculate();
})();
