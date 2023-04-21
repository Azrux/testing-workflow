'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('check-workflow-status')
      .service('myService')
      .getWelcomeMessage();
  },
});
