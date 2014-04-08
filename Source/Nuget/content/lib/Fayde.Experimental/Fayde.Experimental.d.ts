declare module Fayde.Experimental {
    class GridItemsControlNode extends Controls.ControlNode {
        public XObject: GridItemsControl;
        constructor(xobj: GridItemsControl);
        public ItemsPresenter: GridItemsPresenter;
        public GetDefaultVisualTree(): UIElement;
        private _CreatorListeners;
        public ListenForPresenterCreated(func: (presenter: GridItemsPresenter) => void): void;
        public OnPresenterCreated(): void;
        private InitSelection(grid);
        private _MouseLeftButtonDown(sender, e);
    }
    class GridItemsControl extends Controls.Control {
        public XamlNode: GridItemsControlNode;
        public CreateNode(): GridItemsControlNode;
        public ItemsPresenter : GridItemsPresenter;
        static ItemsSourceProperty: DependencyProperty;
        static ColumnsProperty: ImmutableDependencyProperty<GridColumnCollection>;
        static AdornersProperty: ImmutableDependencyProperty<Primitives.GridAdornerCollection>;
        static SelectedItemProperty: DependencyProperty;
        static SelectedRowProperty: DependencyProperty;
        public ItemsSource: IEnumerable<any>;
        public Columns: GridColumnCollection;
        public Adorners: Primitives.GridAdornerCollection;
        public SelectedItem: any;
        public SelectedRow: number;
        public SelectionChanged: MulticastEvent<SelectionChangedEventArgs>;
        public OnSelectionChanged(): void;
        public OnItemsSourceChanged(oldItemsSource: IEnumerable<any>, newItemsSource: IEnumerable<any>): void;
        private _OnItemsSourceUpdated(sender, e);
        private _IsCoercing;
        public OnSelectedItemChanged(oldItem: any, newItem: any): void;
        public OnSelectedRowChanged(oldRow: number, newRow: number): void;
        private _Items;
        public Items : any[];
        private _AddItems(index, newItems);
        private _RemoveItems(index, oldItems);
        constructor();
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
        private _ColumnsChanged(sender, e);
        private _ColumnChanged(sender, e);
        private _AdornersChanged(sender, e);
    }
}
declare module Fayde.Experimental {
    class GridItemsPresenterNode extends FENode {
        public XObject: GridItemsPresenter;
        constructor(xobj: GridItemsPresenter);
        private _ElementRoot;
        public ElementRoot : Controls.Grid;
        public DoApplyTemplateWithError(error: BError): boolean;
    }
    class GridItemsPresenter extends FrameworkElement {
        public TemplateOwner: GridItemsControl;
        public XamlNode: GridItemsPresenterNode;
        public CreateNode(): GridItemsPresenterNode;
        public GridItemsControl : GridItemsControl;
        public Panel : Controls.Grid;
        private _CellContainers;
        private _Columns;
        public OnColumnAdded(index: number, newColumn: GridColumn): void;
        public OnColumnRemoved(index: number): void;
        public OnColumnsCleared(): void;
        public OnColumnChanged(col: GridColumn): void;
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
    }
}
declare module Fayde.Experimental {
    class GridCell extends Controls.ContentControl {
        static IsEditingProperty: DependencyProperty;
        public IsEditing: boolean;
        private OnIsEditingChanged(oldIsEditing, newIsEditing);
        constructor();
    }
}
declare module Fayde.Experimental.Internal {
    class ItemChangedCollection<T extends XamlObject> extends XamlObjectCollection<T> {
        public ItemChanged: MulticastEvent<ItemChangedEventArgs<T>>;
        public CollectionChanged: MulticastEvent<Collections.NotifyCollectionChangedEventArgs>;
        public _RaiseItemAdded(value: T, index: number): void;
        public _RaiseItemRemoved(value: T, index: number): void;
        public _RaiseItemReplaced(removed: T, added: T, index: number): void;
        public _RaiseCleared(old: T[]): void;
    }
    class ItemChangedEventArgs<T> extends EventArgs {
        public Item: T;
        constructor(t: T);
    }
}
declare module Fayde.Experimental {
    class GridColumn extends DependencyObject {
        static WidthProperty: DependencyProperty;
        static MaxWidthProperty: DependencyProperty;
        static MinWidthProperty: DependencyProperty;
        static ActualWidthProperty: DependencyProperty;
        static CellStyleProperty: DependencyProperty;
        public Width: Controls.GridLength;
        public MaxWidth: number;
        public MinWidth: number;
        public ActualWidth: number;
        public CellStyle: Style;
        public GetContainerForCell(item: any): UIElement;
        public PrepareContainerForCell(cell: UIElement, item: any): void;
        public ClearContainerForCell(cell: UIElement, item: any): void;
        private _Definition;
        private _ActualWidthListener;
        public AttachToDefinition(coldef: Controls.ColumnDefinition): void;
        private _OnActualWidthChanged(sender, args);
        public DetachDefinition(): void;
    }
    class GridColumnCollection extends Internal.ItemChangedCollection<GridColumn> {
    }
}
declare module Fayde.Experimental {
    class GridColumnChangedEventArgs extends EventArgs {
        public GridColumn: GridColumn;
        constructor(col: GridColumn);
    }
}
declare module Fayde.Experimental {
    class GridTextColumn extends GridColumn {
        static BindingProperty: DependencyProperty;
        public Binding: Data.Binding;
        private OnBindingChanged(args);
        public PrepareContainerForCell(cell: UIElement, item: any): void;
        public ClearContainerForCell(cell: UIElement, item: any): void;
    }
}
declare module Fayde.Experimental {
    class GridTemplateColumn extends GridColumn {
        static CellTemplateProperty: DependencyProperty;
        public CellTemplate: DataTemplate;
        public PrepareContainerForCell(cell: UIElement, item: any): void;
        public ClearContainerForCell(cell: UIElement, item: any): void;
    }
}
declare module Fayde.Experimental {
    class GridHeader extends DependencyObject {
        static HeaderProperty: DependencyProperty;
        static HeaderTemplateProperty: DependencyProperty;
        static HeaderStyleProperty: DependencyProperty;
        public Header: any;
        public HeaderTemplate: DataTemplate;
        public HeaderStyle: Style;
        public GetContainerForCell(): UIElement;
        public PrepareContainerForCell(cell: UIElement): void;
        public ClearContainerForCell(cell: UIElement): void;
    }
    class GridHeaderCollection extends Internal.ItemChangedCollection<GridHeader> {
    }
}
declare module Fayde.Experimental {
    class GridHeadersControlNode extends Controls.ControlNode {
        public XObject: GridHeadersControl;
        constructor(xobj: GridHeadersControl);
        public HeadersPresenter: GridHeadersPresenter;
        public GetDefaultVisualTree(): UIElement;
    }
    class GridHeadersControl extends Controls.Control {
        public XamlNode: GridHeadersControlNode;
        public CreateNode(): GridHeadersControlNode;
        static ItemsControlProperty: DependencyProperty;
        public ItemsControl: GridItemsControl;
        private OnItemsControlChanged(args);
        static HeadersProperty: ImmutableDependencyProperty<GridHeaderCollection>;
        public Headers: GridHeaderCollection;
        constructor();
        private _HeadersChanged(sender, e);
        private _HeaderChanged(sender, e);
    }
}
declare module Fayde.Experimental {
    class GridHeaderChangedEventArgs extends EventArgs {
        public GridHeader: GridHeader;
        constructor(header: GridHeader);
    }
}
declare module Fayde.Experimental {
    class GridHeadersPresenterNode extends FENode {
        public XObject: GridHeadersPresenter;
        constructor(xobj: GridHeadersPresenter);
        private _ElementRoot;
        public ElementRoot : Controls.Grid;
        public DoApplyTemplateWithError(error: BError): boolean;
    }
    class GridHeadersPresenter extends FrameworkElement {
        public TemplateOwner: GridHeadersControl;
        public XamlNode: GridHeadersPresenterNode;
        public CreateNode(): GridHeadersPresenterNode;
        public GridHeadersControl : GridHeadersControl;
        public Panel : Controls.Grid;
        private _Headers;
        private _HeaderContainers;
        public OnHeaderAdded(index: number, header: GridHeader): void;
        public OnHeaderRemoved(index: number): void;
        public OnHeadersCleared(): void;
        public OnHeaderChanged(header: GridHeader): void;
        private _LinkedItemsControl;
        public LinkedItemsPanel : Controls.Grid;
        public LinkControl(gic: GridItemsControl): void;
        private FinishLinkControl(presenter);
        public UnlinkControl(gic: GridItemsControl): void;
    }
}
declare module Fayde.Experimental {
    class HeaderColumnDefinition extends Controls.ColumnDefinition {
        private _LinkedListener;
        private _LinkedColDef;
        constructor();
        public Link(coldef: Controls.ColumnDefinition): void;
        public Unlink(): void;
        private _ActualWidthChanged(sender, args);
        private _LinkedActualWidthChanged(sender, args);
    }
}
declare module Fayde.Experimental {
    class GridHeaderCell extends Controls.ContentControl {
        constructor();
    }
}
declare module Fayde.Experimental.Primitives {
    class GridAdorner extends DependencyObject {
        public OnAttached(gic: GridItemsControl): void;
        public OnDetached(gic: GridItemsControl): void;
    }
    class GridAdornerCollection extends Internal.ItemChangedCollection<GridAdorner> {
    }
}
declare module Fayde.Experimental {
    class HoveredRowAdorner extends Primitives.GridAdorner {
        static BackgroundProperty: DependencyProperty;
        static BorderBrushProperty: DependencyProperty;
        static BorderThicknessProperty: DependencyProperty;
        static CornerRadiusProperty: DependencyProperty;
        static CursorProperty: DependencyProperty;
        public Background: Media.Brush;
        public BorderBrush: Media.Brush;
        public BorderThickness: Thickness;
        public CornerRadius: CornerRadius;
        public Cursor: CursorType;
        private _HoverRow;
        private _Element;
        private _InGrid;
        public CreateElement(): UIElement;
        public OnAttached(gic: GridItemsControl): void;
        public OnDetached(gic: GridItemsControl): void;
        private _MouseMove(sender, e);
        private _MouseEnter(sender, e);
        private _MouseLeave(sender, e);
        private _SetHoverRow(row);
        public OnHoverRowChanged(oldRow: number, newRow: number): void;
    }
}
declare module Fayde.Experimental {
    class SelectedRowAdorner extends Primitives.GridAdorner {
        static BackgroundProperty: DependencyProperty;
        static BorderBrushProperty: DependencyProperty;
        static BorderThicknessProperty: DependencyProperty;
        static CornerRadiusProperty: DependencyProperty;
        static CursorProperty: DependencyProperty;
        public Background: Media.Brush;
        public BorderBrush: Media.Brush;
        public BorderThickness: Thickness;
        public CornerRadius: CornerRadius;
        public Cursor: CursorType;
        private _Element;
        public CreateElement(): UIElement;
        public OnAttached(gic: GridItemsControl): void;
        public OnDetached(gic: GridItemsControl): void;
        private _SelectionChanged(sender, e);
        private _Update(item, row);
    }
}
declare module Fayde.Experimental {
    class SelectionChangedEventArgs extends EventArgs {
        public Item: any;
        public Row: number;
        constructor(item: any, row: number);
    }
}
