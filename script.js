const bgMusic = document.getElementById("bgMusic");
const polaroidScreen = document.getElementById("polaroid-screen");
const catScreen = document.getElementById("cat-screen");
const unlockScreen = document.getElementById("unlock-screen");
const envelopeScreen = document.getElementById("envelope-screen");
const letterScreen = document.getElementById("letter-screen");

const loveBtns = document.querySelectorAll(".love-btn");
const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const errorText = document.getElementById("errorText");

const envelope = document.getElementById("envelope");

const letterImage = document.getElementById("letterImage");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentPage = 1;
const totalPages = 5;

/* ================= LOVE BUTTON CLICK ================= */

  loveBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    // Start music after user interaction
    bgMusic.play().catch(() => {});
    polaroidScreen.classList.add("hidden");
    catScreen.classList.remove("hidden");

    setTimeout(() => {
      catScreen.classList.add("hidden");
      unlockScreen.classList.remove("hidden");
    }, 3000);
  });
});

/* ================= PASSWORD CHECK ================= */
unlockBtn.addEventListener("click", () => {
  if (passwordInput.value === "070725") {
    unlockScreen.classList.add("hidden");
    envelopeScreen.classList.remove("hidden");
    errorText.textContent = "";
    passwordInput.value = "";
  } else {
    errorText.textContent = "Incorrect password.";
  }
});

/* Allow Enter key for password */
passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    unlockBtn.click();
  }
});

/* ================= ENVELOPE OPEN ================= */
envelope.addEventListener("click", () => {

  if (envelope.classList.contains("open")) return;

  envelope.classList.add("open");

  // Match this to CSS lid transition (1.4s)
  setTimeout(() => {
    envelopeScreen.classList.add("hidden");
    letterScreen.classList.remove("hidden");

    // Smooth fade in
    letterImage.style.opacity = "0";
    setTimeout(() => {
      letterImage.style.opacity = "1";
    }, 100);

  }, 2000);
});

/* ================= LETTER NAVIGATION ================= */

function updateLetter() {
  letterImage.style.opacity = "0";

  setTimeout(() => {
    letterImage.src = "page" + currentPage + ".jpg";
    letterImage.style.opacity = "1";
  }, 200);
}

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    updateLetter();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateLetter();
  }
});

bgMusic.volume = 0;
let fadeAudio = setInterval(() => {
  if (bgMusic.volume < 0.5) {
    bgMusic.volume += 0.02;
  } else {
    clearInterval(fadeAudio);
  }
}, 200);
