ember-cli-novnc
==============================================================================


> [noVNC](https://github.com/novnc/noVNC) is a VNC client using HTML5 (Web Sockets, Canvas) with encryption (wss://) support

Embed noVNC widget in your ember applications.

Installation
------------------------------------------------------------------------------

```bash
ember install ember-cli-novnc
```


Usage
------------------------------------------------------------------------------

```html
<div style="width: 500px; height: 450px;">

  {{novnc-screen
    host='your-vnc-backend.something.org'
    port=50000
    viewOnly=true
    path='websockify'
    scaleViewport=true
    onConnectedToServer=(action 'onConnectedToServer')
    onStatus=(action 'onStatus')
    onDisconnectedFromServer=(action 'onDisconnectedFromServer')
    onCredentialsRequired=(action 'onCredentialsRequired')
    onInit=(action 'onInit')}}

</div>
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/niranjan94/ember-cli-novnc`
* `cd ember-cli-novnc`
* `yarn`

### Linting

* `yarn run lint:hbs`
* `yarn run lint:js`
* `yarn run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
