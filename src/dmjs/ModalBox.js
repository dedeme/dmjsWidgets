// Copyright 12-Sep-2018 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

import Ui from "./Ui.js";

const $ = Ui.$;

/** Box to show widgets */
export default class ModalBox {
  /**
   * @param {!Domo} content
   */
  constructor (content) {
    this._wg = $("div").style(
      "display: none;" + //Hidden by default
      "position: fixed;" + //Stay in place
      "z-index: 1;" + //Sit on top
      "padding-top: 100px;" + //Location of the box
      "left: 0;" +
      "top: 0;" +
      "width: 100%;" + //Full width
      "height: 100%;" + //Full height
      "overflow: auto;" + //Enable scroll if needed
      "background-color: rgb(0,0,0);" + //Fallback color
      "background-color: rgba(0,0,0,0.4);" + //Black opacity
      "text-align: center;"
    ).add($("table").att("align", "center").style(
      "background-color: rgb(250, 250, 250);" +
      "border: 1px solid rgb(110,130,150);" +
      "padding: 4px;border-radius: 4px;"
    ).add($("tr").add($("td").add(content))));
  }

  /** @return {!Domo} */
  get wg () {
    return this._wg;
  }

  /**
   * Show or hidde the box.
   * @param {boolean} value
   * @return {void}
   */
  show (value) {
    if (value) {
      this._wg.setStyle("display", "block");
    } else {
      this._wg.setStyle("display", "none");
    }
  }

}

