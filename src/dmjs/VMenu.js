// Copyright 11-Mar-2020 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/**
    Vertical menu widget.
**/

import Domo from "./Domo.js"; //eslint-disable-line
import Ui from "./Ui.js";
import Maybe from "./Maybe.js";

const $ = e => Ui.$(e);

/**
    Vertical menu entry.
**/
export class VMenuEntry {
  /**
      @param { Maybe<string>} id
      @param {!Domo} wg
  **/
  constructor (id, wg) {

    /**
        @private
        @type { Maybe<string>}
    **/
    this._id = id;

    /**
        @private
        @type {!Domo}
    **/
    this._wg = wg;

  }

  /**
      @return { Maybe<string>}
  **/
  get id () {
    return this._id;
  }

  /**
      @return {!Domo}
  **/
  get wg () {
    return this._wg;
  }
}

/**
    Vertical menu widget.
**/
export class VMenu {

  /**
      @param {!Array<!VMenuEntry>} opts
      @param {string} selected
  **/
  constructor (opts, selected) {
    function setId (o) {
      if (o.id.isJust() && o.id.fromJust() === selected)
        o.wg.setStyle("font-style", "italic");
    }
    opts.forEach(o => setId(o));

    this._opts = opts;

    this._wg = $("div");
    this.view();
  }

  /**
      @return {!Domo}
  **/
  get wg () {
    return this._wg;
  }

  // View ----------------------------------------------------------------------

  /**
    @return {void}
  **/
  view () {
    function td () {
      return $("td").style("white-space:nowrap");
    }
    this._wg
      .add($("table").klass("frame")
        .adds(this._opts.map(e => $("tr").add(td().add(e.wg)))))
    ;
  }

  // Static --------------------------------------------------------------------

  /**
      @return {!VMenuEntry}
  **/
  static separator () {
    return new VMenuEntry(Maybe.nothing, $("hr"));
  }

  /**
      @param {string} tx
      @return {!VMenuEntry}
  **/
  static title (tx) {
    return new VMenuEntry(Maybe.nothing, $("span").html("<b>" + tx + "</b>"));
  }

  /**
      @param {string} id
      @param {string} tx
      @param {function():(void|!Promise)} f
      @return {!VMenuEntry}
  **/
  static option (id, tx, f) {
    return new VMenuEntry(Maybe.just(id), Ui.link(f).klass("link").text(tx));
  }
}
