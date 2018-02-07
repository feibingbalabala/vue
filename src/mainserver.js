(function () {'use strict'
  var createApp = function() {
    return new Vue({
      template: '<div id="app">hello vue, {{text}}</div>',
      data() {
        return {
          'text': 'hello world'
        }
      },
    })
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = createApp
  } else {
    this.app = createApp()
  }
}).call(this)