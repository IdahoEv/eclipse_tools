module.exports = function(config) {
    config.set({
        browsers: [],
        files: [
            'src/**/*.js',
            'spec/**/*.js'
        ],
        frameworks: ['jasmine', 'browserify'],
        preprocessors: {
            'src/**/*.js': ['browserify'],
            'spec/**/*.js': ['browserify']
        },
        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        },
    });
};
