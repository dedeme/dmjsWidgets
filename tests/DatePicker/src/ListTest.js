// Copyright 1-Sep-2017 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

goog.provide("ListTest");
goog.require("github_dedeme");

ListTest = class {
  static run() {
    const t = new Test("List");

    /** @type List<number> */
    let l = new List();
    t.eq(l.head(), undefined);
    t.eq(l.tail(), null);
    l = l.cons(1);
    l = l.cons(2);
    let s = 0;
    while (l.tail() !== null) {
      s += l.head();
      l = l.tail();
    }
    t.eq(s, 3);

    t.log();
  }
}


