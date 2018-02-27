// Copyright 04-Oct-2017 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/** Number input */
goog.provide("github_dedeme.NumberField");

goog.require("github_dedeme");

github_dedeme.NumberField/**/ = class {
  /**
   * @param {boolean} isEn
   * @param {string=} nextFocus
   */
  constructor (isEn, nextFocus) {
    let ctrl = false;
    function mk() {
      const keyDecimal = isEn ? 190 : 188;
      const keyThousand = isEn ? 188 : 190;
      const r = $("input").att("type", "text");
      const el = r.e();
      el.onkeydown/**/ = e => {
        const withDecimal = r.value().indexOf(isEn ? "." : ",") !== -1;
        const withSign = r.value().indexOf("-") !== -1;
        const keyCode = e.keyCode/**/;
        if (keyCode === 13 && nextFocus !== undefined) {
          e.preventDefault();
          $('#' + nextFocus).e().focus();
          return false;
        }

        if (keyCode === 110) {
          if (withDecimal) {
            Ui.beep();
            return false;
          } else {
            const start = el.selectionStart/**/;
            const end = el.selectionEnd/**/;
            const text = el.value/**/;
            el.value/**/ = text.substring(0, start) +
              (isEn ? "." : ",") + text.substring(end);
            el.selectionStart/**/ = start + 1;
            el.selectionEnd/**/ = start + 1;
            return false;
          }
        }

        if (keyCode === keyDecimal && withDecimal) {
          Ui.beep();
          return false;
        }

        if (keyCode === 17) {
          ctrl = true;
          return;
        }

        if (
          keyCode !== keyDecimal &&
          keyCode !== keyThousand &&
          keyCode !== 8 &&
          keyCode !== 9 &&
          keyCode !== 46 &&
          keyCode !== 35 &&
          keyCode !== 36 &&
          keyCode !== 37 &&
          keyCode !== 39 &&
          (keyCode < 48 || keyCode > 57) &&
          (keyCode < 96 || keyCode > 105) &&
          (!ctrl || keyCode !== 67) &&
          (!ctrl || keyCode !== 86) &&
          (!ctrl || keyCode !== 88) &&
          (withSign || el.selectionStart/**/ !== 0 || keyCode !== 109)
        ) {
          Ui.beep();
          return false;
        }
        return true;
      };

      el.onkeyup/**/ = e => {
        if (e.keyCode/**/ === 17) {
          ctrl = false;
        }
      }

      return r;
    }

    /** @private */
    this._isEn = isEn;

    /**
     * @private
     * @type {!Domo}
     */
    this._input = mk();

  }

  /**
   * Returns the DOM object
   * @return {!Domo}
   */
  input () {
    return this._input;
  }

  /**
   * Sets this.input() value. If 'n' is null delete the field.
   * @param {Dec} n
   * @return {!github_dedeme.NumberField}
   */
  setValue (n) {
    if (n === null) {
      this._input.value("");
    } else {
      this._input.value(this._isEn ? n.toEn() : n.toEu());
    }
    return this;
  }

  /**
   * Returns this.input() value. If the field is empty, it returns 'null'.
   * @param {number} scale Decimal positions
   * @return {Dec}
   */
  value (scale) {
    const v = this._input.value().trim();
    if (v === "") {
      return null;
    }
    return this._isEn ? Dec.newEn(v, scale) : Dec.newEu(v, scale);
  }
}


