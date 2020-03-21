// Default driver.
import momentDriver from './moment/driver';

// A singleton driver instance.  This allows us to expose the driver's functions
// directly.
// eslint-disable-next-line
export let driver = momentDriver;

export function setDriver(to) {
  // TODO: validate that this conforms to the correct type.  Ideally, we'd use
  // typescript here.
  driver = to;
}

// Internally defined "chainable" functions for using our driver as a standard wrapper
// around any instance of a library's date.
const chainable = {
  startOf: true,
  endOf: true,
  add: true,
  subtract: true,
  set: true,
  get: true,
  diff: true,
  format: true,
  daysInMonth: true,
  weedkay: true,
};

// chain exposes the driver's modifiable functions so that they can chain to mutate
// a single given date.
//
// Driver's functions are stateless - that is, they accept a Date instance and return
// a new instnace.  This is cumbersome if you need to chain multiple modifiers (eg.
// startOf('day').set({ hours: 12 })).
//
// Chaining allows you to invoke curried driver functions **provided you always call
// value() to get the Driver's date instance after chaining**.
//
// It is not the preferred way of accessing a driver's functions;  it is provided for
// convenience.
export function chain(val) {
  // Copy the date locally, which will be mutated by chainable functions.  The difficulty
  // we have is that our drivers retain no state (to make implementation easy), though for
  // ease of use we want to be able to chain certain operators
  // (eg. startOf('day').set({ hours: 12 })).
  //
  // This function allows us to do this for any concrete implementation.
  const date = driver.date(val);

  // Copy the driver so that we can curry the modifier functions with the modifiable date.
  const chainedDriver = { dateInstance: date, ...driver };

  Object.keys(chainable).forEach((key) => {
    chainedDriver[key] = (...args) => {
      // Array.from is not supported in IE11, so invoke slice to transform
      // arguments into an array.
      const actualArgs = [chainedDriver.dateInstance].concat(args);
      // Invoke the driver function with all arguments and the local date.
      chainedDriver.dateInstance = driver[key].apply(this, actualArgs);
      return chainedDriver;
    };
  });

  // Allow us to capture the concrete driver's date instance after chaining,
  // as we should never expose this driver object.
  chainedDriver.value = () => chainedDriver.dateInstance;

  return chainedDriver;
}

/**
A driver must conform to the following interface:

type Driver interface {
  // # Static functions
  //
  // date returns a new instance of the driver's DateTime/Moment/Date etc. object
  // given either:
  //   - An already instantiated driver object; eg. driver.date(moment())
  //   - A string and a format; eg. driver.date("2019-01-01", driver.formats.ISO)
  //   - Nothing, which returns the current time.
  date: (val: string? | any, format: string?) => any;
  now: () => any;
  valid: (instance: any) => boolean;
  firstDayOfWeek: () => number;
  datePropType: any;

  // # Modifiers
  //
  // All modifiers must return a new instance of a date;  that is, they should not
  // mutate the input date instnace.
  startOf: (date, part: string) => any;
  endOf: (date, part: string) => any;
  set: (date, object: { [part: parts]: number }) => any;
  add: (date, object: { [part: parts]: number }) => any;
  subtract: (date, object: { [part: parts]: number }) => any;


  // # Getters/formatters
  get: (date, part) => number;
  diff: (a, b, part) => number;
  format: (date, format) => string;
  daysInMonth: (date) => number;
  weekday: (date) => number; // return the weekday of the current date (eg 0-6 in moment)
}

* */
