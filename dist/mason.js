(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/*

MasonJS
Author: Drew Dahlman
Version: 2.0.0
License: MIT
 */
(function($) {
  return $.fn.mason = function(options, complete) {
    var callback, defaults, elements, mason_clear;
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
      gutter: 0
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
      var $self, callbacks, columnSize, settings, setup, sizeElements;
      settings = $.extend(defaults, options);
      callbacks = $.extend(callback, complete);
      $self = $(this);
      setup = function() {
        if ($self.children(".mason_clear").length < 1) {
          $self.append(mason_clear);
        }
        elements.block.height = parseFloat((($self.width() / columnSize()) / settings.ratio).toFixed(0));
        elements.block.width = parseFloat($self.width() / columnSize());
        return sizeElements();
      };
      sizeElements = function() {
        var $block, block_h, c, col, el_h, i, _results;
        col = columnSize();
        el_h = $self.height();
        block_h = el_h / elements.block.height;
        elements.matrix = [];
        if (col === 1) {
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
            console.log(ranSize);
            $block.data('size', ran);
            h = parseFloat(elements.block.height * ranSize[1].toFixed(2));
            h = h - settings.gutter * 2;
            w = parseFloat(elements.block.width * ranSize[2].toFixed(2));
            w = w - settings.gutter * 2;
            $block.height(h + 'px');
            $block.width(w + 'px');
            return $block.css({
              'margin': settings.gutter
            });
          });
          i = 0;
          _results = [];
          while (i < block_h) {
            elements.matrix[i] = [];
            c = 0;
            while (c < col) {
              elements.matrix[i][c] = false;
              c++;
            }
            _results.push(i++);
          }
          return _results;
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
      return setup();
    });
  };
})(jQuery);



},{}]},{},[1]);
