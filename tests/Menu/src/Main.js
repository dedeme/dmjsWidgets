// Copyright 04-Sep-2018 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

import Ui from "./dmjs/Ui.js";
import Menu from "./dmjs/Menu.js";

export default class Main {
  run () {
    const m = new Menu();
    m.addLeft(Menu.mkLink("test", "Test", "testPage"));
    m.addRight(Menu.mkClose(() => alert("close")));

    Ui.$("@body")
      .add(m.wg)
    ;

  }
}
