// The MIT License (MIT)

// Copyright (c) 2015-16 jillix <contact@jillix.com>

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function (root) {

    /**
     * Piklor
     * Creates a new `Piklor` instance.
     *
     * @name Piklor
     * @function
     * @param {String|Element} sel The element where the color picker will live.
     * @param {Array} colors An array of strings representing colors.
     * @param {Object} options An object containing the following fields:
     *
     *  - `open` (String|Element): The HTML element or query selector which will open the picker.
     *  - `openEvent` (String): The open event (default: `"click"`).
     *  - `style` (Object): Some style options:
     *    - `display` (String): The display value when the picker is opened (default: `"block"`).
     *  - `template` (String): The color item template. The `{color}` snippet will be replaced
     *    with the color value (default: `"<div data-col=\"{color}\" style=\"background-color: {color}\"></div>"`).
     *  - `autoclose` (Boolean): If `false`, the color picker will not be hided by default (default: `true`).
     *  - `closeOnBlur` (Boolean): If `true`, the color picker will be closed when clicked outside of it (default: `false`).
     *
     * @return {Piklor} The `Piklor` instance.
     */
    function Piklor(sel, colors, el_in_row, options) {
        var self = this;
        options = options || {};
        options.open = self.getElm(options.open);
        options.openEvent = options.openEvent || "click";
        options.style = Object(options.style);
        options.style.display = options.style.display || "block";
        options.closeOnBlur = options.closeOnBlur || false;
        options.template = options.template || "<div data-col=\"{color}\" style=\"background-color: {color}\"></div>";
        self.elm = self.getElm(sel);
        self.cbs = [];
        self.isOpen = true;
        self.colors = colors;
        self.el_in_row = el_in_row;
        self.options = options;
        self.render();

        // Handle the open element and event.
        if (options.open) {
            options.open.addEventListener(options.openEvent, function (ev) {
                self.isOpen ? self.close() : self.open();
            });
        }

        // Click on colors
        self.elm.addEventListener("click", function (ev) {
            var col = ev.target.getAttribute("data-col");
            if (!col) { return; }
            self.set(col);
            self.close();
        });
        
        if (options.closeOnBlur) {
          window.addEventListener("click", function (ev) {
              // check if we didn't click 'open' and 'color pallete' elements
              if (ev.target != options.open && ev.target != self.elm && self.isOpen) {
                self.close();
              }
          });
        }

        if (options.autoclose !== false) {
            self.close();
        }
    }

    /**
     * getElm
     * Finds the HTML element.
     *
     * @name getElm
     * @function
     * @param {String|Element} el The HTML element or query selector.
     * @return {HTMLElement} The selected HTML element.
     */
    Piklor.prototype.getElm = function (el) {
        if (typeof el === "string") {
            return document.querySelector(el);
        }
        return el;
    };

    /**
     * render
     * Renders the colors.
     *
     * @name render
     * @function
     */
    Piklor.prototype.render = function () {
        var self = this
          , html = ""
          ;
        var el_counter = 0;
        self.colors.forEach(function (c) {
            html += self.options.template.replace(/\{color\}/g, c);
            el_counter++;
            if (el_counter == self.el_in_row) {
                html += "</br>"
                el_counter = 0;
            }
        });

        self.elm.innerHTML = html;
    };

    /**
     * close
     * Closes the color picker.
     *
     * @name close
     * @function
     */
    Piklor.prototype.close = function () {
        this.elm.style.display = "none";
        this.isOpen = false;
    };

    /**
     * open
     * Opens the color picker.
     *
     * @name open
     * @function
     */
    Piklor.prototype.open = function () {
        this.elm.style.display = this.options.style.display;
        this.isOpen = true;
    };

    /**
     * colorChosen
     * Adds a new callback in the colorChosen callback buffer.
     *
     * @name colorChosen
     * @function
     * @param {Function} cb The callback function called with the selected color.
     */
    Piklor.prototype.colorChosen = function (cb) {
        this.cbs.push(cb);
    };

    /**
     * set
     * Sets the color picker color.
     *
     * @name set
     * @function
     * @param {String} c The color to set.
     * @param {Boolean} p If `false`, the `colorChosen` callbacks will not be called.
     */
    Piklor.prototype.set = function (c, p) {
        var self = this;
        self.color = c;
        if (p === false) { return; }
        self.cbs.forEach(function (cb) {
            cb.call(self, c);
        });
    };

    root.Piklor = Piklor;
})(this);
