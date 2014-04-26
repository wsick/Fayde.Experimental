var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Experimental) {
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

                this.InitSelection(presenter.Panel);

                var gic = this.XObject;
                for (var i = 0, adorners = gic.Adorners.ToArray(), len = adorners.length; i < len; i++) {
                    adorners[i].OnAttached(gic);
                }
            };

            GridItemsControlNode.prototype.InitSelection = function (grid) {
                grid.MouseLeftButtonDown.Subscribe(this._MouseLeftButtonDown, this);
            };
            GridItemsControlNode.prototype._MouseLeftButtonDown = function (sender, e) {
                var grid = sender;
                var pos = e.GetPosition(grid);
                var col = getCol(pos.X, grid);
                var row = getRow(pos.Y, grid);
                var xobj = this.XObject;
                xobj.SetCurrentValue(GridItemsControl.SelectedRowProperty, row);
            };
            return GridItemsControlNode;
        })(Fayde.Controls.ControlNode);
        Experimental.GridItemsControlNode = GridItemsControlNode;

        var GridItemsControl = (function (_super) {
            __extends(GridItemsControl, _super);
            function GridItemsControl() {
                _super.call(this);
                this.SelectionChanged = new MulticastEvent();
                this._IsCoercing = false;
                this._Items = [];
                this.DefaultStyleKey = this.constructor;

                var cols = GridItemsControl.ColumnsProperty.Initialize(this);
                cols.CollectionChanged.Subscribe(this._ColumnsChanged, this);
                cols.ItemChanged.Subscribe(this._ColumnChanged, this);

                var ads = GridItemsControl.AdornersProperty.Initialize(this);
                ads.CollectionChanged.Subscribe(this._AdornersChanged, this);
            }
            GridItemsControl.prototype.CreateNode = function () {
                return new GridItemsControlNode(this);
            };

            Object.defineProperty(GridItemsControl.prototype, "ItemsPresenter", {
                get: function () {
                    return this.XamlNode.ItemsPresenter;
                },
                enumerable: true,
                configurable: true
            });

            GridItemsControl.prototype.OnSelectionChanged = function () {
                this.SelectionChanged.Raise(this, new Experimental.SelectionChangedEventArgs(this.SelectedItem, this.SelectedRow));
            };

            GridItemsControl.prototype.OnItemsSourceChanged = function (oldItemsSource, newItemsSource) {
                var nc = Fayde.Collections.INotifyCollectionChanged_.As(oldItemsSource);
                if (nc)
                    nc.CollectionChanged.Unsubscribe(this._OnItemsSourceUpdated, this);
                if (oldItemsSource)
                    this._RemoveItems(0, this._Items);
                if (newItemsSource)
                    this._AddItems(0, Fayde.Enumerable.ToArray(newItemsSource));
                var nc = Fayde.Collections.INotifyCollectionChanged_.As(newItemsSource);
                if (nc)
                    nc.CollectionChanged.Subscribe(this._OnItemsSourceUpdated, this);
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
                if (this._IsCoercing)
                    return;
                try  {
                    this._IsCoercing = true;
                    this.SetCurrentValue(GridItemsControl.SelectedRowProperty, this._Items.indexOf(newItem));
                } finally {
                    this._IsCoercing = false;
                }
                this.OnSelectionChanged();
            };
            GridItemsControl.prototype.OnSelectedRowChanged = function (oldRow, newRow) {
                if (this._IsCoercing)
                    return;
                try  {
                    this._IsCoercing = true;
                    this.SetCurrentValue(GridItemsControl.SelectedItemProperty, (newRow > -1 && newRow < this._Items.length) ? this._Items[newRow] : undefined);
                } finally {
                    this._IsCoercing = false;
                }
                this.OnSelectionChanged();
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

            GridItemsControl.prototype.OnItemsAdded = function (index, newItems) {
                var presenter = this.XamlNode.ItemsPresenter;
                if (presenter)
                    presenter.OnItemsAdded(index, newItems);
                var item = this.SelectedItem;
                var row = this.SelectedRow;
                if (item === undefined && row > -1) {
                    this.SetCurrentValue(GridItemsControl.SelectedItemProperty, this._Items[row]);
                } else if (item !== undefined && row < 0) {
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
                } else if (row > -1 && (row >= index && row < (index + oldItems.length))) {
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
            GridItemsControl.ItemsSourceProperty = DependencyProperty.Register("ItemsSource", function () {
                return Fayde.IEnumerable_;
            }, GridItemsControl, null, function (d, args) {
                return d.OnItemsSourceChanged(args.OldValue, args.NewValue);
            });
            GridItemsControl.ColumnsProperty = DependencyProperty.RegisterImmutable("Columns", function () {
                return Experimental.GridColumnCollection;
            }, GridItemsControl);
            GridItemsControl.AdornersProperty = DependencyProperty.RegisterImmutable("Adorners", function () {
                return Experimental.Primitives.GridAdornerCollection;
            }, GridItemsControl);
            GridItemsControl.SelectedItemProperty = DependencyProperty.Register("SelectedItem", function () {
                return Object;
            }, GridItemsControl, undefined, function (d, args) {
                return d.OnSelectedItemChanged(args.OldValue, args.NewValue);
            });
            GridItemsControl.SelectedRowProperty = DependencyProperty.Register("SelectedRow", function () {
                return Number;
            }, GridItemsControl, -1, function (d, args) {
                return d.OnSelectedRowChanged(args.OldValue, args.NewValue);
            });
            return GridItemsControl;
        })(Fayde.Controls.Control);
        Experimental.GridItemsControl = GridItemsControl;
        Fayde.Xaml.Content(GridItemsControl, GridItemsControl.ColumnsProperty);

        function getCol(posX, grid) {
            if (posX < 0)
                return i;
            for (var i = 0, enumerator = grid.ColumnDefinitions.GetEnumerator(); posX > 0 && enumerator.MoveNext(); i++) {
                posX -= enumerator.Current.ActualWidth;
                if (posX < 0)
                    return i;
            }
            return -1;
        }
        function getRow(posY, grid) {
            if (posY < 0)
                return i;
            for (var i = 0, enumerator = grid.RowDefinitions.GetEnumerator(); posY > 0 && enumerator.MoveNext(); i++) {
                posY -= enumerator.Current.ActualHeight;
                if (posY < 0)
                    return i;
            }
            return -1;
        }
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
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
                this._CellContainers = [];
                this._Columns = [];
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
                    newColumn.PrepareContainerForCell(container, item);
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
                        col.ClearContainerForCell(container, items[i]);
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
                            cols[j].ClearContainerForCell(container, items[i]);
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
                    col.PrepareContainerForCell(containers[i][colindex], items[i]);
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
                        col.PrepareContainerForCell(container, item);
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
                        cols[j].ClearContainerForCell(cell, oldItems[i]);
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
            return GridItemsPresenter;
        })(Fayde.FrameworkElement);
        Experimental.GridItemsPresenter = GridItemsPresenter;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridCell = (function (_super) {
            __extends(GridCell, _super);
            function GridCell() {
                _super.call(this);
                this.DefaultStyleKey = this.constructor;
            }
            GridCell.prototype.OnIsEditingChanged = function (oldIsEditing, newIsEditing) {
            };
            GridCell.IsEditingProperty = DependencyProperty.Register("IsEditing", function () {
                return Boolean;
            }, GridCell, false, function (d, args) {
                return d.OnIsEditingChanged(args.OldValue, args.NewValue);
            });
            return GridCell;
        })(Fayde.Controls.ContentControl);
        Experimental.GridCell = GridCell;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        (function (Internal) {
            var ItemChangedCollection = (function (_super) {
                __extends(ItemChangedCollection, _super);
                function ItemChangedCollection() {
                    _super.apply(this, arguments);
                    this.ItemChanged = new MulticastEvent();
                    this.CollectionChanged = new MulticastEvent();
                }
                ItemChangedCollection.prototype._RaiseItemAdded = function (value, index) {
                    this.CollectionChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Add(value, index));
                };
                ItemChangedCollection.prototype._RaiseItemRemoved = function (value, index) {
                    this.CollectionChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Remove(value, index));
                };
                ItemChangedCollection.prototype._RaiseItemReplaced = function (removed, added, index) {
                    this.CollectionChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Replace(added, removed, index));
                };
                ItemChangedCollection.prototype._RaiseCleared = function (old) {
                    this.CollectionChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Reset(old));
                };
                return ItemChangedCollection;
            })(Fayde.XamlObjectCollection);
            Internal.ItemChangedCollection = ItemChangedCollection;

            var ItemChangedEventArgs = (function (_super) {
                __extends(ItemChangedEventArgs, _super);
                function ItemChangedEventArgs(t) {
                    _super.call(this);
                    Object.defineProperty(this, "Item", { value: t, writable: false });
                }
                return ItemChangedEventArgs;
            })(EventArgs);
            Internal.ItemChangedEventArgs = ItemChangedEventArgs;
        })(Experimental.Internal || (Experimental.Internal = {}));
        var Internal = Experimental.Internal;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
/// <reference path="Internal/ItemChangedCollection.ts" />
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridLength = Fayde.Controls.GridLength;
        var ColumnDefinition = Fayde.Controls.ColumnDefinition;

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
                var gc = cell;
                if (gc instanceof Experimental.GridCell) {
                    var binding = new Fayde.Data.Binding("CellStyle");
                    binding.Source = this;
                    binding.Mode = 1 /* OneWay */;
                    gc.SetBinding(Fayde.FrameworkElement.StyleProperty, binding);
                }
            };
            GridColumn.prototype.ClearContainerForCell = function (cell, item) {
                var gc = cell;
                if (gc instanceof Experimental.GridCell)
                    gc.ClearValue(Fayde.FrameworkElement.StyleProperty);
            };

            GridColumn.prototype.AttachToDefinition = function (coldef) {
                this._Definition = coldef;
                if (!coldef)
                    return;

                var binding = new Fayde.Data.Binding("Width");
                binding.Source = this;
                binding.Mode = 1 /* OneWay */;
                binding.Converter = new EmptyWidthConverter();
                coldef.SetBinding(ColumnDefinition.WidthProperty, binding);

                binding = new Fayde.Data.Binding("MaxWidth");
                binding.Source = this;
                binding.Mode = 1 /* OneWay */;
                coldef.SetBinding(ColumnDefinition.MaxWidthProperty, binding);

                binding = new Fayde.Data.Binding("MinWidth");
                binding.Source = this;
                binding.Mode = 1 /* OneWay */;
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
            GridColumn.WidthProperty = DependencyProperty.Register("Width", function () {
                return GridLength;
            }, GridColumn);
            GridColumn.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () {
                return Number;
            }, GridColumn, Number.POSITIVE_INFINITY);
            GridColumn.MinWidthProperty = DependencyProperty.Register("MinWidth", function () {
                return Number;
            }, GridColumn, 0.0);
            GridColumn.ActualWidthProperty = DependencyProperty.RegisterReadOnly("ActualWidth", function () {
                return Number;
            }, GridColumn, 0.0);
            GridColumn.CellStyleProperty = DependencyProperty.Register("CellStyle", function () {
                return Fayde.Style;
            }, GridColumn);
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
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridColumnChangedEventArgs = (function (_super) {
            __extends(GridColumnChangedEventArgs, _super);
            function GridColumnChangedEventArgs(col) {
                _super.call(this);
                Object.defineProperty(this, "GridColumn", { value: col, writable: false });
            }
            return GridColumnChangedEventArgs;
        })(EventArgs);
        Experimental.GridColumnChangedEventArgs = GridColumnChangedEventArgs;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
/// <reference path="GridColumn.ts" />
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridTextColumn = (function (_super) {
            __extends(GridTextColumn, _super);
            function GridTextColumn() {
                _super.apply(this, arguments);
            }
            GridTextColumn.prototype.OnBindingChanged = function (args) {
                var gcc = this.Parent;
                if (gcc instanceof Experimental.GridColumnCollection)
                    gcc.ItemChanged.Raise(gcc, new Experimental.Internal.ItemChangedEventArgs(this));
            };

            GridTextColumn.prototype.PrepareContainerForCell = function (cell, item) {
                _super.prototype.PrepareContainerForCell.call(this, cell, item);
                var gc = cell;
                if (gc instanceof Experimental.GridCell) {
                    var binding = this.Binding;
                    if (binding) {
                        binding = binding.Clone();
                        if (!binding.RelativeSource && !binding.ElementName && !binding.Source)
                            binding.Source = item;
                        gc.SetBinding(Fayde.Controls.ContentControl.ContentProperty, binding);
                    }
                }
            };
            GridTextColumn.prototype.ClearContainerForCell = function (cell, item) {
                _super.prototype.ClearContainerForCell.call(this, cell, item);
                var gc = cell;
                if (gc instanceof Experimental.GridCell)
                    gc.ClearValue(Fayde.Controls.ContentControl.ContentProperty);
            };
            GridTextColumn.BindingProperty = DependencyProperty.Register("Binding", function () {
                return Fayde.Data.Binding;
            }, GridTextColumn, undefined, function (d, args) {
                return d.OnBindingChanged(args);
            });
            return GridTextColumn;
        })(Experimental.GridColumn);
        Experimental.GridTextColumn = GridTextColumn;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
/// <reference path="GridColumn.ts" />
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridTemplateColumn = (function (_super) {
            __extends(GridTemplateColumn, _super);
            function GridTemplateColumn() {
                _super.apply(this, arguments);
            }
            GridTemplateColumn.prototype.PrepareContainerForCell = function (cell, item) {
                _super.prototype.PrepareContainerForCell.call(this, cell, item);
                var gc = cell;
                if (gc instanceof Experimental.GridCell) {
                    var binding = new Fayde.Data.Binding();
                    binding.Source = item;
                    gc.SetBinding(Fayde.Controls.ContentControl.ContentProperty, binding);

                    binding = new Fayde.Data.Binding("CellTemplate");
                    binding.Source = this;
                    gc.SetBinding(Fayde.Controls.ContentControl.ContentTemplateProperty, binding);
                }
            };
            GridTemplateColumn.prototype.ClearContainerForCell = function (cell, item) {
                _super.prototype.ClearContainerForCell.call(this, cell, item);
                var gc = cell;
                if (gc instanceof Experimental.GridCell) {
                    gc.ClearValue(Fayde.Controls.ContentControl.ContentProperty);
                    gc.ClearValue(Fayde.Controls.ContentControl.ContentTemplateProperty);
                }
            };
            GridTemplateColumn.CellTemplateProperty = DependencyProperty.Register("CellTemplate", function () {
                return Fayde.DataTemplate;
            }, GridTemplateColumn);
            return GridTemplateColumn;
        })(Experimental.GridColumn);
        Experimental.GridTemplateColumn = GridTemplateColumn;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
/// <reference path="Internal/ItemChangedCollection.ts" />
var Fayde;
(function (Fayde) {
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
                    binding.Mode = 1 /* OneWay */;
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
            GridHeader.HeaderProperty = DependencyProperty.Register("Header", function () {
                return Object;
            }, GridHeader);
            GridHeader.HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", function () {
                return Fayde.DataTemplate;
            }, GridHeader);
            GridHeader.HeaderStyleProperty = DependencyProperty.Register("HeaderStyle", function () {
                return Fayde.Style;
            }, GridHeader);
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
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
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
                coll.CollectionChanged.Subscribe(this._HeadersChanged, this);
                coll.ItemChanged.Subscribe(this._HeaderChanged, this);
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
            GridHeadersControl.ItemsControlProperty = DependencyProperty.Register("ItemsControl", function () {
                return Experimental.GridItemsControl;
            }, GridHeadersControl, undefined, function (d, args) {
                return d.OnItemsControlChanged(args);
            });

            GridHeadersControl.HeadersProperty = DependencyProperty.RegisterImmutable("Headers", function () {
                return Experimental.GridHeaderCollection;
            }, GridHeadersControl);
            return GridHeadersControl;
        })(Fayde.Controls.Control);
        Experimental.GridHeadersControl = GridHeadersControl;
        Fayde.Xaml.Content(GridHeadersControl, GridHeadersControl.HeadersProperty);
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridHeaderChangedEventArgs = (function (_super) {
            __extends(GridHeaderChangedEventArgs, _super);
            function GridHeaderChangedEventArgs(header) {
                _super.call(this);
                Object.defineProperty(this, "GridHeader", { value: header, writable: false });
            }
            return GridHeaderChangedEventArgs;
        })(EventArgs);
        Experimental.GridHeaderChangedEventArgs = GridHeaderChangedEventArgs;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
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
                gic.XamlNode.ListenForPresenterCreated(function (presenter) {
                    return _this.FinishLinkControl(presenter);
                });
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
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var ColumnDefinition = Fayde.Controls.ColumnDefinition;
        var GridLength = Fayde.Controls.GridLength;
        var GridUnitType = Fayde.Controls.GridUnitType;

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
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
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
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
/// <reference path="../Internal/ItemChangedCollection.ts" />
var Fayde;
(function (Fayde) {
    (function (Experimental) {
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
        })(Experimental.Primitives || (Experimental.Primitives = {}));
        var Primitives = Experimental.Primitives;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
/// <reference path="Primitives/GridAdorner.ts" />
var Fayde;
(function (Fayde) {
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
                this._InGrid = false;
            }
            HoveredRowAdorner.prototype.CreateBackgroundElement = function () {
                var el = new Border();

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
                el.Background = new Fayde.Media.SolidColorBrush(Color.KnownColors.Transparent);

                var binding = new Fayde.Data.Binding("Cursor");
                binding.Source = this;
                el.SetBinding(Fayde.FrameworkElement.CursorProperty, binding);

                Fayde.Controls.Panel.SetZIndex(el, 10);

                return el;
            };

            HoveredRowAdorner.prototype.OnAttached = function (gic) {
                _super.prototype.OnAttached.call(this, gic);
                var grid = gic.ItemsPresenter.Panel;
                grid.Children.Add(this._Element = this.CreateBackgroundElement());
                Grid.SetColumnSpan(this._Element, grid.ColumnDefinitions.Count);
                grid.Children.Add(this._ForegroundElement = this.CreateForegroundElement());
                Grid.SetColumnSpan(this._ForegroundElement, grid.ColumnDefinitions.Count);
                grid.MouseMove.Subscribe(this._MouseMove, this);
                grid.MouseEnter.Subscribe(this._MouseEnter, this);
                grid.MouseLeave.Subscribe(this._MouseLeave, this);
                this.OnHoverRowChanged(-1, -1);
            };
            HoveredRowAdorner.prototype.OnDetached = function (gic) {
                _super.prototype.OnDetached.call(this, gic);
                var grid = gic.ItemsPresenter.Panel;
                grid.MouseMove.Unsubscribe(this._MouseMove, this);
                grid.MouseEnter.Unsubscribe(this._MouseEnter, this);
                grid.MouseLeave.Unsubscribe(this._MouseLeave, this);
                grid.Children.Remove(this._Element);
                grid.Children.Remove(this._ForegroundElement);
                this._Element = null;
                this._ForegroundElement = null;
            };
            HoveredRowAdorner.prototype._MouseMove = function (sender, e) {
                var grid = sender;
                var pos = e.GetPosition(grid);
                this._SetHoverRow(isInGrid(pos.X, grid) ? getRow(pos.Y, grid) : -1);
            };
            HoveredRowAdorner.prototype._MouseEnter = function (sender, e) {
                this._InGrid = true;
                var grid = sender;
                var pos = e.GetPosition(grid);
                this._SetHoverRow(isInGrid(pos.X, grid) ? getRow(pos.Y, grid) : -1);
            };
            HoveredRowAdorner.prototype._MouseLeave = function (sender, e) {
                this._InGrid = false;
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
            HoveredRowAdorner.BackgroundProperty = DependencyProperty.Register("Background", function () {
                return Fayde.Media.Brush;
            }, HoveredRowAdorner);
            HoveredRowAdorner.BorderBrushProperty = DependencyProperty.Register("BorderBrush", function () {
                return Fayde.Media.Brush;
            }, HoveredRowAdorner);
            HoveredRowAdorner.BorderThicknessProperty = DependencyProperty.Register("BorderThickness", function () {
                return Thickness;
            }, HoveredRowAdorner);
            HoveredRowAdorner.CornerRadiusProperty = DependencyProperty.Register("CornerRadius", function () {
                return CornerRadius;
            }, HoveredRowAdorner);
            HoveredRowAdorner.CursorProperty = DependencyProperty.Register("Cursor", function () {
                return new Enum(Fayde.CursorType);
            }, HoveredRowAdorner, 1 /* Hand */);
            return HoveredRowAdorner;
        })(Experimental.Primitives.GridAdorner);
        Experimental.HoveredRowAdorner = HoveredRowAdorner;

        function isInGrid(posX, grid) {
            if (posX < 0 || posX >= grid.ActualWidth)
                return false;
            for (var enumerator = grid.ColumnDefinitions.GetEnumerator(); enumerator.MoveNext();) {
                posX -= enumerator.Current.ActualWidth;
                if (posX < 0)
                    return true;
            }
            return false;
        }
        function getRow(posY, grid) {
            if (posY < 0)
                return i;
            for (var i = 0, enumerator = grid.RowDefinitions.GetEnumerator(); posY > 0 && enumerator.MoveNext(); i++) {
                posY -= enumerator.Current.ActualHeight;
                if (posY < 0)
                    return i;
            }
            return -1;
        }
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
/// <reference path="Primitives/GridAdorner.ts" />
var Fayde;
(function (Fayde) {
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
                gic.SelectionChanged.Subscribe(this._SelectionChanged, this);
                this._Update(undefined, -1);
            };
            SelectedRowAdorner.prototype.OnDetached = function (gic) {
                _super.prototype.OnDetached.call(this, gic);
                gic.SelectionChanged.Unsubscribe(this._SelectionChanged, this);
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
            SelectedRowAdorner.BackgroundProperty = DependencyProperty.Register("Background", function () {
                return Fayde.Media.Brush;
            }, SelectedRowAdorner);
            SelectedRowAdorner.BorderBrushProperty = DependencyProperty.Register("BorderBrush", function () {
                return Fayde.Media.Brush;
            }, SelectedRowAdorner);
            SelectedRowAdorner.BorderThicknessProperty = DependencyProperty.Register("BorderThickness", function () {
                return Thickness;
            }, SelectedRowAdorner);
            SelectedRowAdorner.CornerRadiusProperty = DependencyProperty.Register("CornerRadius", function () {
                return CornerRadius;
            }, SelectedRowAdorner);
            SelectedRowAdorner.CursorProperty = DependencyProperty.Register("Cursor", function () {
                return new Enum(Fayde.CursorType);
            }, SelectedRowAdorner, 1 /* Hand */);
            return SelectedRowAdorner;
        })(Experimental.Primitives.GridAdorner);
        Experimental.SelectedRowAdorner = SelectedRowAdorner;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var SelectionChangedEventArgs = (function (_super) {
            __extends(SelectionChangedEventArgs, _super);
            function SelectionChangedEventArgs(item, row) {
                _super.call(this);
                Object.defineProperty(this, "Item", { value: item, writable: false });
                Object.defineProperty(this, "Row", { value: row, writable: false });
            }
            return SelectionChangedEventArgs;
        })(EventArgs);
        Experimental.SelectionChangedEventArgs = SelectionChangedEventArgs;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Fayde.Experimental.js.map
