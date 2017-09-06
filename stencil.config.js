exports.config = {
  bundles: [
    { components: ['slot-3d-container','slot-3d'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
