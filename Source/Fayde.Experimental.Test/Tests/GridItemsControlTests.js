define(["require", "exports"], function(require, exports) {
    var Grid = Fayde.Controls.Grid;
    var GridItemsControl = Fayde.Experimental.GridItemsControl;

    var GridTextColumn = Fayde.Experimental.GridTextColumn;

    function run() {
        QUnit.module("GridItemsControl Tests");

        var mock1 = new Fayde.Collections.ObservableCollection();
        mock1.AddRange([
            { Name: "Name1", Description: "Description 1" },
            { Name: "Name3", Description: "Description 3" },
            { Name: "Name4", Description: "Description 4" },
            { Name: "Name5", Description: "Description 5" }
        ]);

        function createTextColumn(displayMemberPath) {
            var col = new GridTextColumn();
            col.Binding = new Fayde.Data.Binding(displayMemberPath);
            return col;
        }
        function verifyColumns(grid, ilen, jlen) {
            for (var i = 0; i < ilen; i++) {
                for (var j = 0; j < jlen; j++) {
                    var cell = grid.Children.GetValueAt(i * jlen + j);
                    if (Grid.GetColumn(cell) !== j)
                        return false;
                }
            }
            return true;
        }
        function verifyRows(grid, ilen, jlen) {
            for (var i = 0; i < ilen; i++) {
                for (var j = 0; j < jlen; j++) {
                    var cell = grid.Children.GetValueAt(i * jlen + j);
                    if (Grid.GetRow(cell) !== i)
                        return false;
                }
            }
            return true;
        }

        test("Column movement", function () {
            var gic = new GridItemsControl();
            gic.Measure(size.fromRaw(100, 100));

            gic.ItemsSource = mock1;

            gic.Columns.Add(createTextColumn("Name"));
            gic.Columns.Add(createTextColumn("Description"));

            var presenter = gic.XamlNode.ItemsPresenter;
            var grid = presenter.Panel;
            strictEqual(grid.ColumnDefinitions.Count, 2);
            strictEqual(grid.RowDefinitions.Count, 4);
            strictEqual(grid.Children.Count, 8);

            gic.Columns.Insert(1, createTextColumn("Extra"));
            strictEqual(grid.ColumnDefinitions.Count, 3);
            strictEqual(grid.Children.Count, 12);
            ok(verifyColumns(grid, 4, 3), "cols");
            ok(verifyRows(grid, 4, 3), "rows");

            gic.Columns.RemoveAt(1);
            strictEqual(grid.ColumnDefinitions.Count, 2);
            strictEqual(grid.Children.Count, 8);
            ok(verifyColumns(grid, 4, 2), "cols");
            ok(verifyRows(grid, 4, 2), "rows");
        });

        test("Item movement", function () {
            var gic = new GridItemsControl();
            gic.Measure(size.fromRaw(100, 100));

            gic.ItemsSource = mock1;

            gic.Columns.Add(createTextColumn("Name"));
            gic.Columns.Add(createTextColumn("Description"));

            var presenter = gic.XamlNode.ItemsPresenter;
            var grid = presenter.Panel;
            strictEqual(grid.ColumnDefinitions.Count, 2);
            strictEqual(grid.RowDefinitions.Count, 4);
            strictEqual(grid.Children.Count, 8);
            ok(verifyColumns(grid, 4, 2), "cols");
            ok(verifyRows(grid, 4, 2), "rows");

            var newItem = { Name: "Name2", Description: "Description 2" };

            mock1.Insert(newItem, 1);
            strictEqual(grid.RowDefinitions.Count, 5);
            strictEqual(grid.Children.Count, 10);
            ok(verifyColumns(grid, 5, 2), "cols");
            ok(verifyRows(grid, 5, 2), "rows");

            mock1.Remove(newItem);
            strictEqual(grid.RowDefinitions.Count, 4);
            strictEqual(grid.Children.Count, 8);
            ok(verifyColumns(grid, 4, 2), "cols");
            ok(verifyRows(grid, 4, 2), "rows");
        });
    }
    exports.run = run;
});
