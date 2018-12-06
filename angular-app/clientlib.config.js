module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,

    // path to the clientlib root folder (output)
    clientLibRoot: "./../ui.apps/src/main/content/jcr_root/apps/wknd-events/clientlibs",

    libs: {
        name: "angular-app",
        allowProxy: true,
        categories: ["wknd-events.angular"],
        dependencies:["wknd-events.grid"],
        serializationFormat: "xml",
        jsProcessor: ["default:none","min:none"],
        assets: {
            js: [
                "dist/angular-app/**/*.js"
            ],
            css: [
                "dist/angular-app/**/*.css"
            ]
        }
    }
};