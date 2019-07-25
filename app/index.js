import * as simpleSettings from "./modules/device-settings";
import document from "document";
import * as messaging from "messaging";
import { display } from "display";
import { battery as powerBattery } from "power";
import { charger as powerCharger } from "power";
import clock from "clock";
import * as util from "./utils";
import { me as appbit } from "appbit";
import { preferences, units } from "user-settings";
import { memory } from "system";


import * as device from "./modules/device";
//import * as bm from "./bm.js";
import * as date from "./modules/date"
import * as battery from "./modules/battery"
import * as time from "./modules/time";
//import * as hr from "./hr.js"
//import * as activity from "./activity.js"
import * as settings from "./modules/settings";
import * as state from "./modules/state";

console.log("JS memory initial: " + memory.js.used + "/" + memory.js.total);

/**
 * all actions must export a `start` and `stop` method
 */
//const modules = [time, battery, heart, activity];
const modules = [time, date];

clock.granularity = "seconds";
settings.loadSettings();
device.deviceSetup();

messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  //if settings[evt.data.key] != 
  if (evt.data.key === "dateFormat" && evt.data.newValue) {
      setDateFormat();
    
  }
}

display.onchange = (evt) => {
  update();
}

clock.ontick = (evt) => {
  console.log("Update");
  update();
//  time.updateTime(evt.date);
//  date.drawDate(evt.date);
//  activity.drawAllProgress();
}

powerBattery.onchange = (evt) => {
  battery.start()  
//  battery.drawBat();
//  hr.batteryCharger();
}

powerCharger.onchange = (evt) => {
//  battery.isCharging();
//  hr.batteryCharger();
}

function update() {
  time.start();
  date.start();
  battery.start();
//  modules.forEach(mod => {
//    mod.start();
//  })
}
function pause() {
  time.stop();
  date.stop();
  battery.stop();
//  modules.forEach(mod => {
//    mod.stop();
//  })
}

if (display.on) {
  update();
}

display.addEventListener("change", function() {
  if (display.on) {
    update();
  } else {
    pause();
  }
});

// weather updates every hour and so doesn't need to be start/stopped
//weather.start();

// initialize local storage of settings
simpleSettings.initialize();
