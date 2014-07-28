var require = {
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs-text/text",
        "Fayde": "lib/Fayde/Fayde",
        "Fayde.Experimental": "lib/Fayde.Experimental/Fayde.Experimental"
    },
    deps: ["text", "Fayde", "Fayde.Experimental"],
    shim: {
        "Fayde": {
            exports: "Fayde",
            deps: ["text"]
        },
        "runner": {
            deps: ["Fayde"]
        }
    }
};

require.shim["Fayde.Experimental"] = require.shim["lib/Fayde.Experimental/Fayde.Experimental"] = {
    exports: "Fayde.Experimental",
    deps: ["Fayde"]
};