(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/*

MasonJS
Author: Drew Dahlman
Version: 2.0.0
License: MIT
 */
(function($) {
  return $.fn.mason = function(options, complete) {
    var callback, debug_elements, defaults, elements, mason_clear, start;
    defaults = {
      itemSelector: '',
      ratio: 0,
      sizes: [],
      columns: [[0, 480, 1], [480, 780, 2], [780, 1080, 3], [1080, 1320, 4], [1320, 1680, 5]],
      promoted: [],
      filler: {
        itemSelector: options.itemSelector,
        filler_class: 'mason_filler'
      },
      randomSizes: false,
      randomFillers: false,
      layout: 'none',
      gutter: 0,
      debug: false
    };
    start = Date.now();
    debug_elements = {
      container: $("<div id='debug'></div>"),
      block: "<div class='mason-debug' style='background-color: rgba(244, 67, 54, .5); float: left;'></div>"
    };
    mason_clear = "<div class='mason_clear' style='clear:both; position:relative;'></div>";
    if (complete) {
      callback = {
        complete: complete
      };
    }
    elements = {
      block: {
        height: 0,
        width: 0
      },
      matrix: []
    };
    this.each(function() {
      var $self, callbacks, columnSize, debug, layBricks, mason, settings, setup, sizeElements;
      settings = $.extend(defaults, options);
      callbacks = $.extend(callback, complete);
      $self = $(this);
      setup = function() {
        if ($self.children(".mason_clear").length < 1) {
          $self.append(mason_clear);
        }
        elements.block.height = Math.floor((($self.width() / columnSize()) / settings.ratio).toFixed(0));
        elements.block.width = Math.floor($self.width() / columnSize()).toFixed(0);
        sizeElements();
        if (settings.debug) {
          console.log("############## Running In Debug Mode ##############");
          return debug();
        }
      };
      sizeElements = function() {
        var $block;
        if (columnSize() === 1) {
          $block = $self.children(settings.itemSelector);
          $block.height(elements.block.height);
          $block.width(elements.block.width);
          return $block.css({
            'margin': '0px'
          });
        } else {
          $self.children(settings.itemSelector).each(function() {
            var h, ran, ranSize, w;
            $block = $(this);
            ran = Math.floor(Math.random() * settings.sizes.length);
            ranSize = settings.sizes[ran];
            $block.data('size', ran);
            h = parseFloat(elements.block.height * ranSize[1]).toFixed(2);
            h = h - settings.gutter * 2;
            w = parseFloat(elements.block.width * ranSize[0]).toFixed(2);
            w = w - settings.gutter * 2;
            $block.height(h + 'px');
            $block.width(w + 'px');
            return $block.css({
              'margin': settings.gutter
            });
          });
          return mason();
        }
      };
      mason = function() {
        var block_h, c, col, el_h, r;
        col = columnSize();
        el_h = $self.height();
        block_h = el_h / elements.block.height;
        elements.matrix = [];
        r = 0;
        while (r < block_h) {
          elements.matrix[r] = [];
          c = 0;
          while (c < col) {
            elements.matrix[r][c] = false;
            c++;
          }
          r++;
        }
        $self.children(settings.itemSelector).each(function() {
          var $block, a, bh, bw, h, l, s, t, w, _results;
          $block = $(this);
          l = Math.round($block.position().left / elements.block.width);
          t = Math.round($block.position().top / elements.block.height);
          s = parseFloat($block.data('size'));
          h = settings.sizes[s][1];
          w = settings.sizes[s][0];
          a = h * w;
          r = 0;
          _results = [];
          while (r < a) {
            bh = 0;
            while (bh < h) {
              bw = 0;
              elements.matrix[t + bh][l] = true;
              while (bw < w) {
                elements.matrix[t + bh][l + bw] = true;
                bw++;
              }
              bh++;
            }
            _results.push(r++);
          }
          return _results;
        });
        return layBricks();
      };
      layBricks = function() {
        var $filler, c, end, h, r, w, x, y;
        r = 0;
        while (r < elements.matrix.length) {
          c = 0;
          while (c < elements.matrix[r].length) {
            if (!elements.matrix[r][c]) {
              h = elements.block.height;
              w = elements.block.width;
              x = (r * h) + settings.gutter;
              y = (c * w) + settings.gutter;
              h = h - settings.gutter * 2;
              w = w - settings.gutter * 2;
              $filler = $(settings.itemSelector).eq(0).clone();
              $filler.addClass(settings.filler.filler_class);
              $filler.css({
                position: 'absolute',
                top: x + 'px',
                left: y + 'px',
                height: h + 'px',
                width: w + 'px',
                margin: '0px'
              });
              $filler.appendTo($self);
            }
            c++;
          }
          r++;
        }
        if (typeof callbacks.complete !== "undefined") {
          callbacks.complete();
        }
        if (settings.debug) {
          end = Date.now();
          return console.log("Finished in: " + (end - start) + "ms");
        }
      };
      columnSize = function() {
        var cols, colsCount, i, w;
        w = Math.floor($self.width());
        cols = 0;
        colsCount = settings.columns.length - 1;
        if (w >= settings.columns[colsCount[1]]) {
          cols = settings.columns[colsCount[2]];
        } else {
          i = 0;
          while (i <= colsCount) {
            if (w > settings.columns[i][0] && settings.columns[i][1]) {
              cols = settings.columns[i][2];
            }
            i++;
          }
        }
        return cols;
      };
      debug = function() {
        var $debug, block, block_h, c, col, el_h, i;
        $debug = $self.parent();
        col = columnSize();
        el_h = $self.height();
        block_h = el_h / elements.block.height;
        debug_elements.container.css({
          position: 'absolute',
          top: '0',
          left: '0',
          height: $self.height(),
          width: $self.width()
        });
        i = 0;
        while (i < block_h) {
          c = 0;
          while (c < col) {
            block = $(debug_elements.block);
            block.css({
              height: elements.block.height - (settings.gutter * 2),
              width: elements.block.width - (settings.gutter * 2),
              margin: settings.gutter
            });
            debug_elements.container.append(block);
            c++;
          }
          i++;
        }
        debug_elements.container.append(mason_clear);
        return $debug.prepend(debug_elements.container);
      };
      return setup();
    });
  };
})(jQuery);



},{}]},{},[1]);
