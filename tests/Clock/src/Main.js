// Copyright 04-Sep-2018 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

import Ui from "./dmjs/Ui.js";
import Clock from "./dmjs/Clock.js";

const $ = Ui.$;

export default class Main {
  run () {
    const clock = new Clock();
    Ui.$("@body")
      .add($("table").att("align", "center")
        .add($("tr")
          .add($("td")
            .add(clock.mkWg()
              .att(
                "style",
                "background:radial-gradient(#000333,#e6f6f6);" +
                "border: 1px solid rgb(110,130,150);" +
                "border-radius: 4px;"
              )))))
    ;

  }
}
