// Copyright 04-Sep-2018 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

import Ui from "./dmjs/Ui.js";
import ModalBox from "./dmjs/ModalBox";

const $ = Ui.$;

export default class Main {
  run () {
    const bt = $("button").html("Close");
    const box = new ModalBox($("div")
        .add($("div").html("A message"))
        .add($("hr"))
        .add(bt)
    );
    bt.on("click", () => {
      box.show(false);
    });
    Ui.$("@body")
      .add(box.wg)
      .add($("button").text("show").on("click", () => {
        box.show(true);
        bt.e.focus();
      }))
    ;

  }
}
