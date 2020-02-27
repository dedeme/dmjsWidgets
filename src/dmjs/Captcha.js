// Copyright 4-Sep-2018 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/**
    Captcha for authentication.
**/

import It from "./It.js";
import Ui from "./Ui.js";
import Rbox from "./Rbox.js";
import Store from "./Store.js";
// eslint-disable-next-line
import Domo from "./Domo.js"

const $ = e => Ui.$(e);

function getCounter (id) {
  return Number(Store.take(id + "_counter") || "0") | 0;
}

function setCounter (id, n) {
  Store.put(id + "_counter", String(n));
}

function resetCounter (id) {
  Store.del(id + "_counter");
}

function getTime (id) {
  return Number(
    Store.take(id + "_time") || String(new Date().getTime())
  );
}

function setTime (id, n) {
  Store.put(id + "_time", String(n));
}

function resetTime (id) {
  Store.del(id + "_time");
}

/**
    Captcha for authentication.
**/
export default class Captcha {

  /**
      @param {string} storeId Identifier for store Captcha data in local store.
      @param {number=} counterLimit Maximun error number without captcha.
      @param {string=} zeroColor Color cells to not mark (Default: "#f0f0f0").
      @param {string=} oneColor Color cells to mark (Default: "#c0c0c0").
  **/
  constructor (
    storeId, counterLimit = 3, zeroColor = "#f0f0f0", oneColor = "#c0c0c0"
  ) {
    this._storeId = storeId;
    this._counterLimit = counterLimit;
    this._zeroColor = zeroColor;
    this._oneColor = oneColor;
    const now = new Date().getTime();
    this._counter = getCounter(storeId);
    if (now - getTime(storeId) > 900000) {
      this._counter = 0;
      setCounter(storeId, 0);
      setTime(storeId, new Date().getTime());
    }

    this._ch0 = [...It.range(4).map(() => $("input").att("type", "checkbox"))];
    this._ch1 = [...It.range(4).map(() => $("input").att("type", "checkbox"))];
    this._wg = $("div");
    this.view();
  }

  /**
      @return {!Domo}
  **/
  get wg () {
    return this._wg;
  }

  /**
      Returns true if tries counter is greater or equals to its limit.
      @return {boolean}
  **/
  isUpLimit () {
    return this._counter >= this._counterLimit;
  }

  /**
      Checks cells.
      @return {boolean} 'true' if ckecks are correct.
  **/
  check () {
    return this._ch0.every(ch => !ch.checked()) &&
      this._ch1.every(ch => ch.checked());
  }

  /**
      Increments counter.
      @return {void}
  **/
  increment () {
    setCounter(this._storeId, this._counter + 1);
    setTime(this._storeId, new Date().getTime());
  }

  /**
      Resets counter.
      @return {void}
  **/
  reset () {
    resetCounter(this._storeId);
    resetTime(this._storeId);
  }

  // View ----------------------------------------------------------------------

  /**
      @private
      @return {void}
  **/
  view () {
    const tds = this._ch0.map(ch =>
      $("td")
        .att("style", "border: 1px solid;background-color: " + this._zeroColor)
        .add(ch)
    ).concat(this._ch1.map(ch =>
      $("td")
        .att("style", "border: 1px solid;background-color: " + this._oneColor)
        .add(ch)
    ));
    const box = new Rbox(tds);
    const tds1 = [...It.range(4).map(() => box.next())];
    const tds2 = [...It.range(4).map(() => box.next())];

    this._wg.removeAll()
      .add($("table").att("border", 0)
        .att("style", "border: 1px solid;background-color: #fffff0")
        .add($("tr").adds(tds1))
        .add($("tr").adds(tds2)));
  }
}
