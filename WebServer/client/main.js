var settings;
//Button interactions
function digitPressed(digitId, tab) {
  var button = document.getElementById(digitId);
  var buttonList = ["db0", "db1", "db2", "db3", "db4", "db5"];
  if (tab == "night") {
    buttonList = ["nb0", "nb1", "nb2", "nb3", "nb4", "nb5"];
  }
  var selAll = true;
  if (digitId != "dbsa" || digitId != "nbsa") {
    if (button.classList.contains("btn-secondary")) {
      button.classList.remove("btn-secondary");
      button.classList.add("btn-primary");
    } else {
      button.classList.remove("btn-primary");
      button.classList.add("btn-secondary");
    }
  }
  if (digitId == "dbsa" || digitId == "nbsa") {
    buttonList.forEach(function (id) {
      const btn = document.getElementById(id);
      if (btn.classList.contains("btn-secondary")) {
        selAll = false;
      }
    });
    buttonList.forEach(function (id) {
      const btn = document.getElementById(id);
      if (!selAll) {
        btn.classList.remove("btn-secondary");
        btn.classList.add("btn-primary");
      } else if (selAll) {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-secondary");
      }
    });
  }
  selAll = true;
  buttonList.forEach(function (id) {
    const btn = document.getElementById(id);
    if (btn.classList.contains("btn-secondary")) {
      selAll = false;
    }
  });
  if (tab == "night") {
    button = document.getElementById("nbsa");
  } else {
    button = document.getElementById("dbsa");
  }
  if (selAll) {
    button.classList.remove("btn-secondary");
    button.classList.add("btn-primary");
  } else if (!selAll) {
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
  }
}
function modeChange(value) {
  settings.Mode = Number(value);
  if (settings.Mode == 1 || settings.Mode == 2) {
    document.getElementById("dbsa").disabled = false;
    document.getElementById("db0").disabled = false;
    document.getElementById("db1").disabled = false;
    document.getElementById("db2").disabled = false;
    document.getElementById("db3").disabled = false;
    document.getElementById("db4").disabled = false;
    document.getElementById("db5").disabled = false;
    document.getElementById("dayhSlider").disabled = false;
    document.getElementById("daysSlider").disabled = false;
    document.getElementById("dayvSlider").disabled = false;
    document.getElementById("inputhday").disabled = false;
    document.getElementById("inputsday").disabled = false;
    document.getElementById("inputvday").disabled = false;
    document.getElementById("inputrday").disabled = false;
    document.getElementById("inputgday").disabled = false;
    document.getElementById("inputbday").disabled = false;
  } else {
    document.getElementById("dbsa").disabled = true;
    document.getElementById("db0").disabled = true;
    document.getElementById("db1").disabled = true;
    document.getElementById("db2").disabled = true;
    document.getElementById("db3").disabled = true;
    document.getElementById("db4").disabled = true;
    document.getElementById("db5").disabled = true;
    document.getElementById("dayhSlider").disabled = true;
    document.getElementById("daysSlider").disabled = true;
    document.getElementById("dayvSlider").disabled = true;
    document.getElementById("inputhday").disabled = true;
    document.getElementById("inputsday").disabled = true;
    document.getElementById("inputvday").disabled = true;
    document.getElementById("inputrday").disabled = true;
    document.getElementById("inputgday").disabled = true;
    document.getElementById("inputbday").disabled = true;
  }
}
function nightModeChange(value) {
  settings.NightMode = Number(value);
  if (settings.NightMode == 1 || settings.NightMode == 2) {
    document.getElementById("nbsa").disabled = false;
    document.getElementById("nb0").disabled = false;
    document.getElementById("nb1").disabled = false;
    document.getElementById("nb2").disabled = false;
    document.getElementById("nb3").disabled = false;
    document.getElementById("nb4").disabled = false;
    document.getElementById("nb5").disabled = false;
    document.getElementById("nighthSlider").disabled = false;
    document.getElementById("nightsSlider").disabled = false;
    document.getElementById("nightvSlider").disabled = false;
    document.getElementById("inputhnight").disabled = false;
    document.getElementById("inputsnight").disabled = false;
    document.getElementById("inputvnight").disabled = false;
    document.getElementById("inputrnight").disabled = false;
    document.getElementById("inputgnight").disabled = false;
    document.getElementById("inputbnight").disabled = false;
  } else {
    document.getElementById("nbsa").disabled = true;
    document.getElementById("nb0").disabled = true;
    document.getElementById("nb1").disabled = true;
    document.getElementById("nb2").disabled = true;
    document.getElementById("nb3").disabled = true;
    document.getElementById("nb4").disabled = true;
    document.getElementById("nb5").disabled = true;
    document.getElementById("nighthSlider").disabled = true;
    document.getElementById("nightsSlider").disabled = true;
    document.getElementById("nightvSlider").disabled = true;
    document.getElementById("inputhnight").disabled = true;
    document.getElementById("inputsnight").disabled = true;
    document.getElementById("inputvnight").disabled = true;
    document.getElementById("inputrnight").disabled = true;
    document.getElementById("inputgnight").disabled = true;
    document.getElementById("inputbnight").disabled = true;
  }
}
function updateSettings() {
  settings.NightSec = Number(document.getElementById("NightSeconds").checked);
  settings.tfTime = Number(document.getElementById("tfTime").checked);
  settings.NightModeOff = Number(
    document.getElementById("nightModeOff").checked
  );
  settings.Speed = Number(document.getElementById("speed").value);
  settings.SetNight = document.getElementById("NightModeTest").checked;
  settings.StartTime =
    Number(document.getElementById("nightStart").value.substring(0, 2) * 60) +
    Number(document.getElementById("nightStart").value.substring(3, 5));
  settings.EndTime =
    Number(document.getElementById("nightEnd").value.substring(0, 2) * 60) +
    Number(document.getElementById("nightEnd").value.substring(3, 5));
}
//Color update
function sliderChanged(tab) {
  var hslider = document.getElementById(tab + "hSlider");
  var sslider = document.getElementById(tab + "sSlider");
  var vslider = document.getElementById(tab + "vSlider");
  colorChanged(hslider.value, sslider.value, vslider.value, tab);
}
function HSVChanged(tab) {
  var inputh = document.getElementById("inputh" + tab);
  var inputs = document.getElementById("inputs" + tab);
  var inputv = document.getElementById("inputv" + tab);
  colorChanged(inputh.value, inputs.value, inputv.value, tab);
}
function RGBChanged(tab) {
  var inputr = document.getElementById("inputr" + tab);
  var inputg = document.getElementById("inputg" + tab);
  var inputb = document.getElementById("inputb" + tab);
  var temp = rgbTohsv(inputr.value, inputg.value, inputb.value);
  colorChanged(temp.h, temp.s, temp.v, tab);
}
function colorChanged(h, s, v, tab) {
  changeSampleColor(h, s, v, tab);
  changeSlider(h, s, v, tab);
  changeSlideBackground(h, s, v, tab);
  updateValues(h, s, v, tab);
  updateButtons(h, s, v, tab);
}
function changeSampleColor(h, s, v, tab) {
  var style = document.querySelector('[data="colordiv' + tab + '"]');
  var tempV = hsvToRgb(h, s, v);
  style.innerHTML =
    `.` +
    tab +
    `Color{ border-radius: 15px; height: 150px; background:rgb(` +
    tempV.r +
    `,` +
    tempV.g +
    `,` +
    tempV.b +
    `);}`;
}
function updateValues(h, s, v, tab) {
  var inputr = document.getElementById("inputr" + tab);
  var inputg = document.getElementById("inputg" + tab);
  var inputb = document.getElementById("inputb" + tab);
  var inputh = document.getElementById("inputh" + tab);
  var inputs = document.getElementById("inputs" + tab);
  var inputv = document.getElementById("inputv" + tab);
  var temp = hsvToRgb(h, s, v);
  inputr.value = temp.r;
  inputg.value = temp.g;
  inputb.value = temp.b;
  inputh.value = h;
  inputs.value = s;
  inputv.value = v;
}
function changeSlideBackground(h, s, v, tab) {
  var style = document.querySelector('[data="sliderBG' + tab + '"]');
  var hslider = document.getElementById(tab + "hSlider");
  var sslider = document.getElementById(tab + "sSlider");
  var vslider = document.getElementById(tab + "vSlider");
  var temp0 = hsvToRgb(hslider.value, sslider.value, 0);
  var temp1 = hsvToRgb(hslider.value, sslider.value, 50);
  var temp2 = hsvToRgb(hslider.value, sslider.value, 100);
  style.innerHTML =
    `.h-` +
    tab +
    `-slide {outline: 0; -webkit-appearance: none; height: 8px; width: 100%; background: linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%)); border-radius: 20px;}
	.s-` +
    tab +
    `-slide { outline: 0; -webkit-appearance: none; height: 8px; width: 100%; background: linear-gradient(to right,hsl(` +
    hslider.value +
    `,0%,100%),hsl(` +
    hslider.value +
    `,50%,50%),hsl(` +
    hslider.value +
    `,100%,50%)); border-radius: 20px;}
	.v-` +
    tab +
    `-slide { outline: 0; -webkit-appearance: none; height: 8px; width: 100%; background: linear-gradient(to right,rgb(` +
    temp0.r +
    `,` +
    temp0.g +
    `,` +
    temp0.b +
    `),rgb(` +
    temp1.r +
    `,` +
    temp1.g +
    `,` +
    temp1.b +
    `),rgb(` +
    temp2.r +
    `,` +
    temp2.g +
    `,` +
    temp2.b +
    `));border-radius: 20px;}`;
}
function changeSlider(h, s, v, tab) {
  var style = document.querySelector('[data="sliderTH' + tab + '"]');
  var hslider = document.getElementById(tab + "hSlider");
  var sslider = document.getElementById(tab + "sSlider");
  var vslider = document.getElementById(tab + "vSlider");
  var tempH = hsvToRgb(h, 100, 100);
  var tempS = hsvToRgb(h, s, 100);
  var tempV = hsvToRgb(h, s, v);
  hslider.value = h;
  sslider.value = s;
  vslider.value = v;
  style.innerHTML =
    `
		.h-` +
    tab +
    `-slide::-webkit-slider-thumb { border: .5px solid #000000; height: 23px; width: 23px; border-radius: 50px; background: rgb(` +
    tempH.r +
    `,` +
    tempH.g +
    `,` +
    tempH.b +
    `);  cursor: pointer;  -webkit-appearance: none;}
		.s-` +
    tab +
    `-slide::-webkit-slider-thumb { border: .5px solid #000000; height: 23px; width: 23px; border-radius: 50px; background: rgb(` +
    tempS.r +
    `,` +
    tempS.g +
    `,` +
    tempS.b +
    `); cursor: pointer; -webkit-appearance: none;}
		.v-` +
    tab +
    `-slide::-webkit-slider-thumb { border: .5px solid #000000; height: 23px; width: 23px; border-radius: 50px; background: rgb(` +
    tempV.r +
    `,` +
    tempV.g +
    `,` +
    tempV.b +
    `); cursor:	pointer; -webkit-appearance: none;}`;
}
function updateButtons(h, s, v, tab) {
  var temp = hsvToRgb(h, s, v);
  var buttonList = ["db0", "db1", "db2", "db3", "db4", "db5"];
  if (tab == "night") {
    buttonList = ["nb0", "nb1", "nb2", "nb3", "nb4", "nb5"];
  }
  buttonList.forEach(function (id, index) {
    const button = document.getElementById(id);
    if (button.classList.contains("btn-primary")) {
      if (tab == "night") {
        settings.NightH[index] = Number(h);
        settings.NightS[index] = Number((s / 100.0).toFixed(2));
        settings.NightV[index] = Number((v / 100.0).toFixed(2));
      } else {
        settings.H[index] = Number(h);
        settings.S[index] = Number((s / 100.0).toFixed(2));
        settings.V[index] = Number((v / 100.0).toFixed(2));
      }
      button.style.color = "rgb(" + temp.r + "," + temp.g + "," + temp.b + ")";
    }
  });
}
//Utilities
function hsvToRgb(h, s, v) {
  var r, g, b;
  var i;
  var f, p, q, t;
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));
  s /= 100;
  v /= 100;
  if (s == 0) {
    r = g = b = v;
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }
  h /= 60; // sector 0 to 5
  i = Math.floor(h);
  f = h - i; // factorial part of h
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;

    case 1:
      r = q;
      g = v;
      b = p;
      break;

    case 2:
      r = p;
      g = v;
      b = t;
      break;

    case 3:
      r = p;
      g = q;
      b = v;
      break;

    case 4:
      r = t;
      g = p;
      b = v;
      break;

    default: // case 5:
      r = v;
      g = p;
      b = q;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
function rgbTohsv(r, g, b) {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  (v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs));
  diffc = (c) => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = (num) => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100),
  };
}
//File functions
function loadJsonFile() {
  $.get(
    "/json/settings.json", // url
    function (data, textStatus, jqXHR) {
      settings = data;
      LoadSettings();
    }
  );
}
function LoadSettings() {
  // Digit button color setting and selection
  var buttonList = ["db0", "db1", "db2", "db3", "db4", "db5"];
  var nightButtonList = ["nb0", "nb1", "nb2", "nb3", "nb4", "nb5"];
  var lastColor = hsvToRgb(
    settings.H[0],
    settings.S[0] * 100,
    settings.V[0] * 100
  );
  var sameColor = true;
  buttonList.forEach(function (id, i) {
    var temp = hsvToRgb(
      settings.H[i],
      settings.S[i] * 100,
      settings.V[i] * 100
    );
    if (
      lastColor.r != temp.r &&
      lastColor.g != temp.g &&
      lastColor.g != temp.g
    ) {
      sameColor = false;
    }
    const button = document.getElementById(id);
    if (button.classList.contains("btn-secondary")) {
      button.style.color = "rgb(" + temp.r + "," + temp.g + "," + temp.b + ")";
    }
  });
  if (sameColor) {
    buttonList.forEach(function (id) {
      const button = document.getElementById(id);
      button.classList.remove("btn-secondary");
      button.classList.add("btn-primary");
    });
  }
  colorChanged(settings.H[0], settings.S[0] * 100, settings.V[0] * 100, "day");
  lastColor = hsvToRgb(
    settings.NightH[0],
    settings.NightS[0] * 100,
    settings.NightV[0] * 100
  );
  sameColor = true;
  nightButtonList.forEach(function (id, i) {
    var temp = hsvToRgb(
      settings.NightH[i],
      settings.NightS[i] * 100,
      settings.NightV[i] * 100
    );
    if (
      lastColor.r != temp.r &&
      lastColor.g != temp.g &&
      lastColor.g != temp.g
    ) {
      sameColor = false;
    }
    const button = document.getElementById(id);
    if (button.classList.contains("btn-secondary")) {
      button.style.color = "rgb(" + temp.r + "," + temp.g + "," + temp.b + ")";
    }
  });
  if (sameColor) {
    nightButtonList.forEach(function (id) {
      const button = document.getElementById(id);
      button.classList.remove("btn-secondary");
      button.classList.add("btn-primary");
    });
  }
  colorChanged(
    settings.NightH[0],
    settings.NightS[0] * 100,
    settings.NightV[0] * 100,
    "night"
  );

  // 24 Hour time
  document.getElementById("tfTime").checked = settings.tfTime;
  // enable or disabel night settings
  document.getElementById("nightModeOff").checked = settings.NightModeOff;
  // Display seconds at night
  document.getElementById("NightSeconds").checked = settings.NightSec;
  // Speed
  document.getElementById("speed").value = settings.Speed;
  // Night start and End
  document.getElementById("nightStart").value =
    ((settings.StartTime - (settings.StartTime % 60)) / 60 < 10 ? "0" : "") +
    (settings.StartTime - (settings.StartTime % 60)) / 60 +
    ":" +
    ((settings.StartTime % 60 < 10 ? "0" : "") + (settings.StartTime % 60));
  document.getElementById("nightEnd").value =
    ((settings.EndTime - (settings.EndTime % 60)) / 60 < 10 ? "0" : "") +
    (settings.EndTime - (settings.EndTime % 60)) / 60 +
    ":" +
    ((settings.EndTime % 60 < 10 ? "0" : "") + (settings.EndTime % 60));
  // Test Night mode
  document.getElementById("NightModeTest").checked = settings.SetNight;
  // Mode
  switch (settings.Mode) {
    case 0:
      document.getElementById("dayOff").checked = true;
      break;
    case 1:
      document.getElementById("dayStatic").checked = true;
      break;
    case 2:
      document.getElementById("dayBreathing").checked = true;
      break;
    case 3:
      document.getElementById("dayColorFade").checked = true;
      break;
    case 4:
      document.getElementById("dayRainbow").checked = true;
      break;
    case 5:
      document.getElementById("dayTest").checked = true;
      break;
    default:
  }
  switch (settings.NightMode) {
    case 0:
      document.getElementById("nightOff").checked = true;
      break;
    case 1:
      document.getElementById("nightStatic").checked = true;
      break;
    case 2:
      document.getElementById("nightBreathing").checked = true;
      break;
    case 3:
      document.getElementById("nightColorFade").checked = true;
      break;
    case 4:
      document.getElementById("nightRainbow").checked = true;
      break;
    default:
  }
  modeChange(settings.Mode);
  nightModeChange(settings.NightMode);
}
function SettingsToFile() {
  $.ajax({
    type: "post",
    url: "/json/",
    data: JSON.stringify(settings),
    contentType: "application/json; charset=utf-8",
    traditional: true,
    success: function (data) {},
  });
}
