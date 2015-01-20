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
    

module.exports = Application

$ ->
  window.App = {}

  # instance
  App.instance = new Application()