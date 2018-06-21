const requireAll = requireContext => requireContext.keys().forEach(requireContext);

if (typeof window !== 'undefined') {
  requireAll(require.context('./_helpers', true, /.jsx?$/));
  requireAll(require.context('.', true, /.jsx?$/));
}
