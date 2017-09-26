const configure = require('enzyme').configure;
let Adapter;
try {
  Adapter = require('enzyme-adapter-react-15');
} catch (e) {
  Adapter = require('enzyme-adapter-react-14');
}

configure({ adapter: new Adapter(), disableLifecycleMethods: true });
