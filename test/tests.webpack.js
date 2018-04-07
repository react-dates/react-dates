const requireAll = requireContext => requireContext.keys().forEach(requireContext);

requireAll(require.context('./_helpers', true, /\.js$/));
requireAll(require.context('./', true, /_spec$/));
