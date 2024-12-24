// اختيار العناصر
const playerCar = document.querySelector('.player-car');
const enemyCar = document.querySelector('.enemy-car');

let gameInterval;
let isGameOver = false;

// التحكم في حركة سيارة اللاعب
document.addEventListener('keydown', (event) => {
  if (isGameOver) return;
  const playerLeft = parseInt(window.getComputedStyle(playerCar).left);

  if (event.key === 'ArrowLeft' && playerLeft > 10) {
    playerCar.style.left = `${playerLeft - 10}px`;
  } else if (event.key === 'ArrowRight' && playerLeft < 260) {
    playerCar.style.left = `${playerLeft + 10}px`;
  }
});

// بدء اللعبة
function startGame() {
  isGameOver = false;
  playerCar.style.left = '135px';
  enemyCar.style.top = '-100px';

  gameInterval = setInterval(() => {
    const enemyTop = parseInt(window.getComputedStyle(enemyCar).top);
    const playerTop = parseInt(window.getComputedStyle(playerCar).top);
    const playerLeft = parseInt(window.getComputedStyle(playerCar).left);
    const enemyLeft = parseInt(window.getComputedStyle(enemyCar).left);

    // تحريك سيارة الخصم
    enemyCar.style.top = `${enemyTop + 5}px`;

    // إعادة سيارة الخصم إذا خرجت عن الشاشة
    if (enemyTop > 500) {
      enemyCar.style.top = '-100px';
      enemyCar.style.left = `${Math.floor(Math.random() * 270)}px`;
    }

    // التحقق من التصادم
    if (
      enemyTop + 50 > playerTop &&
      enemyTop < playerTop + 50 &&
      enemyLeft + 30 > playerLeft &&
      enemyLeft < playerLeft + 30
    ) {
      endGame();
    }
  }, 30);
}

// إنهاء اللعبة
function endGame() {
  isGameOver = true;
  clearInterval(gameInterval);
  alert('لقد خسرت! حاول مرة أخرى.');
  startGame(); // إعادة تشغيل اللعبة تلقائيًا
}

// بدء اللعبة عند التحميل
startGame();
