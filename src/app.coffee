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
    console.log('Application Constructor!')

module.exports = Application

$ ->
  # instance
  Namespace.instance = new Application()