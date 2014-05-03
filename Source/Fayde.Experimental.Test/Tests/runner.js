define(["require", "exports", "Tests/GridItemsControlTests"], function(require, exports, GridItemsControlTests) {
    function run() {
        GridItemsControlTests.run();

        QUnit.load();
        QUnit.start();
    }
    exports.run = run;
});
