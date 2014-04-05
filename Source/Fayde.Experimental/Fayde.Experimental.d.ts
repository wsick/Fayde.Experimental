declare module Fayde.Experimental {
    class GridItemsControlNode extends Fayde.Controls.ControlNode {
        public XObject: GridItemsControl;
        constructor(xobj: GridItemsControl);
        public ItemsPresenter: Experimental.GridItemsPresenter;
        public GetDefaultVisualTree(): Fayde.UIElement;
        private _CreatorListeners;
        public ListenForPresenterCreated(func: (presenter: Experimental.GridItemsPresenter) => void): void;
        public OnPresenterCreated(): void;
    }
    class GridItemsControl extends Fayde.Controls.Control {
        public XamlNode: GridItemsControlNode;
        public CreateNode(): GridItemsControlNode;
        static ItemsSourceProperty: DependencyProperty;
        public ItemsSource: Fayde.IEnumerable<any>;
        public OnItemsSourceChanged(oldItemsSource: Fayde.IEnumerable<any>, newItemsSource: Fayde.IEnumerable<any>): void;
        private _OnItemsSourceUpdated(sender, e);
        static ColumnsProperty: ImmutableDependencyProperty<Experimental.GridColumnCollection>;
        public Columns: Experimental.GridColumnCollection;
        private _Items;
        public Items : any[];
        private _AddItems(index, newItems);
        private _RemoveItems(index, oldItems);
        constructor();
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
        private _ColumnsChanged(sender, e);
        private _ColumnChanged(sender, e);
    }
}
declare module Fayde.Experimental {
    class GridItemsPresenterNode extends Fayde.FENode {
        public XObject: GridItemsPresenter;
        constructor(xobj: GridItemsPresenter);
        private _ElementRoot;
        public ElementRoot : Fayde.Controls.Grid;
        public DoApplyTemplateWithError(error: BError): boolean;
    }
    class GridItemsPresenter extends Fayde.FrameworkElement {
        public TemplateOwner: Experimental.GridItemsControl;
        public XamlNode: GridItemsPresenterNode;
        public CreateNode(): GridItemsPresenterNode;
        public GridItemsControl : Experimental.GridItemsControl;
        public Panel : Fayde.Controls.Grid;
        private _CellContainers;
        private _Columns;
        public OnColumnAdded(index: number, newColumn: Experimental.GridColumn): void;
        public OnColumnRemoved(index: number): void;
        public OnColumnsCleared(): void;
        public OnColumnChanged(col: Experimental.GridColumn): void;
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
    }
}
declare module Fayde.Experimental {
    class GridCell extends Fayde.Controls.ContentControl {
        static IsEditingProperty: DependencyProperty;
        public IsEditing: boolean;
        private OnIsEditingChanged(oldIsEditing, newIsEditing);
        constructor();
    }
}
declare module Fayde.Experimental {
    class GridColumn extends Fayde.DependencyObject {
        static WidthProperty: DependencyProperty;
        static MaxWidthProperty: DependencyProperty;
        static MinWidthProperty: DependencyProperty;
        static ActualWidthProperty: DependencyProperty;
        static CellStyleProperty: DependencyProperty;
        public Width: Fayde.Controls.GridLength;
        public MaxWidth: number;
        public MinWidth: number;
        public ActualWidth: number;
        public CellStyle: Fayde.Style;
        public GetContainerForCell(item: any): Fayde.UIElement;
        public PrepareContainerForCell(cell: Fayde.UIElement, item: any): void;
        public ClearContainerForCell(cell: Fayde.UIElement, item: any): void;
        private _Definition;
        private _ActualWidthListener;
        public AttachToDefinition(coldef: Fayde.Controls.ColumnDefinition): void;
        private _OnActualWidthChanged(sender, args);
        public DetachDefinition(): void;
    }
    class GridColumnCollection extends Fayde.XamlObjectCollection<GridColumn> {
        public ColumnChanged: MulticastEvent<Experimental.GridColumnChangedEventArgs>;
        public CollectionChanged: MulticastEvent<Fayde.Collections.NotifyCollectionChangedEventArgs>;
        public _RaiseItemAdded(value: GridColumn, index: number): void;
        public _RaiseItemRemoved(value: GridColumn, index: number): void;
        public _RaiseItemReplaced(removed: GridColumn, added: GridColumn, index: number): void;
        public _RaiseCleared(old: GridColumn[]): void;
    }
}
declare module Fayde.Experimental {
    class GridColumnChangedEventArgs extends EventArgs {
        public GridColumn: Experimental.GridColumn;
        constructor(col: Experimental.GridColumn);
    }
}
declare module Fayde.Experimental {
    class GridTextColumn extends Experimental.GridColumn {
        static BindingProperty: DependencyProperty;
        public Binding: Fayde.Data.Binding;
        private OnBindingChanged(args);
        public PrepareContainerForCell(cell: Fayde.UIElement, item: any): void;
        public ClearContainerForCell(cell: Fayde.UIElement, item: any): void;
    }
}
declare module Fayde.Experimental {
    class GridTemplateColumn extends Experimental.GridColumn {
        static CellTemplateProperty: DependencyProperty;
        public CellTemplate: Fayde.DataTemplate;
        public PrepareContainerForCell(cell: Fayde.UIElement, item: any): void;
        public ClearContainerForCell(cell: Fayde.UIElement, item: any): void;
    }
}
declare module Fayde.Experimental {
    class GridHeader extends Fayde.DependencyObject {
        static HeaderProperty: DependencyProperty;
        static HeaderTemplateProperty: DependencyProperty;
        static HeaderStyleProperty: DependencyProperty;
        public Header: any;
        public HeaderTemplate: Fayde.DataTemplate;
        public HeaderStyle: Fayde.Style;
        public GetContainerForCell(): Fayde.UIElement;
        public PrepareContainerForCell(cell: Fayde.UIElement): void;
        public ClearContainerForCell(cell: Fayde.UIElement): void;
    }
    class GridHeaderCollection extends Fayde.XamlObjectCollection<GridHeader> {
        public HeaderChanged: MulticastEvent<Experimental.GridHeaderChangedEventArgs>;
        public CollectionChanged: MulticastEvent<Fayde.Collections.NotifyCollectionChangedEventArgs>;
        public _RaiseItemAdded(value: GridHeader, index: number): void;
        public _RaiseItemRemoved(value: GridHeader, index: number): void;
        public _RaiseItemReplaced(removed: GridHeader, added: GridHeader, index: number): void;
        public _RaiseCleared(old: GridHeader[]): void;
    }
}
declare module Fayde.Experimental {
    class GridHeadersControlNode extends Fayde.Controls.ControlNode {
        public XObject: GridHeadersControl;
        constructor(xobj: GridHeadersControl);
        public HeadersPresenter: Experimental.GridHeadersPresenter;
        public GetDefaultVisualTree(): Fayde.UIElement;
    }
    class GridHeadersControl extends Fayde.Controls.Control {
        public XamlNode: GridHeadersControlNode;
        public CreateNode(): GridHeadersControlNode;
        static ItemsControlProperty: DependencyProperty;
        public ItemsControl: Experimental.GridItemsControl;
        private OnItemsControlChanged(args);
        static HeadersProperty: ImmutableDependencyProperty<Experimental.GridHeaderCollection>;
        public Headers: Experimental.GridHeaderCollection;
        constructor();
        private _HeadersChanged(sender, e);
        private _HeaderChanged(sender, e);
    }
}
declare module Fayde.Experimental {
    class GridHeaderChangedEventArgs extends EventArgs {
        public GridHeader: Experimental.GridHeader;
        constructor(header: Experimental.GridHeader);
    }
}
declare module Fayde.Experimental {
    class GridHeadersPresenterNode extends Fayde.FENode {
        public XObject: GridHeadersPresenter;
        constructor(xobj: GridHeadersPresenter);
        private _ElementRoot;
        public ElementRoot : Fayde.Controls.Grid;
        public DoApplyTemplateWithError(error: BError): boolean;
    }
    class GridHeadersPresenter extends Fayde.FrameworkElement {
        public TemplateOwner: Experimental.GridHeadersControl;
        public XamlNode: GridHeadersPresenterNode;
        public CreateNode(): GridHeadersPresenterNode;
        public GridHeadersControl : Experimental.GridHeadersControl;
        public Panel : Fayde.Controls.Grid;
        private _Headers;
        private _HeaderContainers;
        public OnHeaderAdded(index: number, header: Experimental.GridHeader): void;
        public OnHeaderRemoved(index: number): void;
        public OnHeadersCleared(): void;
        public OnHeaderChanged(header: Experimental.GridHeader): void;
        private _LinkedItemsControl;
        public LinkedItemsPanel : Fayde.Controls.Grid;
        public LinkControl(gic: Experimental.GridItemsControl): void;
        private FinishLinkControl(presenter);
        public UnlinkControl(gic: Experimental.GridItemsControl): void;
    }
}
declare module Fayde.Experimental {
    class HeaderColumnDefinition extends Fayde.Controls.ColumnDefinition {
        private _LinkedListener;
        private _LinkedColDef;
        constructor();
        public Link(coldef: Fayde.Controls.ColumnDefinition): void;
        public Unlink(): void;
        private _ActualWidthChanged(sender, args);
        private _LinkedActualWidthChanged(sender, args);
    }
}
declare module Fayde.Experimental {
    class GridHeaderCell extends Fayde.Controls.ContentControl {
        constructor();
    }
}
