define(function(require) {
  var Eventable = require('eventable')
  var _ = require('underscore')

  var Runner = function(targetid) {
    Eventable.call(this)
    this.targetid = targetid
    this.entities = []
  }

  Runner.prototype = {
    start: function() {
      this.canvas = document.getElementById(this.targetid)
      this.context = this.canvas.getContext('2d')
      this.raise('init')
      setInterval(_.bind(this.tick, this), 1000/30)
    },
    loadLevel: function(level) {
      this.entities = []
      for(var i = 0; i < level.entities.length; i++)
        this.spawnEntity(level.entities[i].type, level.entities[i].data)

    },
    spawnEntity: function(Type, data)  {
      var entity = new Type('entity-' + this.entities.length, data)
      this.entities.push(entity)
      return entity
    },
    tick: function() {
      this.raise('tick')
      this.render()
    },
    render: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      for(var i = 0; i < this.entities.length ; i++) {
        this.entities[i].render(this.context)
      }
    }
  }
  _.extend(Runner.prototype, Eventable.prototype)

  return Runner
})