/// <reference path="../lib/fayde/Fayde.d.ts" />

import TestItem = require("../Models/TestItem");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    Items = new Fayde.Collections.ObservableCollection<TestItem>();
    constructor() {
        super();
        this.Items.AddRange([
            new TestItem("First1", "Last1", 10),
            new TestItem("First2", "Last2", 12),
            new TestItem("First3", "Last3", 13),
            new TestItem("First4", "Last4", 14)
        ]);
    }
    RemoveItem(args: Fayde.IEventBindingArgs<Fayde.RoutedEventArgs>) {
        if (!args.parameter)
            return;
        this.Items.Remove(args.parameter);
    }
}
export = MainViewModel;