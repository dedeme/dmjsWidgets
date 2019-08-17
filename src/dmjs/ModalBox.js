// Copyright 12-Sep-2018 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

// eslint-disable-next-line
import Domo from "./Domo.js";
import Ui from "./Ui.js";

const $ = e => Ui.$(e);

/**
    Box to show widgets.
**/
export default class ModalBox {

  /**
      @param {!Domo} content
      @param {boolean=} withClose (Default 'true').
  **/
  constructor (content, withClose) {
    const tb = $("table").att("align", "center")
      .style(
        "background-color: rgb(250, 250, 250);" +
        "border: 1px solid rgb(110,130,150);" +
        "padding: 4px;border-radius: 4px;"
      );

    if (withClose === undefined || withClose)
      tb.add($("tr")
        .add($("td").style("width:100%;text-align:right;padding-bottom:5px")
          .add($("span").text("[ "))
          .add(Ui.link(() => this.show(false))
            .style(
              "cursor:pointer;text-decoration: none; font-family: sans;" +
              "color: #000080;font-weight: normal;font-size:14px;"
            ).text("X"))
          .add($("span").text(" ]"))));

    tb.add($("tr").add($("td").add(content)));

    this._wg = $("div")
      .style(
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
      ).add(tb);
  }

  /**
      @return {!Domo}
  **/
  get wg () {
    return this._wg;
  }

  /**
      Show or hidde the box.
      @param {boolean} value
      @return {void}
  **/
  show (value) {
    if (value) this._wg.setStyle("display", "block");
    else this._wg.setStyle("display", "none");
  }

  /**
      @return {!Domo} A 'div' with a 'X' to close ModalBox.
  **/
  close () {
    return $("div")
    ;
  }

}

