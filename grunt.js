/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: '<json:package.json>',

        meta: {
            banner: '/*!\n' +
                '* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '*\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '*\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.company %>;\n' +
                "*/\n\n"
        },

        lint: {
            files: ['grunt.js', 'src/**/*.js', 'public/js/*.js']
        },

        mocha: {
            files: ['test/**/*.html']
        },

        compass: {
            main: {
                src: 'public/sass',
                dest: 'public/',
                outputstyle: 'compressed',
                linecomments: false,
                forcecompile: true,
                images: 'public/images',
                relativeassets: true
            }

        },

        concat: {
            client: {
                src: ['<banner:meta.banner>', 
                      'public/js/*.js'
                     ],
                dest: 'public/<%= pkg.name.toLowerCase() %>.js'
            }
        },

        min: {
            client: {
                src: ['<banner:meta.banner>', '<config:concat.client.dest>'],
                dest: 'public/<%= pkg.name.toLowerCase() %>.min.js'
            }
        },

        watch: {
            files: [
                '<config:lint.files>',
                'public/sass/**/*.scss'
            ],
            tasks: 'lint concat min compass'
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                node: true
            },
            globals: {
                jQuery: true,
                $:true,
                describe: true,
                it: true,
                beforeEach: true
            }
        }

    });

    // Default task.
    grunt.registerTask('default', 'lint concat min compass');

    // Additional Packages
    grunt.loadNpmTasks('grunt-compass');

};
