"use strict";

var requireAll = function requireAll(requireContext) {
  return requireContext.keys().forEach(requireContext);
};

if (typeof window !== 'undefined') {
  requireAll(require.context('./_helpers', true, /.jsx?$/));
  requireAll(require.context('.', true, /.jsx?$/));
}