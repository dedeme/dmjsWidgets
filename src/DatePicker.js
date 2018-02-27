// Copyright 04-Oct-2017 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/** Date selector */
goog.provide("github_dedeme.DatePicker");

goog.require("github_dedeme");

github_dedeme.DatePicker/**/ = class {
  constructor () {
    /**
     * @private
     * @type {string}
     */
    this._lang = "es";
    /**
     * @private
     * @type {DateDm}
     */
    this._date = null;
    /**
     * @private
     * @type {function(string):void}
     */
    this._action = s => { alert("'" + s + " was clicked"); };

    /**
     * @private
     * First day of current month.
     * @type {DateDm}
     */
    this._dateView = null;
    /**
     * @private
     * If DatePicker is style floating.
     * @type {boolean}
     */
    this._floating = false;
    /**
     * @private
     * [span] to show the calendar month.
     * @type {!Domo}
     */
    this._elMonth = $("span");
    /**
     * @private
     * [span] to show the calendar year.
     * @type {!Domo}
     */
    this._elYear = $("span");
    /**
     * @private
     * Array[Array[td]] to show the calendar days.
     * @type {!Array<!Array<!Domo>>}
     */
    this._elDays = [];
    /**
     * @private
     * [tr] 6th. row of calendar.
     * @type {!Domo}
     */
    this._exTr = $("tr");
    /**
     * @private
     * [tr] Last row of calendar
     * @type {!Domo}
     */
    this._tr4 = $("tr");
    /**
     * @private
     * [table] Table of days.
     * @type {!Domo}
     */
    this._tb = $("table");

    this.setDate(DateDm.now());
  }

  /**
   * Changes date, but it does not modify the view.
   * @param {!DateDm} d
   * @return {void}
   */
  setDate(d) {
    this._date = d;
    this._dateView = new DateDm(1, d.month(), d.year());
  }

  /** @return {string} */
  lang () {
    return this._lang;
  }

  /**
   * @param {string} value
   * @return {void}
   */
  setLang (value) {
    this._lang = value;
  }

  /** @return {DateDm} */
  date () {
    return this._date;
  }

  /** @return {function(string):void} */
  action () {
    return this._action;
  }

  /**
   * @param {function(string):void} value
   * @return {void}
   */
  setAction (value) {
    this._action = value;
  }

  /** @private */
  months () {
    return (this._lang === "en")
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
          "Aug", "Sep", "Oct", "Nov", "Dec"]
      : ["ene", "feb", "mar", "abr", "may", "jun", "jul",
          "ago", "sep", "oct", "nov", "dic"];
  }
  /** @private */
  weekDays () {
    return (this._lang === "en")
      ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  }
  /** @private */
  i18n () {
    return (this._lang === "en")
      ? {"firstWeekDay" : 0, "today" : "Today", "none" : "None"}
      : {"firstWeekDay" : 1, "today" : "Hoy", "none" : "Nada"};
  }
  /** @private */
  previousMonth () {
    this._dateView = new DateDm(
      1, this._dateView.month() - 1, this._dateView.year());
    this.load();
  }
  /** @private */
  nextMonth () {
    this._dateView = new DateDm(
      1, this._dateView.month() + 1, this._dateView.year());
    this.load();
  }
  /** @private */
  previousYear () {
    this._dateView = new DateDm(
      1, this._dateView.month(), this._dateView.year() - 1);
    this.load();
  }
  /** @private */
  nextYear () {
    this._dateView = new DateDm(
      1, this._dateView.month(), this._dateView.year() + 1);
    this.load();
  }
  /**
   * Callback to click on today.
   * @private
   */
  today () {
    const today = DateDm.now();
    this._dateView = new DateDm(1, today.month(), today.year());
    this.load();
  }
  /**
   * Callback to click on none.
   * @private
   */
  none () {
    this._date = null;
    this.load();
    this._action("");
  }
  /**
   * Callback to click on days.
   * @private
   * @param {!DateDm} d
   */
  mkDayFunction (d) {
    this._date = d;
    this.load();
    this._action(this._date.toBase());
  }
  /**
   * Reload the DataPicker.
   * @private
   */
  load () {
    const self = this;

    self._elMonth.html(self.months()[self._dateView.month() - 1]);
    self._elYear.html("" + self._dateView.year());

    let ix = self._dateView.date().getDay() - self.i18n()["firstWeekDay"];
    ix = ix < 0 ? 7 + ix : ix;
    let month = self._dateView.month();
    let date1 = new DateDm(
      self._dateView.day() - ix, month, self._dateView.year());

    const today = DateDm.now();
    const tyear = today.year();
    const tmonth = today.month();
    const tday = today.day();

    let dyear = tyear;
    let dmonth = tmonth;
    let dday = tday;

    if (self._date !== null) {
      dyear = self._date.year();
      dmonth = self._date.month();
      dday = self._date.day();
    }

    let extraRow = false;
    It.range(6).each(function (i) {
      if (i == 5 && date1.month() === month) {
        extraRow = true;
      }
      It.range(7).each(j => {
        const d = self._elDays[i][j];
        const year1 = date1.year();
        const month1 = date1.month();
        const day1 = date1.day();
        if (day1 === dday && month1 === dmonth && year1 === dyear) {
          d.klass("select");
        } else {
          d.klass("day");
          if (date1.month() != month) {
            d.klass("dayOut");
          }
          if (date1.date().getDay() == 6 || date1.date().getDay() == 0) {
            d.klass("weekend");
            if (date1.month() != month) {
              d.klass("weekendOut");
            }
          }
        }
        if (day1 == tday && month1 == tmonth && year1 == tyear) {
          d.klass("today");
        }

        const ddate1 = date1;
        d.html("<span class='day'>" + ddate1.day() + "</span>");
        d.e().onclick/**/ = ev => { self.mkDayFunction(ddate1); };

        date1 = new DateDm(date1.day() + 1, date1.month(), date1.year());
      });
    });

    if (self._tb.att("hasTrEx") === "true") {
      self._tb.e().removeChild(self._exTr.e());
      self._tb.att("hasTrEx", "false");
    }

    if (extraRow) {
      self._tb.e().removeChild(self._tr4.e());

      self._tb.e().appendChild(self._exTr.e());
      self._tb.e().appendChild(self._tr4.e());
      self._tb.e().setAttribute("hasTrEx", "true");
    }
  }

  /**
   * Returns the DOMElement of 'this'
   * @return {!Domo}
   */
  make () {
    const self = this;
    /** @type {function(string, function():void):!Domo} */
    const mkArrow = (tx, f) =>
      $("td").klass("arrow").add($("span").html(tx)
        .on("click", ev => { f(); }));

    const mkHeader = (colspan, txarr1, farr1, element, txarr2, farr2) => {
      return $("td").att("colspan", colspan)
        .add($("table").klass("in")
          .add($("tr")
            .add(mkArrow(txarr1, farr1))
            .add($("td").add(element.klass("title")))
            .add(mkArrow(txarr2, farr2))));
    }

    this._elMonth = $("span");
    this._elYear = $("span");
    this._elDays = [];

    self._tr4 = $("tr")
      .add($("td").att("colspan", 4).klass("left")
        .add($("span").klass("link")
        .html(self.i18n()["today"]).on("click", ev => { self.today(); })))
      .add($("td").att("colspan", 3).klass("right")
        .add($("span").klass("link").html(self.i18n()["none"])
        .on("click", ev => { self.none(); })));

    self._tb = $("table")
      .att("hasTrEx", "false")
      .klass("dmDatePicker")
      .add($("tr")
        .add(mkHeader(
            4, "&laquo", () => { self.previousMonth(); }, self._elMonth,
            "&raquo;", () => { self.nextMonth(); }
          ))
        .add(mkHeader(
            3, "&laquo", () => { self.previousYear(); }, self._elYear,
            "&raquo;", () => { self.nextYear(); }
          )))
      .add($("tr")
        .addIt(It.range(7).map(i => {
            let ix = i + self.i18n()["firstWeekDay"];
            ix = ix > 6 ? ix - 7 : ix;
            return $("td").html(self.weekDays()[ix]);
          })))
      .addIt((() => {
          const rows = It.range(5).map(i => {
            const tds = [];
            const tr = $("tr").addIt(It.range(7).map(j => {
              const td = $("td");
              tds.push(td);
              return td;
            }));
            self._elDays.push(tds);
            return tr;
          }).to();
          const tds = [];
          self._exTr = $("tr").addIt(It.range(7).map(j => {
              const td = $("td");
              tds.push(td);
              return td;
            }));
          self._elDays.push(tds);
          return It.from(rows);
        })())
      .add(self._tr4);
    this.load();
    return $("div")
      .style(self._floating ? "position:absolute" : "position:relative")
      .add(self._tb);

  }

  /**
   * Makes a DatePicker which depends on a button.
   * @param {!Domo} button
   * @return {!Domo}
   */
  makeButton (button) {
    const self = this;

    const span = $("span");
    let isShow = false;

    const btAction = ev => {
      if (!isShow) {
        span.add(self.make());
        isShow = true;
        return;
      }
      span.e().removeChild(span.e().lastChild/**/);
      isShow = false;
    }
    button.e().onclick/**/ = btAction;

    const previousAction = self._action;
    self._action = s => {
      previousAction(s);
      span.e().removeChild(span.e().lastChild/**/);
      isShow = false;
    }

    self._floating = true;
    return $("span").add(button).add(span);
  }

  /**
   * Makes a DatePicker which depends on a text field.
   * @param {!Domo} textInput
   * @return {!Domo}
   */
  makeText (textInput) {
    const self = this;

    const format = s => {
      const d = DateDm.fromStr(s);
      return self._lang === "en"
        ? d.format("%M/%D/%Y")
        : d.format("%D/%M/%Y");
    }
    const span = $("span");
    let isShow = false;

    const btAction = ev => {
      if (!isShow) {
        span.add(self.make());
        isShow = true;
        return;
      }
      span.e().removeChild(span.e().lastChild/**/);
      isShow = false;
    }
    textInput.value(format(self._date.toBase()));
    textInput.e().onclick/**/ = btAction;
    textInput.e().onkeydown/**/ = function (e) { e.preventDefault(); };

    const previousAction = self._action;
    self._action = s => {
      textInput.value(s === "" ? "" : format(s));
      previousAction(s);
      span.e().removeChild(span.e().lastChild/**/);
      isShow = false;
    }

    self._floating = true;
    return $("span").add(textInput).add(span);
  }

}
