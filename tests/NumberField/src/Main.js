// Copyright 04-Sep-2018 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

import Ui from "./dmjs/Ui.js";
import NumberField from "./dmjs/NumberField.js";
import Dec from "./dmjs/Dec.js";

const $ = Ui.$;

export default class Main {
  run () {
    const nf = new NumberField(false, "bt");
    Ui.$("@body")
      .add(nf.input)
      .add($("button").att("id", "bt").text("show").on("click", () => {
        alert(nf.value(2));
        nf.setValue(new Dec(33.12, 2));
      }))
    ;

  }
}
