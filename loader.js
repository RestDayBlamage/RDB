  const progressText = document.getElementById("progress-text");
  const progressFill = document.getElementById("progress-fill");

  let percent = 0;
  const interval = setInterval(() => {
    if (percent < 90) {
      percent += Math.random() * 5; // losowy przyrost
      progressFill.style.width = percent + "%";
      progressText.textContent = "" + Math.floor(percent) + "%";
    }
  }, 200);

  window.addEventListener("load", () => {
    clearInterval(interval);
    progressFill.style.width = "100%";
    progressText.textContent = "100%";
    setTimeout(() => {
      document.body.classList.add("loaded");
      document.getElementById("content").style.display = "block";
    }, 500); // małe opóźnienie dla efektu
  });