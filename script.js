
const texts = [
  "Лерусенька, поздравляю тебя с Днем всех влюбленных",
  "Если ты читаешь это — значит ето робiт",
  "Я плохо делаю самодельные открытки",
  "Поэтому я решил сделать то, что у меня получается получше",
  "Надеюсь тебе это тоже понравится",
  "Ты — невероятный человек",
  "Ты умеешь делать мой мир теплее просто своим присутствием ",
  "Когда ты улыбаешься — у меня внутри праздник ",
  "Когда тебе грустно — мне хочется быть рядом и обнимать тебя крепко ",
  "Я люблю, когда мы вместе смеёмся",
  "Люблю делать с тобой домашку",
  "Обожаю заниматься с тобой спортом",
  "Ты меня вдохновляешь больше всего в жизни",
  "Мы всегда будем рядом",
  "И пройдем все трудности",
  "Даже когда сложно",
  "Я люблю тебя больше всего на свете!",
  "Ты моя муза, я буду защищать и любить тебя всегда! ",
  "Предлагаю прогуляться"
];




let step = 0;
const textEl = document.getElementById("text");
const btn = document.getElementById("btn");
const card = document.getElementById("card");

textEl.innerText = texts[step];

btn.onclick = () => {
  step++;
  if (step < texts.length) {
    textEl.innerText = texts[step];
  } else {
    card.style.display = "none";
    startGame();
  }
};


setInterval(() => {
  const h = document.createElement("img");
  h.src = "images/heart.png";
  h.className = "heart";
  h.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 6000);
}, 250);


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.6;


const VISUAL_SIZE = canvas.height * 0.45; 
const COLLIDER_SIZE = VISUAL_SIZE * 0.5;  
const gravity = 1.1;
const ground = canvas.height - 20;

let player = {
  x: 20,
  y: ground - COLLIDER_SIZE,
  vx: 0,
  vy: 0,
  w: COLLIDER_SIZE,
  h: COLLIDER_SIZE,
  onGround: false
};


const obstacles = [
  { x: 250, y: ground - 20, w: 50, h: 20, type: "platform" },
  { x: 450, y: ground - 20, w: 50, h: 20, type: "platform" },
  { x: 650, y: ground - 20, w: 50, h: 20, type: "platform" }
];

const herImg = new Image();
herImg.src = "images/Lerusya.png";

const youImg = new Image();
youImg.src = "images/I.png";

function startGame() {
  canvas.style.display = "block";
  document.getElementById("controls").style.display = "flex";
  requestAnimationFrame(loop);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  player.vy += gravity;
  player.x += player.vx;
  player.y += player.vy;
  player.onGround = false;


  if (player.y + player.h >= ground) {
    player.y = ground - player.h;
    player.vy = 0;
    player.onGround = true;
  }


  if (player.x < 0) player.x = 0;


  obstacles.forEach(o => {
    ctx.fillStyle = "#ff6f91";
    ctx.fillRect(o.x, o.y, o.w, o.h);

    if (
      player.x < o.x + o.w &&
      player.x + player.w > o.x &&
      player.y < o.y + o.h &&
      player.y + player.h > o.y
    ) {
      if (player.vy > 0) {
        player.y = o.y - player.h;
        player.vy = 0;
        player.onGround = true;
      }
    }
  });


  ctx.drawImage(
    herImg,
    player.x - (VISUAL_SIZE - player.w)/2,
    player.y - (VISUAL_SIZE - player.h),
    VISUAL_SIZE,
    VISUAL_SIZE
  );

  ctx.drawImage(
    youImg,
    canvas.width - VISUAL_SIZE - 20,
    ground - VISUAL_SIZE,
    VISUAL_SIZE,
    VISUAL_SIZE
  );

if (player.x + player.w > canvas.width - COLLIDER_SIZE - 30) {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffd6e0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${canvas.height * 0.55}px Arial`; 
  ctx.fillStyle = "#ff2d55";
  ctx.shadowColor = "#ff8fab";
  ctx.shadowBlur = 40;


  ctx.fillText("❤️", canvas.width / 2, canvas.height / 2);

  return; 
}

  requestAnimationFrame(loop);
}


const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const jumpBtn = document.getElementById("jump");

leftBtn.addEventListener("touchstart", () => player.vx = -4);
rightBtn.addEventListener("touchstart", () => player.vx = 4);

leftBtn.addEventListener("touchend", () => player.vx = 0);
rightBtn.addEventListener("touchend", () => player.vx = 0);

jumpBtn.addEventListener("touchstart", () => {
  if (player.onGround) {
    player.vy = -20;
    player.onGround = false;
  }
});