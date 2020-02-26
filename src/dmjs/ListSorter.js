// Copyright 21-May-2019 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

import Domo from "./Domo.js"; // eslint-disable-line

/**
    List sorter.
**/
/**
    Creates a widget to sort lists. For example:

    ---- Creates a horizontal widget
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
      ...
      $("table")
        .add($("tr")
          .adds(ls.ups.map(e => $("td").add(e))))
        .add($("tr")
          .adds(listA.map(e => $("td").html(String(e)))))
        .add($("tr")
          .adds(ls.downs.map(e => $("td").add(e))))

    ---- Creates a vertical widget
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
      ...
      $("table")
        .adds(listB.map((e, i) =>
          $("tr")
            .add($("td").add(ls.ups[i]))
            .add($("td").add(ls.downs[i]))
            .add($("td").html(String(e[0])))
            .add($("td").html(e[1]))
        ))

**/
export default class ListShorter {

  /**
      @param {function ():!Domo} mkBlank
      @param {function ():!Domo} mkUp
      @param {function ():!Domo} mkDown
      @param {!Array<?>} list
      @param {function (!Array<?>):void} action
  **/
  constructor (mkBlank, mkUp, mkDown, list, action) {
    const len1 = list.length - 1;
    if (list.length < 1)
      throw new Error("list must have at least 2 elements");

    const l = list.map(e => e);
    /**
        @private
        type {!Array<!Domo>}
    **/
    this._ups = [];
    /**
        @private
        type {!Array<!Domo>}
    **/
    this._downs = [];

    for (let i = 0; i <= len1; ++i) {
      if (i === 0) {
        this._ups.push(mkBlank());
      } else {
        this._ups.push(mkUp().on("click", () => {
          [l[i - 1], l[i]] = [l[i], l[i - 1]];
          action(l);
        }));
      }
      if (i === len1) {
        this._downs.push(mkBlank());
      } else {
        this._downs.push(mkDown().on("click", () => {
          [l[i + 1], l[i]] = [l[i], l[i + 1]];
          action(l);
        }));
      }
    }
  }

  /**
      @return {!Array<!Domo>}
  **/
  get ups () {
    return this._ups;
  }

  /**
      @return {!Array<!Domo>}
  **/
  get downs () {
    return this._downs;
  }

}
