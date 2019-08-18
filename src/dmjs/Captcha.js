// Copyright 4-Sep-2018 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/**
    Captcha for authentication.
**/

import It from "./It.js";
import Ui from "./Ui.js";
import Rbox from "./Rbox.js";
import Store from "./Store.js";
import DateDm from "./DateDm.js";
// eslint-disable-next-line
import Domo from "./Domo.js"

const $ = e => Ui.$(e);

/**
  @private
*/
class Model {
  constructor (zeroColor, oneColor) {
    this._zeroColor = zeroColor;
    this._oneColor = oneColor;
    this._checks = [];
    this._value = "11110000";
  }

  // Returns true if selection == value
  match () {
    const selection = () =>
      It.join(It.from(this._checks).map(c => c.checked() ? "1" : "0"));

    return selection() === this._value;
  }

  /**
      @return {!Domo} DOM Object
  **/
  make () {
    this._checks = [];
    const tds = [];
    It.range(this._value.length).each(ix => {
      let back = this._zeroColor;
      if (this._value.charAt(ix) === "1") back = this._oneColor;
      const check = $("input").att("type", "checkbox");
      this._checks.push(check);
      tds.push($("td")
        .att("style", "border: 1px solid;background-color: " + back)
        .add(check));
    });

    const box = new Rbox(tds);
    const tr1 = $("tr");
    const tr2 = $("tr");
    It.range(this._value.length).each(ix => {
      const tr = (ix < this._value.length / 2) ? tr1 : tr2;
      tr.add(box.next());
    });

    return $("table").att("border", 0)
      .att("style", "border: 1px solid;background-color: #fffff0")
      .add(tr1)
      .add(tr2);
  }
}

/**
    Captcha for authentication.
**/
export default class Captcha {

  /**
      @param {string} storeId Identifier for store Captcha data in local store.
      @param {number} counterLimit Maximun error number without captcha.
      @param {string=} zeroColor Color cells to not mark (Default: "#f0f0f0").
      @param {string=} oneColor Color cells to mark (Default: "#c0c0c0").
  **/
  constructor (
    storeId, counterLimit, zeroColor = "#f0f0f0", oneColor = "#c0c0c0"
  ) {
    /**
        @private
        @const {string}
    **/
    this._storeId = storeId;
    /**
        @private
        @const {number}
    **/
    this._counterLimit = counterLimit;
    /**
        @private
        @const {!Model}
    **/
    this._model = new Model(zeroColor, oneColor);
  }

  /**
      @return {number} Limit
  **/
  counterLimit () {
    return this._counterLimit;
  }

  /**
      @return {number} counter
  **/
  counter () {
    const storeId = this._storeId;

    const ret = n => {
      Store.put(storeId + "_counter", n);
      Store.put(storeId + "_time", String(DateDm.now().toTime()));
      return Number(n);
    };

    let c = Store.take(storeId + "_counter");
    if (c === null) return ret("0");
    /** @suppress {checkTypes} */
    c = parseInt(c);

    /** @suppress {checkTypes} */
    const t = parseInt(Store.take(this._storeId + "_time"));
    if (DateDm.now().toTime() - t > 900000) return ret("0");

    return c;
  }

  /**
      Increments counter.
      @return {void}
  **/
  incCounter () {
    /** @suppress {checkTypes} */
    const c = parseInt(Store.take(this._storeId + "_counter")) + 1;
    Store.put(this._storeId + "_counter", String(c));
    Store.put(this._storeId + "_time", String(DateDm.now().toTime()));
  }

  /**
      Restores counter value to zero.
      @return {void}
  **/
  resetCounter () {
    Store.del(this._storeId + "_counter");
    Store.del(this._storeId + "_time");
  }

  /**
      @return {boolean} Indicates if user selection is valid.
  **/
  match () {
    return this._model.match();
  }

  /**
      @return {!Domo} Captcha object.
  **/
  make () {
    return this._model.make();
  }

}
