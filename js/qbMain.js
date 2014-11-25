if (typeof define !== 'function') { var define = require('amdefine')(module) }
/*
 * QuickBlox JavaScript SDK
 *
 * Main SDK Module
 *
 */

define(['qbConfig', 'qbProxy', 'qbAuth', 'qbUsers', 'qbChat',
        'qbContent', 'qbLocation', 'qbMessages', 'qbData'],
function(config, Proxy, Auth, Users, Chat,
         Content, Location, Messages, Data) {

  // Actual QuickBlox API starts here
  function QuickBlox() {}

  QuickBlox.prototype = {

    init: function(appId, authKey, authSecret, debug) {
      if (debug && typeof debug === 'boolean') config.debug = debug;
      else if (debug && typeof debug === 'object') config.set(debug);
      
      this.service = new Proxy();
      this.auth = new Auth(this.service);
      this.users = new Users(this.service);
      this.chat = new Chat(this.service);
      this.content = new Content(this.service);
      this.location = new Location(this.service);
      this.messages = new Messages(this.service);
      this.data = new Data(this.service);
      
      // Initialization by outside token
      if (typeof appId === 'string' && !authKey && !authSecret) {
        this.service.setSession({ token: appId });
      } else {
        config.creds.appId = appId;
        config.creds.authKey = authKey;
        config.creds.authSecret = authSecret;
      }
      if(console && config.debug) console.log('QuickBlox.init', this);
    },

    createSession: function(params, callback) {
      this.auth.createSession(params, callback);
    },

    destroySession: function(callback) {
      this.auth.destroySession(callback);
    },

    login: function(params, callback) {
      this.auth.login(params, callback);
    },

    logout: function(callback) {
      this.auth.logout(callback);
    }
    
  };

  var QB = new QuickBlox();

  // Node.js exports
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = QB;
    module.exports.QuickBlox = QuickBlox;

  // Window scoped variable (QB) for using in browsers
  } else {
    window.QB = QB;
    return QB;
  }

});
