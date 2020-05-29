// Copyright 28-Jan-2020 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/**
    Menu widget.
**/

import Domo from "./Domo.js"; //eslint-disable-line
import Ui from "./Ui.js";
import Maybe from "./Maybe.js";

const $ = e => Ui.$(e);

/**
    Menu entry.
**/
export class MenuEntry {
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
    Menu widget.
**/
export class Menu {

  /**
      @param {!Array<!MenuEntry>} lopts
      @param {!Array<!MenuEntry>} ropts
      @param {string} selected
      @param {boolean=} withSeparator (Default false)
  **/
  constructor (lopts, ropts, selected, withSeparator = false) {
    function setId (o) {
      if (o.id.isJust())
        o.wg.klass(o.id.fromJust() === selected ? "frame" : "link");
    }
    lopts.forEach(o => setId(o));
    ropts.forEach(o => setId(o));

    /**
        @private
    **/
    this._lopts = lopts;
    /**
        @private
    **/
    this._ropts = ropts;
    /**
        @private
    **/
    this._withSeparator = withSeparator;

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
    this._wg
      .add($("table").klass("main").add($("tr")
        .add($("td")
          .style(`
            padding-right:4px;
            ${this._withSeparator ? "border-right: 1px solid #000000;" : ""}`
          )
          .adds(this._lopts.map(e => e.wg)))
        .add($("td")
          .style(`
            padding-left:4px;vertical-align:top;
            text-align:right;white-space:nowrap`
          )
          .adds(this._ropts.map(e => e.wg)))))
      .add($("hr"))
    ;
  }

  // Static --------------------------------------------------------------------

  /**
      @return {!MenuEntry}
  **/
  static separator () {
    return new MenuEntry(Maybe.nothing, $("span").text(" · "));
  }

  /**
      @return {!MenuEntry}
  **/
  static separator2 () {
    return new MenuEntry(Maybe.nothing, $("span").text(" | "));
  }

  /**
      @param {string} id
      @param {string} tx
      @param {function():(void|!Promise)} f
      @return {!MenuEntry}
  **/
  static toption (id, tx, f) {
    return new MenuEntry(Maybe.just(id), Ui.link(f).text(tx));
  }

  /**
      @param {string} id
      @param {string} img Image name. If it has not extension, '.png' will be
                          used. It must be placed in a directory named 'img'.
      @param {function():(void|!Promise)} f
      @return {!MenuEntry}
  **/
  static ioption (id, img, f) {
    return new MenuEntry(
      Maybe.just(id),
      Ui.link(f).add(Ui.img(img).style("vertical-align:middle"))
    );
  }

  /**
      Link is formed '"?" + module + "&" + id' or '"?" + id' if module is not
      defined.
      @param {string} id
      @param {string} tx
      @param {string=} module
      @return {!MenuEntry}
  **/
  static tlink (id, tx, module) {
    return new MenuEntry(
      Maybe.just(id),
      $("a")
        .att("href", "?" + (module === undefined ? "" : module + "&") + id)
        .text(tx)
    );
  }

  /**
      Link is formed '"?" + module + "&" + id' or '"?" + id' if module is not
      defined.
      @param {string} id
      @param {string} img Image name. If it has not extension, '.png' will be
                          used. It must be placed in a directory named 'img'.
      @param {string=} module
      @return {!MenuEntry}
  **/
  static ilink (id, img, module) {
    return new MenuEntry(
      Maybe.just(id),
      $("a")
        .att("href", "?" + (module === undefined ? "" : module + "&") + id)
        .add(Ui.img(img))
    );
  }

  /**
      @param {function ():?} fbye
      @return {!MenuEntry}
  **/
  static close (fbye) {
    return new MenuEntry(
      Maybe.nothing,
      Ui.link(fbye).add(Ui.img("cross").style("vertical-align:middle"))
    );
  }

}
