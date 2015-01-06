###

Copyright (c) 2014 ...

###

# Dependencies

class Application

  ###
  *------------------------------------------*
  | constructor:void (-)
  |
  | Construct.
  *----------------------------------------###
  constructor: ->
    $("#grid").mason({
      itemSelector: '.block'
      ratio: 1.5
      sizes: [
        [1,1],
        [2,2]
      ]
      layout: 'fluid',
      gutter: 1,
      debug: true
    })

module.exports = Application

$ ->
  window.App = {}

  # instance
  App.instance = new Application()