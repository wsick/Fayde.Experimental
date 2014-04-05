/// <reference path="../lib/Fayde/Fayde.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var MainViewModel = (function (_super) {
        __extends(MainViewModel, _super);
        function MainViewModel() {
            _super.call(this);
            this.Items = new Fayde.Collections.ObservableCollection();
            this.Items.AddRange([
                {
                    FirstName: "First1",
                    LastName: "Last1"
                },
                {
                    FirstName: "First2",
                    LastName: "Last2"
                },
                {
                    FirstName: "First3",
                    LastName: "Last3"
                },
                {
                    FirstName: "First4",
                    LastName: "Last4"
                }
            ]);
        }
        MainViewModel.prototype.RemoveItem = function (args) {
            if (!args.parameter)
                return;
            this.Items.Remove(args.parameter);
        };
        return MainViewModel;
    })(Fayde.MVVM.ViewModelBase);
    
    return MainViewModel;
});
//# sourceMappingURL=MainViewModel.js.map
