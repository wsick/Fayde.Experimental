var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        Experimental.Version = '0.4.0';
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var CellMouseButtonEventArgs = (function (_super) {
            __extends(CellMouseButtonEventArgs, _super);
            function CellMouseButtonEventArgs(cell, args) {
                _super.call(this, args.AbsolutePos);
                Object.defineProperty(this, "Cell", { value: cell, writable: false });
            }
            return CellMouseButtonEventArgs;
        })(Fayde.Input.MouseButtonEventArgs);
        Experimental.CellMouseButtonEventArgs = CellMouseButtonEventArgs;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var CellMouseEventArgs = (function (_super) {
            __extends(CellMouseEventArgs, _super);
            function CellMouseEventArgs(cell, args) {
                _super.call(this, args.AbsolutePos);
                Object.defineProperty(this, "Cell", { value: cell, writable: false });
            }
            return CellMouseEventArgs;
        })(Fayde.Input.MouseEventArgs);
        Experimental.CellMouseEventArgs = CellMouseEventArgs;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var EditingChangedEventArgs = (function () {
            function EditingChangedEventArgs(item, row) {
                Object.defineProperty(this, "Item", { value: item, writable: false });
                Object.defineProperty(this, "Row", { value: row, writable: false });
            }
            return EditingChangedEventArgs;
        })();
        Experimental.EditingChangedEventArgs = EditingChangedEventArgs;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridColumnChangedEventArgs = (function () {
            function GridColumnChangedEventArgs(col) {
                Object.defineProperty(this, "GridColumn", { value: col, writable: false });
            }
            return GridColumnChangedEventArgs;
        })();
        Experimental.GridColumnChangedEventArgs = GridColumnChangedEventArgs;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var Internal;
        (function (Internal) {
            var ItemChangedCollection = (function (_super) {
                __extends(ItemChangedCollection, _super);
                function ItemChangedCollection() {
                    _super.apply(this, arguments);
                    this.ItemChanged = new nullstone.Event();
                    this.CollectionChanged = new nullstone.Event();
                }
                ItemChangedCollection.prototype._RaiseItemAdded = function (value, index) {
                    this.CollectionChanged.raise(this, Fayde.Collections.CollectionChangedEventArgs.Add(value, index));
                };
                ItemChangedCollection.prototype._RaiseItemRemoved = function (value, index) {
                    this.CollectionChanged.raise(this, Fayde.Collections.CollectionChangedEventArgs.Remove(value, index));
                };
                ItemChangedCollection.prototype._RaiseItemReplaced = function (removed, added, index) {
                    this.CollectionChanged.raise(this, Fayde.Collections.CollectionChangedEventArgs.Replace(added, removed, index));
                };
                ItemChangedCollection.prototype._RaiseCleared = function (old) {
                    this.CollectionChanged.raise(this, Fayde.Collections.CollectionChangedEventArgs.Reset(old));
                };
                return ItemChangedCollection;
            })(Fayde.XamlObjectCollection);
            Internal.ItemChangedCollection = ItemChangedCollection;
            var ItemChangedEventArgs = (function () {
                function ItemChangedEventArgs(t) {
                    Object.defineProperty(this, "Item", { value: t, writable: false });
                }
                return ItemChangedEventArgs;
            })();
            Internal.ItemChangedEventArgs = ItemChangedEventArgs;
        })(Internal = Experimental.Internal || (Experimental.Internal = {}));
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="Internal/ItemChangedCollection.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var ContentControl = Fayde.Controls.ContentControl;
        var GridHeader = (function (_super) {
            __extends(GridHeader, _super);
            function GridHeader() {
                _super.apply(this, arguments);
            }
            GridHeader.prototype.GetContainerForCell = function () {
                return new Experimental.GridHeaderCell();
            };
            GridHeader.prototype.PrepareContainerForCell = function (cell) {
                var gc = cell;
                if (gc instanceof Experimental.GridHeaderCell) {
                    var binding = new Fayde.Data.Binding("Header");
                    binding.Source = this;
                    gc.SetBinding(ContentControl.ContentProperty, binding);
                    binding = new Fayde.Data.Binding("HeaderTemplate");
                    binding.Source = this;
                    gc.SetBinding(ContentControl.ContentTemplateProperty, binding);
                    binding = new Fayde.Data.Binding("HeaderStyle");
                    binding.Source = this;
                    binding.Mode = 0 /* OneWay */;
                    gc.SetBinding(Fayde.FrameworkElement.StyleProperty, binding);
                }
            };
            GridHeader.prototype.ClearContainerForCell = function (cell) {
                var gc = cell;
                if (gc instanceof Experimental.GridHeaderCell) {
                    gc.ClearValue(ContentControl.ContentProperty);
                    gc.ClearValue(ContentControl.ContentTemplateProperty);
                    gc.ClearValue(Fayde.FrameworkElement.StyleProperty);
                }
            };
            GridHeader.HeaderProperty = DependencyProperty.Register("Header", function () { return Object; }, GridHeader);
            GridHeader.HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", function () { return Fayde.DataTemplate; }, GridHeader);
            GridHeader.HeaderStyleProperty = DependencyProperty.Register("HeaderStyle", function () { return Fayde.Style; }, GridHeader);
            return GridHeader;
        })(Fayde.DependencyObject);
        Experimental.GridHeader = GridHeader;
        var GridHeaderCollection = (function (_super) {
            __extends(GridHeaderCollection, _super);
            function GridHeaderCollection() {
                _super.apply(this, arguments);
            }
            return GridHeaderCollection;
        })(Experimental.Internal.ItemChangedCollection);
        Experimental.GridHeaderCollection = GridHeaderCollection;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridHeaderChangedEventArgs = (function () {
            function GridHeaderChangedEventArgs(header) {
                Object.defineProperty(this, "GridHeader", { value: header, writable: false });
            }
            return GridHeaderChangedEventArgs;
        })();
        Experimental.GridHeaderChangedEventArgs = GridHeaderChangedEventArgs;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridHeadersControlNode = (function (_super) {
            __extends(GridHeadersControlNode, _super);
            function GridHeadersControlNode(xobj) {
                _super.call(this, xobj);
                this.HeadersPresenter = null;
            }
            GridHeadersControlNode.prototype.GetDefaultVisualTree = function () {
                var presenter = this.HeadersPresenter;
                if (!presenter)
                    (presenter = new Experimental.GridHeadersPresenter()).TemplateOwner = this.XObject;
                return presenter;
            };
            return GridHeadersControlNode;
        })(Fayde.Controls.ControlNode);
        Experimental.GridHeadersControlNode = GridHeadersControlNode;
        var GridHeadersControl = (function (_super) {
            __extends(GridHeadersControl, _super);
            function GridHeadersControl() {
                _super.call(this);
                this.DefaultStyleKey = this.constructor;
                var coll = GridHeadersControl.HeadersProperty.Initialize(this);
                coll.CollectionChanged.on(this._HeadersChanged, this);
                coll.ItemChanged.on(this._HeaderChanged, this);
            }
            GridHeadersControl.prototype.CreateNode = function () {
                return new GridHeadersControlNode(this);
            };
            GridHeadersControl.prototype.OnItemsControlChanged = function (args) {
                var presenter = this.XamlNode.HeadersPresenter;
                if (!presenter)
                    return;
                presenter.UnlinkControl(args.OldValue);
                presenter.LinkControl(args.NewValue);
            };
            GridHeadersControl.prototype._HeadersChanged = function (sender, e) {
                var presenter = this.XamlNode.HeadersPresenter;
                if (!presenter)
                    return;
                switch (e.Action) {
                    case 1 /* Add */:
                        for (var i = 0, len = e.NewItems.length; i < len; i++) {
                            presenter.OnHeaderAdded(e.NewStartingIndex + i, e.NewItems[i]);
                        }
                        break;
                    case 2 /* Remove */:
                        for (var i = 0, len = e.OldItems.length; i < len; i++) {
                            presenter.OnHeaderRemoved(e.OldStartingIndex + i);
                        }
                        break;
                    case 3 /* Replace */:
                        presenter.OnHeaderRemoved(e.NewStartingIndex);
                        presenter.OnHeaderAdded(e.NewStartingIndex, e.NewItems[i]);
                        break;
                    case 4 /* Reset */:
                        presenter.OnHeadersCleared();
                        break;
                }
            };
            GridHeadersControl.prototype._HeaderChanged = function (sender, e) {
                var presenter = this.XamlNode.HeadersPresenter;
                if (!presenter)
                    return;
                presenter.OnHeaderChanged(e.Item);
            };
            GridHeadersControl.ItemsControlProperty = DependencyProperty.Register("ItemsControl", function () { return Experimental.GridItemsControl; }, GridHeadersControl, undefined, function (d, args) { return d.OnItemsControlChanged(args); });
            GridHeadersControl.HeadersProperty = DependencyProperty.RegisterImmutable("Headers", function () { return Experimental.GridHeaderCollection; }, GridHeadersControl);
            return GridHeadersControl;
        })(Fayde.Controls.Control);
        Experimental.GridHeadersControl = GridHeadersControl;
        Fayde.Markup.Content(GridHeadersControl, GridHeadersControl.HeadersProperty);
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var Grid = Fayde.Controls.Grid;
        var GridHeadersPresenterNode = (function (_super) {
            __extends(GridHeadersPresenterNode, _super);
            function GridHeadersPresenterNode(xobj) {
                _super.call(this, xobj);
            }
            Object.defineProperty(GridHeadersPresenterNode.prototype, "ElementRoot", {
                get: function () {
                    return this._ElementRoot;
                },
                enumerable: true,
                configurable: true
            });
            GridHeadersPresenterNode.prototype.DoApplyTemplateWithError = function (error) {
                if (this._ElementRoot)
                    return false;
                var xobj = this.XObject;
                var ghc = xobj.TemplateOwner;
                if (!(ghc instanceof Experimental.GridHeadersControl))
                    return false;
                this._ElementRoot = new Grid();
                if (!this.FinishApplyTemplateWithError(this._ElementRoot, error))
                    return false;
                ghc.XamlNode.HeadersPresenter = xobj;
                for (var i = 0, headers = ghc.Headers.ToArray(), len = headers.length; i < len; i++) {
                    xobj.OnHeaderAdded(i, headers[i]);
                }
                xobj.LinkControl(ghc.ItemsControl);
                return true;
            };
            return GridHeadersPresenterNode;
        })(Fayde.FENode);
        Experimental.GridHeadersPresenterNode = GridHeadersPresenterNode;
        var GridHeadersPresenter = (function (_super) {
            __extends(GridHeadersPresenter, _super);
            function GridHeadersPresenter() {
                _super.apply(this, arguments);
                this._Headers = [];
                this._HeaderContainers = [];
                this._LinkedItemsControl = null;
            }
            GridHeadersPresenter.prototype.CreateNode = function () {
                return new GridHeadersPresenterNode(this);
            };
            Object.defineProperty(GridHeadersPresenter.prototype, "GridHeadersControl", {
                get: function () {
                    return this.TemplateOwner instanceof Experimental.GridHeadersControl ? this.TemplateOwner : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridHeadersPresenter.prototype, "Panel", {
                get: function () {
                    return this.XamlNode.ElementRoot;
                },
                enumerable: true,
                configurable: true
            });
            GridHeadersPresenter.prototype.OnHeaderAdded = function (index, header) {
                this._Headers.splice(index, 0, header);
                var grid = this.Panel;
                var coldef = new Experimental.HeaderColumnDefinition();
                grid.ColumnDefinitions.Insert(index, coldef);
                var linkedGrid = this.LinkedItemsPanel;
                if (linkedGrid)
                    coldef.Link(linkedGrid.ColumnDefinitions.GetValueAt(index));
                var containers = this._HeaderContainers;
                var cell = header.GetContainerForCell();
                containers.splice(index, 0, cell);
                header.PrepareContainerForCell(cell);
                for (var i = index, len = containers.length; i < len; i++) {
                    Grid.SetColumn(containers[i], i);
                }
                grid.Children.Insert(index, cell);
            };
            GridHeadersPresenter.prototype.OnHeaderRemoved = function (index) {
                var header = this._Headers[index];
                var containers = this._HeaderContainers;
                var grid = this.Panel;
                var coldefs = grid.ColumnDefinitions;
                var cell = containers.splice(index, 1)[0];
                header.ClearContainerForCell(cell);
                grid.Children.RemoveAt(index);
                coldefs.GetValueAt(index).Unlink();
                coldefs.RemoveAt(index);
                for (var i = index, len = containers.length; i < len; i++) {
                    Grid.SetColumn(containers[i], i);
                }
            };
            GridHeadersPresenter.prototype.OnHeadersCleared = function () {
                var grid = this.Panel;
                var coldefs = grid.ColumnDefinitions;
                for (var i = 0, headers = this._Headers, containers = this._HeaderContainers, len = containers.length; i < len; i++) {
                    var header = headers[i];
                    header.ClearContainerForCell(containers[i]);
                    coldefs.GetValueAt(i).Unlink();
                }
                coldefs.Clear();
                grid.Children.Clear();
                this._Headers.length = 0;
                this._HeaderContainers.length = 0;
            };
            GridHeadersPresenter.prototype.OnHeaderChanged = function (header) {
                var index = this._Headers.indexOf(header);
                var cell = this._HeaderContainers[index];
                header.PrepareContainerForCell(cell);
            };
            Object.defineProperty(GridHeadersPresenter.prototype, "LinkedItemsPanel", {
                get: function () {
                    var gic = this._LinkedItemsControl;
                    if (!gic)
                        return null;
                    var presenter = gic.XamlNode.ItemsPresenter;
                    if (!presenter)
                        return null;
                    return presenter.Panel;
                },
                enumerable: true,
                configurable: true
            });
            GridHeadersPresenter.prototype.LinkControl = function (gic) {
                var _this = this;
                this._LinkedItemsControl = gic;
                gic.XamlNode.ListenForPresenterCreated(function (presenter) { return _this.FinishLinkControl(presenter); });
            };
            GridHeadersPresenter.prototype.FinishLinkControl = function (presenter) {
                var grid = this.Panel;
                var linkedDefs = presenter.Panel.ColumnDefinitions;
                for (var i = 0, defs = grid.ColumnDefinitions, len = defs.Count; i < len; i++) {
                    defs.GetValueAt(i).Link(linkedDefs.GetValueAt(i));
                }
            };
            GridHeadersPresenter.prototype.UnlinkControl = function (gic) {
                if (!gic)
                    return;
                var grid = this.Panel;
                for (var i = 0, defs = grid.ColumnDefinitions, len = defs.Count; i < len; i++) {
                    defs.GetValueAt(i).Unlink();
                }
                this._LinkedItemsControl = null;
            };
            return GridHeadersPresenter;
        })(Fayde.FrameworkElement);
        Experimental.GridHeadersPresenter = GridHeadersPresenter;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var Grid = Fayde.Controls.Grid;
        var GridItemsControlNode = (function (_super) {
            __extends(GridItemsControlNode, _super);
            function GridItemsControlNode(xobj) {
                _super.call(this, xobj);
                this.ItemsPresenter = null;
                this._CreatorListeners = null;
            }
            GridItemsControlNode.prototype.GetDefaultVisualTree = function () {
                var presenter = this.ItemsPresenter;
                if (!presenter)
                    (presenter = new Experimental.GridItemsPresenter()).TemplateOwner = this.XObject;
                return presenter;
            };
            GridItemsControlNode.prototype.ListenForPresenterCreated = function (func) {
                if (this.ItemsPresenter) {
                    func(this.ItemsPresenter);
                    return;
                }
                this._CreatorListeners = this._CreatorListeners || [];
                this._CreatorListeners.push(func);
            };
            GridItemsControlNode.prototype.OnPresenterCreated = function () {
                var presenter = this.ItemsPresenter;
                if (!presenter)
                    return;
                for (var i = 0, listeners = this._CreatorListeners, len = listeners ? listeners.length : 0; i < len; i++) {
                    listeners[i](presenter);
                }
                this._CreatorListeners = null;
                this.InitSelection(presenter);
                var gic = this.XObject;
                for (var i = 0, adorners = gic.Adorners.ToArray(), len = adorners.length; i < len; i++) {
                    adorners[i].OnAttached(gic);
                }
            };
            GridItemsControlNode.prototype._CellClicked = function (sender, e) {
                var row = Grid.GetRow(e.Cell);
                var col = Grid.GetColumn(e.Cell);
                var xobj = this.XObject;
                xobj.SetCurrentValue(GridItemsControl.SelectedRowProperty, row);
            };
            GridItemsControlNode.prototype.InitSelection = function (presenter) {
                presenter.CellClicked.on(this._CellClicked, this);
            };
            return GridItemsControlNode;
        })(Fayde.Controls.ControlNode);
        Experimental.GridItemsControlNode = GridItemsControlNode;
        var GridItemsControl = (function (_super) {
            __extends(GridItemsControl, _super);
            function GridItemsControl() {
                var _this = this;
                _super.call(this);
                this.SelectionChanged = new nullstone.Event();
                this.EditingChanged = new nullstone.Event();
                this._IsCoercingSel = false;
                this._IsCoercingEdit = false;
                this._Items = [];
                this.DefaultStyleKey = this.constructor;
                this._ToggleEditCommand = new Fayde.MVVM.RelayCommand(function (args) { return _this.EditingItem = (_this.EditingItem === args.parameter) ? undefined : args.parameter; });
                var cols = GridItemsControl.ColumnsProperty.Initialize(this);
                cols.CollectionChanged.on(this._ColumnsChanged, this);
                cols.ItemChanged.on(this._ColumnChanged, this);
                var ads = GridItemsControl.AdornersProperty.Initialize(this);
                ads.CollectionChanged.on(this._AdornersChanged, this);
            }
            GridItemsControl.prototype.CreateNode = function () {
                return new GridItemsControlNode(this);
            };
            Object.defineProperty(GridItemsControl.prototype, "IsItemsControl", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridItemsControl.prototype, "ItemsPresenter", {
                get: function () {
                    return this.XamlNode.ItemsPresenter;
                },
                enumerable: true,
                configurable: true
            });
            GridItemsControl.prototype.OnSelectionChanged = function () {
                this.SelectionChanged.raise(this, new Experimental.SelectionChangedEventArgs(this.SelectedItem, this.SelectedRow));
            };
            GridItemsControl.prototype.OnEditingChanged = function () {
                var item = this.EditingItem;
                var row = this.EditingRow;
                this.ItemsPresenter.OnEditingItemChanged(item, row);
                this.EditingChanged.raise(this, new Experimental.EditingChangedEventArgs(item, row));
            };
            GridItemsControl.prototype.OnItemsSourceChanged = function (oldItemsSource, newItemsSource) {
                var nc = Fayde.Collections.INotifyCollectionChanged_.as(oldItemsSource);
                if (nc)
                    nc.CollectionChanged.off(this._OnItemsSourceUpdated, this);
                if (oldItemsSource)
                    this._RemoveItems(0, this._Items);
                if (newItemsSource)
                    this._AddItems(0, nullstone.IEnumerable_.toArray(newItemsSource));
                var nc = Fayde.Collections.INotifyCollectionChanged_.as(newItemsSource);
                if (nc)
                    nc.CollectionChanged.on(this._OnItemsSourceUpdated, this);
            };
            GridItemsControl.prototype._OnItemsSourceUpdated = function (sender, e) {
                switch (e.Action) {
                    case 1 /* Add */:
                        this._AddItems(e.NewStartingIndex, e.NewItems);
                        break;
                    case 2 /* Remove */:
                        this._RemoveItems(e.OldStartingIndex, e.OldItems);
                        break;
                    case 3 /* Replace */:
                        this._RemoveItems(e.NewStartingIndex, e.OldItems);
                        this._AddItems(e.NewStartingIndex, e.NewItems);
                        break;
                    case 4 /* Reset */:
                        this._RemoveItems(0, e.OldItems);
                        break;
                }
            };
            GridItemsControl.prototype.OnSelectedItemChanged = function (oldItem, newItem) {
                if (this._IsCoercingSel)
                    return;
                try {
                    this._IsCoercingSel = true;
                    this.SetCurrentValue(GridItemsControl.SelectedRowProperty, this._Items.indexOf(newItem));
                }
                finally {
                    this._IsCoercingSel = false;
                }
                this.OnSelectionChanged();
            };
            GridItemsControl.prototype.OnSelectedRowChanged = function (oldRow, newRow) {
                if (this._IsCoercingSel)
                    return;
                try {
                    this._IsCoercingSel = true;
                    this.SetCurrentValue(GridItemsControl.SelectedItemProperty, (newRow > -1 && newRow < this._Items.length) ? this._Items[newRow] : undefined);
                }
                finally {
                    this._IsCoercingSel = false;
                }
                this.OnSelectionChanged();
            };
            GridItemsControl.prototype.OnEditingItemChanged = function (oldItem, newItem) {
                if (this._IsCoercingEdit)
                    return;
                try {
                    this._IsCoercingEdit = true;
                    this.SetCurrentValue(GridItemsControl.EditingRowProperty, this._Items.indexOf(newItem));
                }
                finally {
                    this._IsCoercingEdit = false;
                }
                this.OnEditingChanged();
            };
            GridItemsControl.prototype.OnEditingRowChanged = function (oldRow, newRow) {
                if (this._IsCoercingEdit)
                    return;
                try {
                    this._IsCoercingEdit = true;
                    this.SetCurrentValue(GridItemsControl.EditingItemProperty, (newRow > -1 && newRow < this._Items.length) ? this._Items[newRow] : undefined);
                }
                finally {
                    this._IsCoercingEdit = false;
                }
                this.OnEditingChanged();
            };
            Object.defineProperty(GridItemsControl.prototype, "Items", {
                get: function () {
                    return this._Items;
                },
                enumerable: true,
                configurable: true
            });
            GridItemsControl.prototype._AddItems = function (index, newItems) {
                var items = this._Items;
                for (var i = 0, len = newItems.length; i < len; i++) {
                    items.splice(index + i, 0, newItems[i]);
                }
                this.OnItemsAdded(index, newItems);
            };
            GridItemsControl.prototype._RemoveItems = function (index, oldItems) {
                this._Items.splice(index, oldItems.length);
                this.OnItemsRemoved(index, oldItems);
            };
            Object.defineProperty(GridItemsControl.prototype, "ToggleEditCommand", {
                get: function () {
                    return this._ToggleEditCommand;
                },
                enumerable: true,
                configurable: true
            });
            GridItemsControl.prototype.OnItemsAdded = function (index, newItems) {
                var presenter = this.XamlNode.ItemsPresenter;
                if (presenter)
                    presenter.OnItemsAdded(index, newItems);
                var item = this.SelectedItem;
                var row = this.SelectedRow;
                if (item === undefined && row > -1) {
                    this.SetCurrentValue(GridItemsControl.SelectedItemProperty, this._Items[row]);
                }
                else if (item !== undefined && row < 0) {
                    this.SetCurrentValue(GridItemsControl.SelectedRowProperty, this._Items.indexOf(item));
                }
            };
            GridItemsControl.prototype.OnItemsRemoved = function (index, oldItems) {
                var presenter = this.XamlNode.ItemsPresenter;
                if (presenter)
                    presenter.OnItemsRemoved(index, oldItems);
                var item = this.SelectedItem;
                var row = this.SelectedRow;
                if (item !== undefined && oldItems.indexOf(item) > -1) {
                    this.SetCurrentValue(GridItemsControl.SelectedItemProperty, undefined);
                }
                else if (row > -1 && (row >= index && row < (index + oldItems.length))) {
                    this.SetCurrentValue(GridItemsControl.SelectedRowProperty, -1);
                }
            };
            GridItemsControl.prototype._ColumnsChanged = function (sender, e) {
                var presenter = this.XamlNode.ItemsPresenter;
                if (!presenter)
                    return;
                switch (e.Action) {
                    case 1 /* Add */:
                        for (var i = 0, len = e.NewItems.length; i < len; i++) {
                            presenter.OnColumnAdded(e.NewStartingIndex + i, e.NewItems[i]);
                        }
                        break;
                    case 2 /* Remove */:
                        for (var i = 0, len = e.OldItems.length; i < len; i++) {
                            presenter.OnColumnRemoved(e.OldStartingIndex + i);
                        }
                        break;
                    case 3 /* Replace */:
                        presenter.OnColumnRemoved(e.NewStartingIndex);
                        presenter.OnColumnAdded(e.NewStartingIndex, e.NewItems[i]);
                        break;
                    case 4 /* Reset */:
                        presenter.OnColumnsCleared();
                        break;
                }
            };
            GridItemsControl.prototype._ColumnChanged = function (sender, e) {
                var presenter = this.XamlNode.ItemsPresenter;
                if (!presenter)
                    return;
                presenter.OnColumnChanged(e.Item);
            };
            GridItemsControl.prototype._AdornersChanged = function (sender, e) {
                var presenter = this.XamlNode.ItemsPresenter;
                if (!presenter)
                    return;
                var oldItems = e.NewItems;
                for (var i = 0, len = oldItems ? oldItems.length : 0; i < len; i++) {
                    oldItems[i].OnDetached(this);
                }
                var newItems = e.NewItems;
                for (var i = 0, len = newItems ? newItems.length : 0; i < len; i++) {
                    newItems[i].OnAttached(this);
                }
            };
            GridItemsControl.ItemsSourceProperty = DependencyProperty.Register("ItemsSource", function () { return nullstone.IEnumerable_; }, GridItemsControl, null, function (d, args) { return d.OnItemsSourceChanged(args.OldValue, args.NewValue); });
            GridItemsControl.ColumnsProperty = DependencyProperty.RegisterImmutable("Columns", function () { return Experimental.GridColumnCollection; }, GridItemsControl);
            GridItemsControl.AdornersProperty = DependencyProperty.RegisterImmutable("Adorners", function () { return Experimental.Primitives.GridAdornerCollection; }, GridItemsControl);
            GridItemsControl.SelectedItemProperty = DependencyProperty.Register("SelectedItem", function () { return Object; }, GridItemsControl, undefined, function (d, args) { return d.OnSelectedItemChanged(args.OldValue, args.NewValue); });
            GridItemsControl.SelectedRowProperty = DependencyProperty.Register("SelectedRow", function () { return Number; }, GridItemsControl, -1, function (d, args) { return d.OnSelectedRowChanged(args.OldValue, args.NewValue); });
            GridItemsControl.EditingItemProperty = DependencyProperty.Register("EditingItem", function () { return Object; }, GridItemsControl, undefined, function (d, args) { return d.OnEditingItemChanged(args.OldValue, args.NewValue); });
            GridItemsControl.EditingRowProperty = DependencyProperty.Register("EditingRow", function () { return Number; }, GridItemsControl, -1, function (d, args) { return d.OnEditingRowChanged(args.OldValue, args.NewValue); });
            return GridItemsControl;
        })(Fayde.Controls.Control);
        Experimental.GridItemsControl = GridItemsControl;
        Fayde.Markup.Content(GridItemsControl, GridItemsControl.ColumnsProperty);
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var Grid = Fayde.Controls.Grid;
        var RowDefinition = Fayde.Controls.RowDefinition;
        var ColumnDefinition = Fayde.Controls.ColumnDefinition;
        var GridItemsPresenterNode = (function (_super) {
            __extends(GridItemsPresenterNode, _super);
            function GridItemsPresenterNode(xobj) {
                _super.call(this, xobj);
            }
            Object.defineProperty(GridItemsPresenterNode.prototype, "ElementRoot", {
                get: function () {
                    return this._ElementRoot;
                },
                enumerable: true,
                configurable: true
            });
            GridItemsPresenterNode.prototype.DoApplyTemplateWithError = function (error) {
                if (this._ElementRoot)
                    return false;
                var xobj = this.XObject;
                var gic = xobj.TemplateOwner;
                if (!(gic instanceof Experimental.GridItemsControl))
                    return false;
                this._ElementRoot = new Grid();
                this._ElementRoot.Background = new Fayde.Media.SolidColorBrush(Color.KnownColors.Transparent);
                if (!this.FinishApplyTemplateWithError(this._ElementRoot, error))
                    return false;
                gic.XamlNode.ItemsPresenter = xobj;
                for (var i = 0, cols = gic.Columns.ToArray(), len = cols.length; i < len; i++) {
                    xobj.OnColumnAdded(i, cols[i]);
                }
                xobj.OnItemsAdded(0, gic.Items);
                gic.XamlNode.OnPresenterCreated();
                return true;
            };
            return GridItemsPresenterNode;
        })(Fayde.FENode);
        Experimental.GridItemsPresenterNode = GridItemsPresenterNode;
        var GridItemsPresenter = (function (_super) {
            __extends(GridItemsPresenter, _super);
            function GridItemsPresenter() {
                _super.apply(this, arguments);
                this._CellContainers = []; //[row][col]
                this._Columns = [];
                this.CellClicked = new Fayde.RoutedEvent();
                this.CellMouseEnter = new Fayde.RoutedEvent();
                this.CellMouseLeave = new Fayde.RoutedEvent();
                this._EditIndex = -1;
            }
            GridItemsPresenter.prototype.CreateNode = function () {
                return new GridItemsPresenterNode(this);
            };
            Object.defineProperty(GridItemsPresenter.prototype, "GridItemsControl", {
                get: function () {
                    return this.TemplateOwner instanceof Experimental.GridItemsControl ? this.TemplateOwner : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridItemsPresenter.prototype, "Panel", {
                get: function () {
                    return this.XamlNode.ElementRoot;
                },
                enumerable: true,
                configurable: true
            });
            GridItemsPresenter.prototype.OnCellMouseLeftButtonDown = function (sender, e) {
                this.CellClicked.raise(this, new Experimental.CellMouseButtonEventArgs(sender, e));
            };
            GridItemsPresenter.prototype.OnCellMouseEnter = function (sender, e) {
                this.CellMouseEnter.raise(this, new Experimental.CellMouseEventArgs(sender, e));
            };
            GridItemsPresenter.prototype.OnCellMouseLeave = function (sender, e) {
                this.CellMouseLeave.raise(this, new Experimental.CellMouseEventArgs(sender, e));
            };
            GridItemsPresenter.prototype.OnColumnAdded = function (index, newColumn) {
                //TODO: Handle multiple columns
                var cols = this._Columns;
                cols.splice(index, 0, newColumn);
                var gic = this.GridItemsControl;
                var grid = this.Panel;
                if (!gic || !grid)
                    return;
                var coldef = new ColumnDefinition();
                newColumn.AttachToDefinition(coldef);
                grid.ColumnDefinitions.Insert(index, coldef);
                for (var i = 0, containers = this._CellContainers, len = containers.length, items = gic.Items, children = grid.Children; i < len; i++) {
                    var item = items[i];
                    var container = newColumn.GetContainerForCell(item);
                    this._PrepareContainer(newColumn, container, item);
                    containers[i].splice(index, 0, container);
                    Grid.SetRow(container, i);
                    children.Insert(i * cols.length + index, container);
                }
                for (var i = 0, containers = this._CellContainers, len = containers.length; i < len; i++) {
                    for (var j = index, cells = containers[i], len2 = cells.length; j < len2; j++) {
                        Grid.SetColumn(cells[j], j);
                    }
                }
            };
            GridItemsPresenter.prototype.OnColumnRemoved = function (index) {
                //TODO: Handle multiple columns
                var cols = this._Columns;
                var col = cols[index];
                var gic = this.GridItemsControl;
                var grid = this.Panel;
                if (gic && grid) {
                    for (var items = gic.Items, containers = this._CellContainers, i = containers.length - 1; i >= 0; i--) {
                        var container = containers[i][index];
                        this._ClearContainer(col, container, items[i]);
                        grid.Children.Remove(container);
                        var cells = containers[i];
                        cells.splice(index, 1);
                        for (var j = index, len2 = cells.length; j < len2; j++) {
                            Grid.SetColumn(cells[j], j);
                        }
                    }
                    grid.ColumnDefinitions.RemoveAt(index);
                }
                col.DetachDefinition();
                cols.splice(index, 1);
            };
            GridItemsPresenter.prototype.OnColumnsCleared = function () {
                var cols = this._Columns;
                var gic = this.GridItemsControl;
                var grid = this.Panel;
                if (gic && grid) {
                    var items = gic.Items;
                    for (var containers = this._CellContainers, i = containers.length - 1; i >= 0; i--) {
                        for (var j = cols.length - 1; j >= 0; j--) {
                            var container = containers[i][j];
                            this._ClearContainer(cols[j], container, items[i]);
                            grid.Children.Remove(container);
                        }
                    }
                }
                for (var j = 0, len = cols.length; j < len; j++) {
                    cols[j].DetachDefinition();
                }
                grid.ColumnDefinitions.Clear();
                cols.length = 0;
                this._CellContainers.length = 0;
            };
            GridItemsPresenter.prototype.OnColumnChanged = function (col) {
                var gic = this.GridItemsControl;
                if (!gic)
                    return;
                var colindex = this._Columns.indexOf(col);
                if (colindex < 0)
                    return;
                for (var i = 0, containers = this._CellContainers, items = gic.Items, len = containers.length; i < len; i++) {
                    this._PrepareContainer(col, containers[i][colindex], items[i]);
                }
            };
            GridItemsPresenter.prototype.OnItemsAdded = function (index, newItems) {
                var gic = this.GridItemsControl;
                var grid = this.Panel;
                if (!gic || !grid)
                    return;
                var containers = this._CellContainers;
                var items = gic.Items;
                var cols = this._Columns;
                var children = grid.Children;
                //Insert row definitions
                var rowdefs = grid.RowDefinitions;
                for (var i = 0, len = newItems.length; i < len; i++) {
                    var rowdef = new RowDefinition();
                    rowdef.Height = new Fayde.Controls.GridLength(1, 0 /* Auto */);
                    rowdefs.Insert(index + i, rowdef);
                }
                for (var i = 0, len = newItems.length; i < len; i++) {
                    var newrow = [];
                    for (var j = 0, len2 = cols.length; j < len2; j++) {
                        var item = items[index + i];
                        var col = cols[j];
                        var container = col.GetContainerForCell(item);
                        this._PrepareContainer(col, container, item);
                        newrow.push(container);
                        Grid.SetRow(container, index + i);
                        Grid.SetColumn(container, j);
                        children.Insert((index + i) * len2 + j, container);
                    }
                    containers.splice(index + i, 0, newrow);
                }
                for (var i = index + 1, len = containers.length; i < len; i++) {
                    for (var j = 0, cells = containers[i]; j < cells.length; j++) {
                        Grid.SetRow(cells[j], i);
                    }
                }
            };
            GridItemsPresenter.prototype.OnItemsRemoved = function (index, oldItems) {
                var grid = this.Panel;
                if (!grid)
                    return;
                var containers = this._CellContainers;
                var cols = this._Columns;
                // Remove cell containers from _CellContainers
                var oldRowContainers = containers.splice(index, oldItems.length);
                for (var i = 0, len = oldItems.length; i < len; i++) {
                    var oldrow = oldRowContainers[i];
                    for (var j = 0; j < oldrow.length; j++) {
                        var cell = oldrow[j];
                        this._ClearContainer(cols[j], cell, oldItems[i]);
                        grid.Children.Remove(cell);
                    }
                }
                for (var i = index, len = containers.length; i < len; i++) {
                    var row = containers[i];
                    for (var j = 0; j < row.length; j++) {
                        Grid.SetRow(row[j], i);
                    }
                }
                //Remove excessive row definitions
                var rowdefs = grid.RowDefinitions;
                for (var i = 0, len = oldItems.length; i < len; i++) {
                    rowdefs.RemoveAt(index);
                }
            };
            GridItemsPresenter.prototype._PrepareContainer = function (col, container, item) {
                col.PrepareContainerForCell(container, item);
                if (container instanceof Fayde.Controls.Control)
                    container.Background = new Fayde.Media.SolidColorBrush(Color.KnownColors.Transparent);
                container.MouseLeftButtonDown.on(this.OnCellMouseLeftButtonDown, this);
                container.MouseEnter.on(this.OnCellMouseEnter, this);
                container.MouseLeave.on(this.OnCellMouseLeave, this);
            };
            GridItemsPresenter.prototype._ClearContainer = function (col, container, item) {
                container.MouseLeave.off(this.OnCellMouseLeave, this);
                container.MouseEnter.off(this.OnCellMouseEnter, this);
                container.MouseLeftButtonDown.off(this.OnCellMouseLeftButtonDown, this);
                col.ClearContainerForCell(container, item);
            };
            GridItemsPresenter.prototype.OnEditingItemChanged = function (item, index) {
                var oldRow = this._EditIndex > -1 ? this._CellContainers[this._EditIndex] : null;
                for (var i = 0, len = oldRow ? oldRow.length : 0; i < len; i++) {
                    var container = oldRow[i];
                    if (container instanceof Experimental.GridCell)
                        container.IsEditing = false;
                }
                this._EditIndex = index;
                var newRow = this._EditIndex > -1 ? this._CellContainers[this._EditIndex] : null;
                for (var i = 0, len = newRow ? newRow.length : 0; i < len; i++) {
                    var container = newRow[i];
                    if (container instanceof Experimental.GridCell)
                        container.IsEditing = true;
                }
            };
            return GridItemsPresenter;
        })(Fayde.FrameworkElement);
        Experimental.GridItemsPresenter = GridItemsPresenter;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var ColumnDefinition = Fayde.Controls.ColumnDefinition;
        var GridLength = Fayde.Controls.GridLength;
        var GridUnitType = minerva.controls.grid.GridUnitType;
        var HeaderColumnDefinition = (function (_super) {
            __extends(HeaderColumnDefinition, _super);
            function HeaderColumnDefinition() {
                _super.call(this);
                this._LinkedListener = null;
                this._LinkedColDef = null;
                this.Width = new GridLength(1, 0 /* Auto */);
                Fayde.Providers.ActualSizeStore.Instance.ListenToChanged(this, ColumnDefinition.ActualWidthProperty, this._ActualWidthChanged, this);
            }
            HeaderColumnDefinition.prototype.Link = function (coldef) {
                this.Unlink();
                this._LinkedListener = Fayde.Providers.ActualSizeStore.Instance.ListenToChanged(coldef, ColumnDefinition.ActualWidthProperty, this._LinkedActualWidthChanged, this);
                this._LinkedColDef = coldef;
            };
            HeaderColumnDefinition.prototype.Unlink = function () {
                if (this._LinkedListener)
                    this._LinkedListener.Detach();
                this._LinkedListener = null;
                this._LinkedColDef = null;
            };
            HeaderColumnDefinition.prototype._ActualWidthChanged = function (sender, args) {
                var aw = args.NewValue;
                if (isNaN(aw) || !isFinite(aw))
                    return;
                var coldef = this._LinkedColDef;
                if (!coldef || aw === coldef.ActualWidth)
                    return;
                if (coldef.MinWidth < aw)
                    coldef.MinWidth = aw;
            };
            HeaderColumnDefinition.prototype._LinkedActualWidthChanged = function (sender, args) {
                var aw = args.NewValue;
                if (isNaN(aw) || !isFinite(aw))
                    return;
                if (aw === this.ActualWidth)
                    return;
                var coldef = this._LinkedColDef;
                this.Width = coldef.Width.Clone();
                this.MinWidth = aw || 0;
            };
            return HeaderColumnDefinition;
        })(Fayde.Controls.ColumnDefinition);
        Experimental.HeaderColumnDefinition = HeaderColumnDefinition;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="../Internal/ItemChangedCollection.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var Primitives;
        (function (Primitives) {
            var GridAdorner = (function (_super) {
                __extends(GridAdorner, _super);
                function GridAdorner() {
                    _super.apply(this, arguments);
                }
                GridAdorner.prototype.OnAttached = function (gic) {
                };
                GridAdorner.prototype.OnDetached = function (gic) {
                };
                return GridAdorner;
            })(Fayde.DependencyObject);
            Primitives.GridAdorner = GridAdorner;
            var GridAdornerCollection = (function (_super) {
                __extends(GridAdornerCollection, _super);
                function GridAdornerCollection() {
                    _super.apply(this, arguments);
                }
                return GridAdornerCollection;
            })(Experimental.Internal.ItemChangedCollection);
            Primitives.GridAdornerCollection = GridAdornerCollection;
        })(Primitives = Experimental.Primitives || (Experimental.Primitives = {}));
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="Primitives/GridAdorner.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var Grid = Fayde.Controls.Grid;
        var Border = Fayde.Controls.Border;
        var HoveredRowAdorner = (function (_super) {
            __extends(HoveredRowAdorner, _super);
            function HoveredRowAdorner() {
                _super.apply(this, arguments);
                this._HoverRow = -1;
                this._Element = null;
                this._ForegroundElement = null;
            }
            HoveredRowAdorner.prototype.CreateBackgroundElement = function () {
                var el = new Border();
                el.IsHitTestVisible = false;
                var binding = new Fayde.Data.Binding("Background");
                binding.Source = this;
                el.SetBinding(Border.BackgroundProperty, binding);
                binding = new Fayde.Data.Binding("BorderBrush");
                binding.Source = this;
                el.SetBinding(Border.BorderBrushProperty, binding);
                binding = new Fayde.Data.Binding("BorderThickness");
                binding.Source = this;
                el.SetBinding(Border.BorderThicknessProperty, binding);
                binding = new Fayde.Data.Binding("CornerRadius");
                binding.Source = this;
                el.SetBinding(Border.CornerRadiusProperty, binding);
                Fayde.Controls.Panel.SetZIndex(el, -10);
                return el;
            };
            HoveredRowAdorner.prototype.CreateForegroundElement = function () {
                var el = new Border();
                el.IsHitTestVisible = false;
                el.Background = new Fayde.Media.SolidColorBrush(Color.KnownColors.Transparent);
                var binding = new Fayde.Data.Binding("Cursor");
                binding.Source = this;
                el.SetBinding(Fayde.FrameworkElement.CursorProperty, binding);
                Fayde.Controls.Panel.SetZIndex(el, 10);
                return el;
            };
            HoveredRowAdorner.prototype.OnAttached = function (gic) {
                _super.prototype.OnAttached.call(this, gic);
                var presenter = gic.ItemsPresenter;
                presenter.CellMouseEnter.on(this._CellMouseEnter, this);
                presenter.CellMouseLeave.on(this._CellMouseLeave, this);
                var grid = presenter.Panel;
                grid.Children.Add(this._Element = this.CreateBackgroundElement());
                Grid.SetColumnSpan(this._Element, grid.ColumnDefinitions.Count);
                grid.Children.Add(this._ForegroundElement = this.CreateForegroundElement());
                Grid.SetColumnSpan(this._ForegroundElement, grid.ColumnDefinitions.Count);
                this.OnHoverRowChanged(-1, -1);
            };
            HoveredRowAdorner.prototype.OnDetached = function (gic) {
                _super.prototype.OnDetached.call(this, gic);
                var presenter = gic.ItemsPresenter;
                presenter.CellMouseEnter.off(this._CellMouseEnter, this);
                presenter.CellMouseLeave.off(this._CellMouseLeave, this);
                var grid = presenter.Panel;
                grid.Children.Remove(this._Element);
                grid.Children.Remove(this._ForegroundElement);
                this._Element = null;
                this._ForegroundElement = null;
            };
            HoveredRowAdorner.prototype._CellMouseEnter = function (sender, e) {
                this._SetHoverRow(Grid.GetRow(e.Cell));
            };
            HoveredRowAdorner.prototype._CellMouseLeave = function (sender, e) {
                this._SetHoverRow(-1);
            };
            HoveredRowAdorner.prototype._SetHoverRow = function (row) {
                if (this._HoverRow === row)
                    return;
                var oldRow = this._HoverRow;
                this._HoverRow = row;
                this.OnHoverRowChanged(oldRow, row);
            };
            HoveredRowAdorner.prototype.OnHoverRowChanged = function (oldRow, newRow) {
                var el = this._Element;
                var fel = this._ForegroundElement;
                if (el) {
                    el.Visibility = newRow > -1 ? 0 /* Visible */ : 1 /* Collapsed */;
                    Grid.SetRow(el, newRow > -1 ? newRow : 0);
                }
                if (fel) {
                    fel.Visibility = newRow > -1 ? 0 /* Visible */ : 1 /* Collapsed */;
                    Grid.SetRow(fel, newRow > -1 ? newRow : 0);
                }
            };
            HoveredRowAdorner.BackgroundProperty = DependencyProperty.Register("Background", function () { return Fayde.Media.Brush; }, HoveredRowAdorner);
            HoveredRowAdorner.BorderBrushProperty = DependencyProperty.Register("BorderBrush", function () { return Fayde.Media.Brush; }, HoveredRowAdorner);
            HoveredRowAdorner.BorderThicknessProperty = DependencyProperty.Register("BorderThickness", function () { return Thickness; }, HoveredRowAdorner);
            HoveredRowAdorner.CornerRadiusProperty = DependencyProperty.Register("CornerRadius", function () { return CornerRadius; }, HoveredRowAdorner);
            HoveredRowAdorner.CursorProperty = DependencyProperty.Register("Cursor", function () { return new Fayde.Enum(Fayde.CursorType); }, HoveredRowAdorner, 1 /* Hand */);
            return HoveredRowAdorner;
        })(Experimental.Primitives.GridAdorner);
        Experimental.HoveredRowAdorner = HoveredRowAdorner;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="Primitives/GridAdorner.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var Grid = Fayde.Controls.Grid;
        var Border = Fayde.Controls.Border;
        var SelectedRowAdorner = (function (_super) {
            __extends(SelectedRowAdorner, _super);
            function SelectedRowAdorner() {
                _super.apply(this, arguments);
                this._Element = null;
            }
            SelectedRowAdorner.prototype.CreateElement = function () {
                var el = new Border();
                el.IsHitTestVisible = false;
                var binding = new Fayde.Data.Binding("Background");
                binding.Source = this;
                el.SetBinding(Border.BackgroundProperty, binding);
                binding = new Fayde.Data.Binding("BorderBrush");
                binding.Source = this;
                el.SetBinding(Border.BorderBrushProperty, binding);
                binding = new Fayde.Data.Binding("BorderThickness");
                binding.Source = this;
                el.SetBinding(Border.BorderThicknessProperty, binding);
                binding = new Fayde.Data.Binding("CornerRadius");
                binding.Source = this;
                el.SetBinding(Border.CornerRadiusProperty, binding);
                binding = new Fayde.Data.Binding("Cursor");
                binding.Source = this;
                el.SetBinding(Fayde.FrameworkElement.CursorProperty, binding);
                return el;
            };
            SelectedRowAdorner.prototype.OnAttached = function (gic) {
                _super.prototype.OnAttached.call(this, gic);
                var grid = gic.ItemsPresenter.Panel;
                grid.Children.Add(this._Element = this.CreateElement());
                Fayde.Controls.Panel.SetZIndex(this._Element, -5);
                Grid.SetColumnSpan(this._Element, grid.ColumnDefinitions.Count);
                gic.SelectionChanged.on(this._SelectionChanged, this);
                this._Update(undefined, -1);
            };
            SelectedRowAdorner.prototype.OnDetached = function (gic) {
                _super.prototype.OnDetached.call(this, gic);
                gic.SelectionChanged.off(this._SelectionChanged, this);
                var grid = gic.ItemsPresenter.Panel;
                grid.Children.Remove(this._Element);
                this._Element = null;
            };
            SelectedRowAdorner.prototype._SelectionChanged = function (sender, e) {
                this._Update(e.Item, e.Row);
            };
            SelectedRowAdorner.prototype._Update = function (item, row) {
                var el = this._Element;
                if (!el)
                    return;
                el.Visibility = row > -1 ? 0 /* Visible */ : 1 /* Collapsed */;
                Grid.SetRow(el, row > -1 ? row : 0);
            };
            SelectedRowAdorner.BackgroundProperty = DependencyProperty.Register("Background", function () { return Fayde.Media.Brush; }, SelectedRowAdorner);
            SelectedRowAdorner.BorderBrushProperty = DependencyProperty.Register("BorderBrush", function () { return Fayde.Media.Brush; }, SelectedRowAdorner);
            SelectedRowAdorner.BorderThicknessProperty = DependencyProperty.Register("BorderThickness", function () { return Thickness; }, SelectedRowAdorner);
            SelectedRowAdorner.CornerRadiusProperty = DependencyProperty.Register("CornerRadius", function () { return CornerRadius; }, SelectedRowAdorner);
            SelectedRowAdorner.CursorProperty = DependencyProperty.Register("Cursor", function () { return new Fayde.Enum(Fayde.CursorType); }, SelectedRowAdorner, 1 /* Hand */);
            return SelectedRowAdorner;
        })(Experimental.Primitives.GridAdorner);
        Experimental.SelectedRowAdorner = SelectedRowAdorner;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var SelectionChangedEventArgs = (function () {
            function SelectionChangedEventArgs(item, row) {
                Object.defineProperty(this, "Item", { value: item, writable: false });
                Object.defineProperty(this, "Row", { value: row, writable: false });
            }
            return SelectionChangedEventArgs;
        })();
        Experimental.SelectionChangedEventArgs = SelectionChangedEventArgs;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridCell = (function (_super) {
            __extends(GridCell, _super);
            function GridCell() {
                _super.call(this);
                this.DefaultStyleKey = this.constructor;
            }
            GridCell.prototype.OnIsEditingChanged = function (oldIsEditing, newIsEditing) {
                this.UpdateVisualState();
            };
            GridCell.prototype.OnIsEditableChanged = function (oldIsEditable, newIsEditable) {
                this.UpdateVisualState();
            };
            GridCell.prototype.OnApplyTemplate = function () {
                this.UpdateVisualState();
                _super.prototype.OnApplyTemplate.call(this);
            };
            GridCell.prototype.GoToStates = function (gotoFunc) {
                _super.prototype.GoToStates.call(this, gotoFunc);
                this.GoToStateEditing(gotoFunc);
            };
            GridCell.prototype.GoToStateEditing = function (gotoFunc) {
                return gotoFunc(this.IsEditing ? (this.IsEditable ? "Edit" : "NotEditable") : "Display");
            };
            GridCell.IsEditingProperty = DependencyProperty.Register("IsEditing", function () { return Boolean; }, GridCell, false, function (d, args) { return d.OnIsEditingChanged(args.OldValue, args.NewValue); });
            GridCell.IsEditableProperty = DependencyProperty.Register("IsEditable", function () { return Boolean; }, GridCell, false, function (d, args) { return d.OnIsEditableChanged(args.OldValue, args.NewValue); });
            GridCell.EditTemplateProperty = DependencyProperty.Register("EditTemplate", function () { return Fayde.DataTemplate; }, GridCell);
            return GridCell;
        })(Fayde.Controls.ContentControl);
        Experimental.GridCell = GridCell;
        Fayde.Controls.TemplateVisualStates(GridCell, { GroupName: "EditStates", Name: "Display" }, { GroupName: "EditStates", Name: "Edit" }, { GroupName: "EditStates", Name: "NotEditable" });
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridCell.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridInputCell = (function (_super) {
            __extends(GridInputCell, _super);
            function GridInputCell() {
                _super.apply(this, arguments);
                this._Presenter = null;
                this._Editor = null;
            }
            GridInputCell.prototype.OnDisplayPropertyChanged = function (oldProperty, newProperty) {
                this.UpdateDisplayMember();
            };
            GridInputCell.prototype.OnEditPropertyChanged = function (oldProperty, newProperty) {
                this.UpdateDisplayMember();
            };
            GridInputCell.prototype.OnDisplayMemberPathChanged = function (oldPath, newPath) {
                this.UpdateDisplayMember();
            };
            GridInputCell.prototype.OnConverterChanged = function (oldConverter, newConverter) {
                this.UpdateDisplayMember();
            };
            GridInputCell.prototype.OnStringFormatChanged = function (oldFormat, newFormat) {
                this.UpdateDisplayMember();
            };
            GridInputCell.prototype.OnIsEditableChanged = function (oldIsEditable, newIsEditable) {
                _super.prototype.OnIsEditableChanged.call(this, oldIsEditable, newIsEditable);
                this.UpdateDisplayMember();
            };
            GridInputCell.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                this._Presenter = this.GetTemplateChild("Presenter", Fayde.FrameworkElement);
                this._Editor = this.GetTemplateChild("Editor", Fayde.FrameworkElement);
                this.UpdateDisplayMember();
            };
            GridInputCell.prototype.UpdateDisplayMember = function () {
                var binding;
                var path = this.DisplayMemberPath;
                var propd;
                if (this._Presenter) {
                    binding = new Fayde.Data.Binding(path);
                    binding.Converter = this.Converter;
                    binding.StringFormat = this.StringFormat;
                    propd = DependencyProperty.GetDependencyProperty(this._Presenter.constructor, this.DisplayProperty);
                    this._Presenter.SetBinding(propd, binding);
                }
                if (this.IsEditable && this._Editor) {
                    if (!path)
                        throw new ArgumentException("DisplayMemberPath cannot be null for editable GridInputCell");
                    binding = new Fayde.Data.Binding(path);
                    binding.UpdateSourceTrigger = 1 /* PropertyChanged */;
                    binding.Mode = 1 /* TwoWay */;
                    binding.Converter = this.Converter;
                    propd = DependencyProperty.GetDependencyProperty(this._Editor.constructor, this.EditProperty);
                    this._Editor.SetBinding(propd, binding);
                }
            };
            GridInputCell.DisplayPropertyProperty = DependencyProperty.Register("DisplayProperty", function () { return String; }, GridInputCell, "Text");
            GridInputCell.EditPropertyProperty = DependencyProperty.Register("EditProperty", function () { return String; }, GridInputCell, "Text");
            GridInputCell.DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", function () { return String; }, GridInputCell, undefined, function (d, args) { return d.OnDisplayMemberPathChanged(args.OldValue, args.NewValue); });
            GridInputCell.ConverterProperty = DependencyProperty.Register("Converter", function () { return Fayde.Data.IValueConverter_; }, GridInputCell);
            GridInputCell.StringFormatProperty = DependencyProperty.Register("StringFormat", function () { return String; }, GridInputCell);
            return GridInputCell;
        })(Experimental.GridCell);
        Experimental.GridInputCell = GridInputCell;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridInputCell.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridDateCell = (function (_super) {
            __extends(GridDateCell, _super);
            function GridDateCell() {
                _super.call(this);
                this.DefaultStyleKey = this.constructor;
            }
            return GridDateCell;
        })(Experimental.GridInputCell);
        Experimental.GridDateCell = GridDateCell;
        Fayde.Controls.TemplateParts(GridDateCell, { Name: "Presenter", Type: Fayde.FrameworkElement }, { Name: "Editor", Type: Fayde.FrameworkElement });
        Fayde.Controls.TemplateVisualStates(GridDateCell, { GroupName: "EditStates", Name: "Display" }, { GroupName: "EditStates", Name: "Edit" }, { GroupName: "EditStates", Name: "NotEditable" });
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridHeaderCell = (function (_super) {
            __extends(GridHeaderCell, _super);
            function GridHeaderCell() {
                _super.call(this);
                this.DefaultStyleKey = this.constructor;
            }
            return GridHeaderCell;
        })(Fayde.Controls.ContentControl);
        Experimental.GridHeaderCell = GridHeaderCell;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridInputCell.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridNumericCell = (function (_super) {
            __extends(GridNumericCell, _super);
            function GridNumericCell() {
                _super.call(this);
                this.DefaultStyleKey = this.constructor;
                this.EditProperty = "Value";
            }
            return GridNumericCell;
        })(Experimental.GridInputCell);
        Experimental.GridNumericCell = GridNumericCell;
        Fayde.Controls.TemplateParts(GridNumericCell, { Name: "Presenter", Type: Fayde.FrameworkElement }, { Name: "Editor", Type: Fayde.FrameworkElement });
        Fayde.Controls.TemplateVisualStates(GridNumericCell, { GroupName: "EditStates", Name: "Display" }, { GroupName: "EditStates", Name: "Edit" }, { GroupName: "EditStates", Name: "NotEditable" });
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridInputCell.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridTextCell = (function (_super) {
            __extends(GridTextCell, _super);
            function GridTextCell() {
                _super.call(this);
                this.DefaultStyleKey = this.constructor;
            }
            return GridTextCell;
        })(Experimental.GridInputCell);
        Experimental.GridTextCell = GridTextCell;
        Fayde.Controls.TemplateParts(GridTextCell, { Name: "Presenter", Type: Fayde.FrameworkElement }, { Name: "Editor", Type: Fayde.FrameworkElement });
        Fayde.Controls.TemplateVisualStates(GridTextCell, { GroupName: "EditStates", Name: "Display" }, { GroupName: "EditStates", Name: "Edit" }, { GroupName: "EditStates", Name: "NotEditable" });
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridInputCell.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridTimeCell = (function (_super) {
            __extends(GridTimeCell, _super);
            function GridTimeCell() {
                _super.call(this);
                this.DefaultStyleKey = this.constructor;
            }
            return GridTimeCell;
        })(Experimental.GridInputCell);
        Experimental.GridTimeCell = GridTimeCell;
        Fayde.Controls.TemplateParts(Experimental.GridDateCell, { Name: "Presenter", Type: Fayde.FrameworkElement }, { Name: "Editor", Type: Fayde.FrameworkElement });
        Fayde.Controls.TemplateVisualStates(Experimental.GridDateCell, { GroupName: "EditStates", Name: "Display" }, { GroupName: "EditStates", Name: "Edit" }, { GroupName: "EditStates", Name: "NotEditable" });
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="../Internal/ItemChangedCollection.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridLength = Fayde.Controls.GridLength;
        var ColumnDefinition = Fayde.Controls.ColumnDefinition;
        var ContentControl = Fayde.Controls.ContentControl;
        var GridColumn = (function (_super) {
            __extends(GridColumn, _super);
            function GridColumn() {
                _super.apply(this, arguments);
                this._Definition = null;
                this._ActualWidthListener = null;
            }
            GridColumn.prototype.GetContainerForCell = function (item) {
                return new Experimental.GridCell();
            };
            GridColumn.prototype.PrepareContainerForCell = function (cell, item) {
                var binding;
                if (cell instanceof Fayde.FrameworkElement) {
                    binding = new Fayde.Data.Binding("CellStyle");
                    binding.Source = this;
                    cell.SetBinding(Fayde.FrameworkElement.StyleProperty, binding);
                }
                if (cell instanceof ContentControl) {
                    binding = new Fayde.Data.Binding("Source");
                    binding.Source = this;
                    //TODO: Use FallbackValue when fixed
                    binding.Converter = {
                        Convert: function (value, targetType, parameter, culture) {
                            if (value === undefined)
                                return item;
                            return value;
                        },
                        ConvertBack: function (value, targetType, parameter, culture) {
                            return value;
                        }
                    };
                    cell.SetBinding(ContentControl.ContentProperty, binding);
                }
                if (cell instanceof Experimental.GridCell) {
                    binding = new Fayde.Data.Binding("IsEditable");
                    binding.Source = this;
                    cell.SetBinding(Experimental.GridCell.IsEditableProperty, binding);
                }
            };
            GridColumn.prototype.ClearContainerForCell = function (cell, item) {
                if (cell instanceof Fayde.FrameworkElement) {
                    cell.ClearValue(Fayde.FrameworkElement.StyleProperty);
                }
                if (cell instanceof ContentControl) {
                    cell.ClearValue(ContentControl.ContentProperty);
                }
                if (cell instanceof Experimental.GridCell) {
                    cell.ClearValue(Experimental.GridCell.IsEditableProperty);
                }
            };
            GridColumn.prototype.AttachToDefinition = function (coldef) {
                this._Definition = coldef;
                if (!coldef)
                    return;
                var binding = new Fayde.Data.Binding("Width");
                binding.Source = this;
                binding.Mode = 0 /* OneWay */;
                binding.Converter = new EmptyWidthConverter();
                coldef.SetBinding(ColumnDefinition.WidthProperty, binding);
                binding = new Fayde.Data.Binding("MaxWidth");
                binding.Source = this;
                binding.Mode = 0 /* OneWay */;
                coldef.SetBinding(ColumnDefinition.MaxWidthProperty, binding);
                binding = new Fayde.Data.Binding("MinWidth");
                binding.Source = this;
                binding.Mode = 0 /* OneWay */;
                coldef.SetBinding(ColumnDefinition.MinWidthProperty, binding);
                this._ActualWidthListener = ColumnDefinition.ActualWidthProperty.Store.ListenToChanged(coldef, ColumnDefinition.ActualWidthProperty, this._OnActualWidthChanged, this);
            };
            GridColumn.prototype._OnActualWidthChanged = function (sender, args) {
                this.SetCurrentValue(ColumnDefinition.ActualWidthProperty, args.NewValue);
            };
            GridColumn.prototype.DetachDefinition = function () {
                var awl = this._ActualWidthListener;
                var coldef = this._Definition;
                this._ActualWidthListener = null;
                this._Definition = null;
                if (awl)
                    awl.Detach();
                if (coldef) {
                    coldef.ClearValue(ColumnDefinition.WidthProperty);
                    coldef.ClearValue(ColumnDefinition.MaxWidthProperty);
                    coldef.ClearValue(ColumnDefinition.MinWidthProperty);
                }
            };
            GridColumn.WidthProperty = DependencyProperty.Register("Width", function () { return GridLength; }, GridColumn);
            GridColumn.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () { return Number; }, GridColumn, Number.POSITIVE_INFINITY);
            GridColumn.MinWidthProperty = DependencyProperty.Register("MinWidth", function () { return Number; }, GridColumn, 0.0);
            GridColumn.ActualWidthProperty = DependencyProperty.RegisterReadOnly("ActualWidth", function () { return Number; }, GridColumn, 0.0);
            GridColumn.CellStyleProperty = DependencyProperty.Register("CellStyle", function () { return Fayde.Style; }, GridColumn);
            GridColumn.SourceProperty = DependencyProperty.Register("Source", function () { return Fayde.Data.Binding; }, GridColumn);
            GridColumn.IsEditableProperty = DependencyProperty.Register("IsEditable", function () { return Boolean; }, GridColumn, false);
            return GridColumn;
        })(Fayde.DependencyObject);
        Experimental.GridColumn = GridColumn;
        var GridColumnCollection = (function (_super) {
            __extends(GridColumnCollection, _super);
            function GridColumnCollection() {
                _super.apply(this, arguments);
            }
            return GridColumnCollection;
        })(Experimental.Internal.ItemChangedCollection);
        Experimental.GridColumnCollection = GridColumnCollection;
        var EmptyWidthConverter = (function () {
            function EmptyWidthConverter() {
            }
            EmptyWidthConverter.prototype.Convert = function (value, targetType, parameter, culture) {
                if (!value)
                    return "auto";
                return value;
            };
            EmptyWidthConverter.prototype.ConvertBack = function (value, targetType, parameter, culture) {
            };
            return EmptyWidthConverter;
        })();
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridColumn.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridInputColumn = (function (_super) {
            __extends(GridInputColumn, _super);
            function GridInputColumn() {
                _super.apply(this, arguments);
            }
            GridInputColumn.prototype.PrepareContainerForCell = function (cell, item) {
                _super.prototype.PrepareContainerForCell.call(this, cell, item);
                var binding;
                if (cell instanceof Experimental.GridInputCell) {
                    binding = new Fayde.Data.Binding("DisplayMemberPath");
                    binding.Source = this;
                    cell.SetBinding(Experimental.GridInputCell.DisplayMemberPathProperty, binding);
                    binding = new Fayde.Data.Binding("Converter");
                    binding.Source = this;
                    cell.SetBinding(Experimental.GridInputCell.ConverterProperty, binding);
                    binding = new Fayde.Data.Binding("StringFormat");
                    binding.Source = this;
                    cell.SetBinding(Experimental.GridInputCell.StringFormatProperty, binding);
                }
            };
            GridInputColumn.prototype.ClearContainerForCell = function (cell, item) {
                _super.prototype.ClearContainerForCell.call(this, cell, item);
                if (cell instanceof Experimental.GridInputCell) {
                    cell.ClearValue(Experimental.GridInputCell.DisplayMemberPathProperty);
                    cell.ClearValue(Experimental.GridInputCell.ConverterProperty);
                    cell.ClearValue(Experimental.GridInputCell.StringFormatProperty);
                }
            };
            GridInputColumn.DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", function () { return String; }, GridInputColumn);
            GridInputColumn.ConverterProperty = DependencyProperty.Register("Converter", function () { return Fayde.Data.IValueConverter_; }, GridInputColumn);
            GridInputColumn.StringFormatProperty = DependencyProperty.Register("StringFormat", function () { return String; }, GridInputColumn);
            return GridInputColumn;
        })(Experimental.GridColumn);
        Experimental.GridInputColumn = GridInputColumn;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridInputColumn.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridDateColumn = (function (_super) {
            __extends(GridDateColumn, _super);
            function GridDateColumn() {
                _super.apply(this, arguments);
            }
            GridDateColumn.prototype.GetContainerForCell = function (item) {
                return new Experimental.GridDateCell();
            };
            return GridDateColumn;
        })(Experimental.GridInputColumn);
        Experimental.GridDateColumn = GridDateColumn;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridInputColumn.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridNumericColumn = (function (_super) {
            __extends(GridNumericColumn, _super);
            function GridNumericColumn() {
                _super.apply(this, arguments);
            }
            GridNumericColumn.prototype.GetContainerForCell = function (item) {
                return new Experimental.GridNumericCell();
            };
            return GridNumericColumn;
        })(Experimental.GridInputColumn);
        Experimental.GridNumericColumn = GridNumericColumn;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridColumn.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var ContentControl = Fayde.Controls.ContentControl;
        var GridTemplateColumn = (function (_super) {
            __extends(GridTemplateColumn, _super);
            function GridTemplateColumn() {
                _super.apply(this, arguments);
            }
            GridTemplateColumn.prototype.PrepareContainerForCell = function (cell, item) {
                _super.prototype.PrepareContainerForCell.call(this, cell, item);
                var binding;
                if (cell instanceof ContentControl) {
                    binding = new Fayde.Data.Binding("DisplayTemplate");
                    binding.Source = this;
                    cell.SetBinding(ContentControl.ContentTemplateProperty, binding);
                }
                if (cell instanceof Experimental.GridCell) {
                    binding = new Fayde.Data.Binding("EditTemplate");
                    binding.Source = this;
                    cell.SetBinding(Experimental.GridCell.EditTemplateProperty, binding);
                }
            };
            GridTemplateColumn.prototype.ClearContainerForCell = function (cell, item) {
                _super.prototype.ClearContainerForCell.call(this, cell, item);
                if (cell instanceof ContentControl) {
                    cell.ClearValue(ContentControl.ContentTemplateProperty);
                }
                if (cell instanceof Experimental.GridCell) {
                    cell.ClearValue(Experimental.GridCell.EditTemplateProperty);
                }
            };
            GridTemplateColumn.DisplayTemplateProperty = DependencyProperty.Register("DisplayTemplate", function () { return Fayde.DataTemplate; }, GridTemplateColumn);
            GridTemplateColumn.EditTemplateProperty = DependencyProperty.Register("EditTemplate", function () { return Fayde.DataTemplate; }, GridTemplateColumn);
            return GridTemplateColumn;
        })(Experimental.GridColumn);
        Experimental.GridTemplateColumn = GridTemplateColumn;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridInputColumn.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridTextColumn = (function (_super) {
            __extends(GridTextColumn, _super);
            function GridTextColumn() {
                _super.apply(this, arguments);
            }
            GridTextColumn.prototype.GetContainerForCell = function (item) {
                return new Experimental.GridTextCell();
            };
            return GridTextColumn;
        })(Experimental.GridInputColumn);
        Experimental.GridTextColumn = GridTextColumn;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
/// <reference path="GridInputColumn.ts" />
var Fayde;
(function (Fayde) {
    var Experimental;
    (function (Experimental) {
        var GridTimeColumn = (function (_super) {
            __extends(GridTimeColumn, _super);
            function GridTimeColumn() {
                _super.apply(this, arguments);
            }
            GridTimeColumn.prototype.GetContainerForCell = function (item) {
                return new Experimental.GridTimeCell();
            };
            return GridTimeColumn;
        })(Experimental.GridInputColumn);
        Experimental.GridTimeColumn = GridTimeColumn;
    })(Experimental = Fayde.Experimental || (Fayde.Experimental = {}));
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Fayde.Experimental.js.map