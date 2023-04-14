const gulp = require('gulp');
const swaggerJSDoc = require('swagger-jsdoc');

gulp.task('doc', function(cb) {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Clutch API',
        version: '1.0.0',
        description: 'API for axe throwing',
      },
    },
    apis: ['./routes/*.js']
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  require('fs').writeFileSync('./docs/swagger.json', JSON.stringify(swaggerSpec, null, 2));

  cb();
});