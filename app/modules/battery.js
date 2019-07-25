import document from "document";
import { battery } from "power";
import { charger } from "power";
import { me as device } from "device";
import * as util from "../../common/utils";

export let batteryToggle = false;
export function setBatteryToggle(val) { batteryToggle = val}

let isBatteryAlert = false;
let wasBatteryAlert = true;

const deviceType = (device.screen.width == 300 && device.screen.height == 300) ? "Versa" : "Ionic"

function setBattery(){
  let dateLabel = document.getElementById("day");
  let batteryLevelLabel = document.getElementById("batteryLevelLabel");
  let batteryLevelRect = document.getElementById("batteryLevelRect");
  let batteryLevelImage = document.getElementById("batteryLevelImage");
  
  //let batterychargeLevel = 12
  
  
  wasBatteryAlert = isBatteryAlert;
  if (((battery.chargeLevel <= 16 || battery.charging) && !isBatteryAlert) || charger.connected) {
    //console.log("battery Alert on");
    isBatteryAlert = true;
  } else if (!((battery.chargeLevel <= 16 || battery.charging) || charger.connected)){
    //console.log("battery Alert off");
    isBatteryAlert = false;
  }
  
  if (isBatteryAlert != wasBatteryAlert){
    if (isBatteryAlert){
      dateLabel.x = 35;
      batteryLevelLabel.style.fontSize = 30;
      if (deviceType == "Versa"){
        batteryLevelLabel.x = 235;
        batteryLevelLabel.y = 30;
      } else{ 
        batteryLevelLabel.x = 279;
        batteryLevelLabel.y = 26;
      }
      batteryLevelRect.style.display = "none";
      batteryLevelImage.href = "";
    } else {
      dateLabel.x = 10;
      if (deviceType == "Versa"){
        batteryLevelLabel.x = 245;
        batteryLevelLabel.y = 29;
      } else {
        batteryLevelLabel.x = 284;
        batteryLevelLabel.y = 26;
      }
      batteryLevelLabel.style.fontSize = 26;
      batteryLevelImage.href = "icons/battery/battery.png";
    }
//    updateStatsData();
  }
  if (batteryToggle || isBatteryAlert){
    batteryLevelLabel.style.fill = util.goalToColor(battery.chargeLevel, 90)
    if (isBatteryAlert)
      batteryLevelLabel.text = `${battery.chargeLevel}%`
    else
      batteryLevelLabel.text = `${battery.chargeLevel}`
    batteryLevelRect.style.display = "none";
    batteryLevelLabel.style.display = "inline";
  } else {
    batteryLevelRect.style.fill = util.goalToColor(battery.chargeLevel, 90)
    batteryLevelRect.width = parseInt((battery.chargeLevel/100) * 39);
    batteryLevelRect.style.display = "inline";
    batteryLevelLabel.style.display = "none";
  }
}

export function start() {
  setBattery(); 
}

export function stop() {
  clock.ontick = void 0;
}

