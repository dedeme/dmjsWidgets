// Copyright 1-Sep-2017 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

goog.provide("Main")
goog.require("github_dedeme");
goog.require("github_dedeme.DatePicker");

Main = class {
  run () {
    const DatePicker = github_dedeme.DatePicker/**/;

    const datePicker1 = () => {
      const div = $("div");
      let d = DateDm.now();
      d = d.add(2);
      let dp = new DatePicker();
      dp.setDate(d);
      dp.setLang("en");
      dp.setAction(d => { alert("Picked date is '" + d + "'"); });

      return div
        .add($("h2").html("DatePicker 1"))
        .add(dp.make());
    }

    const datePicker2 = () => {
      const bt = $("button").html("Date Picker");

      const div = $("div");
      let d = DateDm.now();
      d = d.add(-2);
      let dp = new DatePicker();
      dp.setDate(d);
      dp.setLang("en");
      dp.setAction(d => { alert("Picked date is '" + d + "'"); });

      return div
        .add($("h2").html("DatePicker 2"))
        .add($("p")
          .add(dp.makeButton(bt))
          .add($("span").html("Next Text")))
        .add($("h3").html("Some text"));
    }

    const datePicker3 = () => {
      var input = $("input").att("type", "text");

      var div = $("div");
      var d = DateDm.now();
      var dp = new DatePicker();
      dp.setDate(d);
      dp.setAction(d => { alert("Picked date is '" + d + "'"); });

      return div
        .add($("h2").html("DatePicker 3"))
        .add($("p")
          .add(dp.makeText(input))
          .add($("span").html("Next Text")))
        .add($("h3").html("Some text"));
    }

    let t = new Test("DatePicker");

    Ui.$$("body").next()
      .add(datePicker1())
      .add(datePicker2())
      .add(datePicker3())
    ;
    t.log();

  };
}

new Main().run();
