// Copyright 04-Sep-2018 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

import Ui from "./dmjs/Ui.js";
import DateDm from "./dmjs/DateDm.js";
import DatePicker from "./dmjs/DatePicker.js";

const $ = Ui.$;

export default class Main {
  run () {
    const datePicker1 = () => {
      const div = $("div");
      let d = DateDm.now();
      d = d.add(2);
      const dp = new DatePicker();
      dp.date = d;
      dp.lang = "en";
      dp.action = d => {
        alert("Picked date is '" + d + "'");
      };

      return div
        .add($("h2").html("DatePicker 1"))
        .add(dp.make());
    };

    const datePicker2 = () => {
      const bt = $("button").html("Date Picker");

      const div = $("div");
      let d = DateDm.now();
      d = d.add(-2);
      const dp = new DatePicker();
      dp.date = d;
      dp.lang = "en";
      dp.action = d => {
        alert("Picked date is '" + d + "'");
      };

      return div
        .add($("h2").html("DatePicker 2"))
        .add($("p")
          .add(dp.makeButton(bt))
          .add($("span").html("Next Text")))
        .add($("h3").html("Some text"));
    };

    const datePicker3 = () => {
      const input = $("input").att("type", "text");

      const div = $("div");
      const d = DateDm.now();
      const dp = new DatePicker();
      dp.date = d;
      dp.action = d => {
        alert("Picked date is '" + d + "'");
      };

      return div
        .add($("h2").html("DatePicker 3"))
        .add($("p")
          .add(dp.makeText(input))
          .add($("span").html("Next Text")))
        .add($("h3").html("Some text"));
    };


    Ui.$("@body")
      .add(datePicker1())
      .add(datePicker2())
      .add(datePicker3())
    ;

  }
}
