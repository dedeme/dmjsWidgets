// Copyright 01-Feb-2019 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

// eslint-disable-next-line
import Domo from "./Domo.js";
import Ui from "./Ui.js";

const $ = Ui.$;

class Timer {
  constructor (f, time) {
    this._f = f;
    this._time = time;
    this._interval = null;
  }

  start () {
    if (this._interval !== null) {
      clearInterval(this._interval);
    }
    this._interval = setInterval(this._f, this._time);
  }

  stop () {
    if (this._interval !== null) {
      clearInterval(this._interval);
    }
  }
}

/** Box to show widgets */
export default class Clock {
  constructor () {
    this._width = 120;
    this._height = 120;
    this._bg = "#ffffff";
    this._number = "#000033";
    this._axis = "#446688";
    this._hhand = this._axis;
    this._mhand = this._axis;
    this._shand = "#000033";
  }

  /** @return {number} */
  get width () {
    return this._width;
  }

  /**
   * @param {number} px
   * @return {void}
   */
  set width (px) {
    this._width = px;
  }

  /** @return {number} */
  get height () {
    return this._height;
  }

  /**
   * @param {number} px
   * @return {void}
   */
  set height (px) {
    this._height = px;
  }

  /** @return {string} */
  get bg () {
    return this._bg;
  }

  /**
   * @param {string} color
   * @return {void}
   */
  set bg (color) {
    this._bg = color;
  }

  /** @return {string} */
  get number () {
    return this._number;
  }

  /**
   * @param {string} color
   * @return {void}
   */
  set number (color) {
    this._number = color;
  }

  /** @return {string} */
  get axis () {
    return this._axis;
  }

  /**
   * @param {string} color
   * @return {void}
   */
  set axis (color) {
    this._axis = color;
  }

  /** @return {string} */
  get hhand () {
    return this._hhand;
  }

  /**
   * @param {string} color
   * @return {void}
   */
  set hhand (color) {
    this._hhand = color;
  }

  /** @return {string} */
  get mhand () {
    return this._mhand;
  }

  /**
   * @param {string} color
   * @return {void}
   */
  set mhand (color) {
    this._mhand = color;
  }

  /** @return {string} */
  get shand () {
    return this._shand;
  }

  /**
   * @param {string} color
   * @return {void}
   */
  set shand (color) {
    this._shand = color;
  }

  /** @return {!Domo} */
  mkWg () {
    const cv = $("canvas").att("width", this.width).att("height", this.height);
    const ctx = cv.e.getContext("2d");
    let radius = cv.e.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    this.drawBack(ctx, radius);
    this.paint(ctx, radius);

    new Timer((() => {
      this.paint(ctx, radius);
    }).bind(this), 1000).start();

    return cv;
  }

  /** @private */
  paint (ctx, radius) {
    this.drawBorder(ctx, radius);
    this.drawAxis(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx, radius);
    this.drawAxis(ctx, radius);
  }

  /** @private */
  drawBack (ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.bg;
    ctx.fill();
    const grad = ctx.createRadialGradient(
      0, 0, radius * 0.95, 0, 0, radius * 1.05
    );
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
  }

  /** @private */
  drawBorder (ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.93, 0, 2 * Math.PI);
    ctx.fillStyle = this.bg;
    ctx.fill();
  }

  /** @private */
  drawNumbers (ctx, radius) {
    ctx.fillStyle = this.number;
    ctx.font = radius * 0.16 + "px sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num < 13; num++) {
      const ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.82);
      ctx.rotate(-ang);
      ctx.fillText(num, 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.82);
      ctx.rotate(-ang);
    }
  }

  /** @private */
  drawTime (ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
      (minute * Math.PI / (6 * 60)) +
      (second * Math.PI / (360 * 60));
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.07, this.hhand);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.07, this.mhand);
    // second
    second = second * Math.PI / 30;
    this.drawHand(ctx, second, radius * 0.9, radius * 0.02, this.shand);
  }

  /** @private */
  drawHand (ctx, pos, len, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -len);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.rotate(-pos);
  }

  /** @private */
  drawAxis (ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = this.axis;
    ctx.fill();
  }

}

