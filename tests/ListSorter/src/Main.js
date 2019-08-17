// Copyright 04-Sep-2018 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

import Ui from "./dmjs/Ui.js";
import ListSorter from "./dmjs/ListSorter.js";

const $ = e => Ui.$(e);

let listA = [1, 2, 3];
let listB = [[1, "one"], [2, "two"], [3, "three"]];

const listADiv = $("div");
const listBDiv = $("div");

export default class Main {


  // VIEW --------------------------------------------------
  // TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
  show () {
    Ui.$("@body")
      .add(listADiv)
      .add(listBDiv)
    ;
    this.update();
  }

  // CONTROL -----------------------------------------------
  // TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT

  updateA () {
    const ls = new ListSorter(
      () => Ui.img("blank"),
      () => Ui.img("go-previous"),
      () => Ui.img("go-next"),
      listA,
      (l) => {
        listA = l;
        this.updateA();
      }
    );
    listADiv.removeAll().add(
      $("table")
        .add($("tr")
          .adds(ls.ups.map(e => $("td").add(e))))
        .add($("tr")
          .adds(listA.map(e => $("td").html(String(e)))))
        .add($("tr")
          .adds(ls.downs.map(e => $("td").add(e))))
    );
  }

  updateB () {
    const ls = new ListSorter(
      () => Ui.img("blank"),
      () => Ui.img("go-up"),
      () => Ui.img("go-down"),
      listB,
      (l) => {
        listB = l;
        this.updateB();
      }
    );
    listBDiv.removeAll().add(
      $("table")
        .adds(listB.map((e, i) =>
          $("tr")
            .add($("td").add(ls.ups[i]))
            .add($("td").add(ls.downs[i]))
            .add($("td").html(String(e[0])))
            .add($("td").html(e[1]))
        ))
    );
  }

  update () {
    this.updateA();
    this.updateB();
  }

}
