// Copyright 10-Sep-2017 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/** Captcha for authentication */
goog.provide("github_dedeme.Captcha");

goog.require("github_dedeme");

{
  /** @private */
  class Captcha {
    constructor (zeroColor, oneColor) {
      /** private */
      this._zeroColor = zeroColor;
      /** private */
      this._oneColor = oneColor;
      /** private */
      this._checks = [];
      /** private */
      this._value = "11110000";
    }

    // Returns true if selection == value
    match () {
      let selection = () =>
        It.join(It.from(this._checks).map(c =>
          c.checked() ? "1" : "0"
        ));

      return selection() == this._value;
    }

    /** @return {!Domo} */
    make () {
      this._checks = [];
      let tds = [];
      It.range(this._value.length).each(ix => {
        let back = this._zeroColor ;
        if (this._value.charAt(ix) === "1") {
          back = this._oneColor ;
        }
        let check = $("input").att("type", "checkbox");
        this._checks.push(check);
        tds.push($("td")
          .att("style", "border: 1px solid;background-color: " + back)
          .add(check));
      });

      let box = new Rbox(tds);
      let tr1 = $("tr");
      let tr2 = $("tr");
      It.range(this._value.length).each(ix => {
        let tr = (ix < this._value.length / 2) ? tr1 : tr2;
        tr.add(box.next());
      });

      return $("table").att("border", 0)
        .att("style", "border: 1px solid;background-color: #fffff0")
        .add(tr1)
        .add(tr2);
    }
  }

github_dedeme.Captcha/**/ = class {

  /**
   * @param {string} storeId Identifier for store Captcha data in local store.
   * @param {number} counterLimit Maximun error number without captcha.
   * @param {string=} zeroColor Color cells to not mark (Default: "#f0f0f0")
   * @param {string=} oneColor Color cells to mark (Default: "#c0c0c0")
   */
  constructor (storeId, counterLimit, zeroColor, oneColor) {
    /**
     * @private
     * @const {string}
     */
    this._storeId = storeId;
    /**
     * @const {number}
     */
    this._counterLimit = counterLimit;
    /** @const {!Captcha} */
    this._captcha = new Captcha(
      zeroColor || "#f0f0f0",
      oneColor || "#c0c0c0"
    );
  }

  /** @return {number} */
  counterLimit () {
    return this._counterLimit;
  }

  /**
   * @return {number}
   */
  counter () {
    const storeId = this._storeId;

    let ret = n => {
      Store.put(storeId + "_counter", n);
      Store.put(storeId + "_time", "" + DateDm.now().toTime());
      return parseInt(n, 10);
    }

    let c = Store.get(storeId + "_counter");
    if (c == null) return ret("0");

    let t = parseInt(Store.get(this._storeId + "_time"), 10);
    if (DateDm.now().toTime() - t > 900000) return ret("0");

    return parseInt(c, 10);
  }

  /**
   * Increments counter
   * @return {void}
   */
  incCounter () {
    let c = parseInt(Store.get(this._storeId + "_counter"), 10) + 1;
    Store.put(this._storeId + "_counter", "" + c);
    Store.put(this._storeId + "_time", "" + DateDm.now().toTime());
  }

  /**
   * Restores counter value to zero
   * @return {void}
   */
  resetCounter () {
    Store.del(this._storeId + "_counter");
    Store.del(this._storeId + "_time");
  }

  /**
   * Indicates if user selection is valid
   * @return {boolean}
   */
  match () {
    return this._captcha.match();
  }

  /**
   * Return captcha object
   * @return {!Domo}
   */
  make () {
    return this._captcha.make();
  }
}}
