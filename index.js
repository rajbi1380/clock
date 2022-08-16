const selectMenu = document.querySelectorAll("select");
const timebox = document.querySelector(".time");
const setalarmBtn = document.querySelector("button");
const contant = document.querySelector(".contant");

let alarmtime,
  alarmstate = "noset";
const ringtone = new Audio("./files/ringtone.mp3");

for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timebox.innerHTML = `${h}:${m}:${s}`;
  if (alarmtime == `${h}:${m}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);
setalarmBtn.addEventListener("click", () => {
  alarmtime = `{${selectMenu[0].value}:${selectMenu[1].value}}`;
  if (alarmtime.includes("Hour") || alarmtime.includes("Minute")) {
    return alert("زمان هشدار را به درستی مشخص کنید");
  }
  checkstate(alarmstate);
});
function checkstate(state) {
  if (state == "set") {
    contant.classList.add("disable");
    setalarmBtn.innerText = "clear alarm";
    alarmstate = "set";
  } else {
    contant.classList.remove("disable");
    alarmtime = "";
    ringtone.pause();
    alarmstate = "noset";
    setalarmBtn.innerText = "set alarm";
  }
}
