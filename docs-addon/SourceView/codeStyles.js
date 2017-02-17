const codeColors = {
  func: '#6699CC',
  attr: '#99C794',
  object: '#65737E',
  array: '#65737E',
  number: '#F99157',
  string: '#99C794',
  bool: '#F99157',
  empty: '#C0C5CE',
  brace: '#5FB3B3',
  component: '#EC5f67',
  prop: '#C594C5',
  content: '#fff',
};

const codeStyles = {};
Object.entries(codeColors).forEach(([type, color]) => {
  codeStyles[type] = { color };
});


export default codeStyles;
