module.exports = function pureComponentFallback({ types: t, template }) {
  const buildPureOrNormalSuperclass = () => t.LogicalExpression('||',
    t.memberExpression(t.identifier('React'), t.identifier('PureComponent')),
    t.memberExpression(t.identifier('React'), t.identifier('Component')));

  const buildShouldComponentUpdate = () => {
    const method = t.classMethod(
      'method',
      t.logicalExpression(
        '&&',
        t.unaryExpression('!', t.memberExpression(t.identifier('React'), t.identifier('PureComponent'))),
        t.stringLiteral('shouldComponentUpdate')
      ),
      [t.identifier('nextProps'), t.identifier('nextState')],
      t.blockStatement([template('return shallowCompare(this, nextProps, nextState);')()]),
      true
    );
    return method;
  };

  function superclassIsPureComponent(path) {
    const superclass = path.get('superClass');
    // check for PureComponent
    if (t.isIdentifier(superclass)) {
      return superclass.node.name === 'PureComponent';
    }

    if (t.isMemberExpression(superclass)) {
      // Check for React.PureComponent
      return superclass.get('object').node.name === 'React'
        && superclass.get('property').node.name === 'PureComponent';
    }

    return false;
  }

  return {
    visitor: {
      Program: {
        exit({ node }, { file }) {
          if (file.get('addShallowCompareImport')) {
            const shallowCompareImportDeclaration = t.importDeclaration([
              t.importDefaultSpecifier(t.identifier('shallowCompare')),
            ], t.stringLiteral('react-addons-shallow-compare'));
            node.body.unshift(shallowCompareImportDeclaration);
          }
        },
      },

      ClassDeclaration(path, { file }) {
        if (superclassIsPureComponent(path)) {
          const superclassPath = path.get('superClass');

          // Replace the superclass
          superclassPath.replaceWith(buildPureOrNormalSuperclass());

          // Only add an SCU if one doesn't already exist
          const existingSCU = path.get('body').get('body').find((
            p => p.isClassMethod() && p.get('key').node.name === 'shouldComponentUpdate'
          ));

          if (!existingSCU) {
            file.set('addShallowCompareImport', true);
            path.get('body').unshiftContainer('body', buildShouldComponentUpdate());
          }
        }
      },
    },
  };
};
