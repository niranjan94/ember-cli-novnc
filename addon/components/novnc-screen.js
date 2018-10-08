import Component from '@ember/component';
import { computed } from '@ember/object';
import RFB from '@novnc/novnc/core/rfb';

export default Component.extend({
  classNames: ['novnc-screen'],
  attributeBindings: ['style'],

  style: computed(function () {
    return 'overflow: hidden; height: 100%; width: 100%;'
  }),

  url: computed('host', 'port', 'path', 'secure', function () {
    let url;
    if (window.location.protocol === 'https:' || this.secure) {
      url = 'wss';
    } else {
      url = 'ws';
    }
    url += '://' + this.host;
    if (this.port) {
      url += ':' + this.port;
    }
    url += '/' + (this.path || 'websockify');
    return url;
  }),

  _desktopName: null,

  _publishStatus(status) {
    if (this.verbose) {
      console.log(`[novnc][${this.elementId}] ${status}`)
    }
    if (this.onStatus) {
      this.onStatus(status);
    }
  },

  _onConnectedToServer() {
    this._publishStatus('Connected to ' + this._desktopName);
    if (this.onConnectedToServer) {
      this.onConnectedToServer(...arguments);
    }
  },

  _onDisconnectedFromServer(e) {
    if (e.detail.clean) {
      this._publishStatus('Disconnected');
    } else {
      this._publishStatus('Something went wrong, connection is closed');
    }
    if (this.onDiscONnectedFromServer) {
      this.onDiscONnectedFromServer(...arguments);
    }

  },

  async _onCredentialsRequired() {
    if (this._rfb) {
      const password = this.onCredentialsRequired
        ? await this.onCredentialsRequired(...arguments)
        : prompt('Password Required:');
      this._rfb.sendCredentials({ password: password });
    }
  },

  _onDesktopNameUpdate(e) {
    this.set('_desktopName', e.detail.name);
    if (this.onDesktopNameUpdate) {
      this.onDesktopNameUpdate(...arguments);
    }
  },

  _updateAttributeBindings() {
    if (this._rfb) {
      this._rfb.viewOnly = this.viewOnly;
      this._rfb.scaleViewport = this.scaleViewport || false;
    }
  },

  didInsertElement() {
    this._super(...arguments);
    const rfb = new RFB(
      this.element,
      this.url,
      {
        credentials: {
          password: this.password || ''
        }
      }
    );

    rfb.addEventListener('connect',  this._onConnectedToServer.bind(this));
    rfb.addEventListener('disconnect', this._onDisconnectedFromServer.bind(this));
    rfb.addEventListener('credentialsrequired', this._onCredentialsRequired.bind(this));
    rfb.addEventListener('desktopname', this._onDesktopNameUpdate.bind(this));

    this.set('_rfb', rfb);
    this._updateAttributeBindings();

    if (this.onInit) {
      this.onInit(rfb);
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._updateAttributeBindings();
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this._rfb) {
      this._rfb.disconnect();
    }
  }
});
