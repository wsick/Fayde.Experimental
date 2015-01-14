declare module Fayde.Experimental {
    var Version: string;
}
declare module Fayde.Experimental {
    class CellMouseButtonEventArgs extends Input.MouseButtonEventArgs {
        Cell: UIElement;
        constructor(cell: UIElement, args: Input.MouseButtonEventArgs);
    }
}
declare module Fayde.Experimental {
    class CellMouseEventArgs extends Input.MouseEventArgs {
        Cell: UIElement;
        constructor(cell: UIElement, args: Input.MouseEventArgs);
    }
}
declare module Fayde.Experimental {
    class EditingChangedEventArgs implements nullstone.IEventArgs {
        Item: any;
        Row: number;
        constructor(item: any, row: number);
    }
}
declare module Fayde.Experimental {
    class GridColumnChangedEventArgs implements nullstone.IEventArgs {
        GridColumn: GridColumn;
        constructor(col: GridColumn);
    }
}
declare module Fayde.Experimental.Internal {
    class ItemChangedCollection<T extends XamlObject> extends XamlObjectCollection<T> {
        ItemChanged: nullstone.Event<ItemChangedEventArgs<T>>;
        CollectionChanged: nullstone.Event<Collections.CollectionChangedEventArgs>;
        _RaiseItemAdded(value: T, index: number): void;
        _RaiseItemRemoved(value: T, index: number): void;
        _RaiseItemReplaced(removed: T, added: T, index: number): void;
        _RaiseCleared(old: T[]): void;
    }
    class ItemChangedEventArgs<T> implements nullstone.IEventArgs {
        Item: T;
        constructor(t: T);
    }
}
declare module Fayde.Experimental {
    class GridHeader extends DependencyObject {
        static HeaderProperty: DependencyProperty;
        static HeaderTemplateProperty: DependencyProperty;
        static HeaderStyleProperty: DependencyProperty;
        Header: any;
        HeaderTemplate: DataTemplate;
        HeaderStyle: Style;
        GetContainerForCell(): UIElement;
        PrepareContainerForCell(cell: UIElement): void;
        ClearContainerForCell(cell: UIElement): void;
    }
    class GridHeaderCollection extends Internal.ItemChangedCollection<GridHeader> {
    }
}
declare module Fayde.Experimental {
    class GridHeaderChangedEventArgs implements nullstone.IEventArgs {
        GridHeader: GridHeader;
        constructor(header: GridHeader);
    }
}
declare module Fayde.Experimental {
    class GridHeadersControlNode extends Controls.ControlNode {
        XObject: GridHeadersControl;
        constructor(xobj: GridHeadersControl);
        HeadersPresenter: GridHeadersPresenter;
        GetDefaultVisualTree(): UIElement;
    }
    class GridHeadersControl extends Controls.Control {
        XamlNode: GridHeadersControlNode;
        CreateNode(): GridHeadersControlNode;
        static ItemsControlProperty: DependencyProperty;
        ItemsControl: GridItemsControl;
        private OnItemsControlChanged(args);
        static HeadersProperty: ImmutableDependencyProperty<GridHeaderCollection>;
        Headers: GridHeaderCollection;
        constructor();
        private _HeadersChanged(sender, e);
        private _HeaderChanged(sender, e);
    }
}
declare module Fayde.Experimental {
    import Grid = Fayde.Controls.Grid;
    class GridHeadersPresenterNode extends FENode {
        XObject: GridHeadersPresenter;
        constructor(xobj: GridHeadersPresenter);
        private _ElementRoot;
        ElementRoot: Grid;
        DoApplyTemplateWithError(error: BError): boolean;
    }
    class GridHeadersPresenter extends FrameworkElement {
        TemplateOwner: GridHeadersControl;
        XamlNode: GridHeadersPresenterNode;
        CreateNode(): GridHeadersPresenterNode;
        GridHeadersControl: GridHeadersControl;
        Panel: Grid;
        private _Headers;
        private _HeaderContainers;
        OnHeaderAdded(index: number, header: GridHeader): void;
        OnHeaderRemoved(index: number): void;
        OnHeadersCleared(): void;
        OnHeaderChanged(header: GridHeader): void;
        private _LinkedItemsControl;
        LinkedItemsPanel: Grid;
        LinkControl(gic: GridItemsControl): void;
        private FinishLinkControl(presenter);
        UnlinkControl(gic: GridItemsControl): void;
    }
}
declare module Fayde.Experimental {
    class GridItemsControlNode extends Controls.ControlNode {
        XObject: GridItemsControl;
        constructor(xobj: GridItemsControl);
        ItemsPresenter: GridItemsPresenter;
        GetDefaultVisualTree(): UIElement;
        private _CreatorListeners;
        ListenForPresenterCreated(func: (presenter: GridItemsPresenter) => void): void;
        OnPresenterCreated(): void;
        private _CellClicked(sender, e);
        private InitSelection(presenter);
    }
    class GridItemsControl extends Controls.Control {
        XamlNode: GridItemsControlNode;
        CreateNode(): GridItemsControlNode;
        IsItemsControl: boolean;
        ItemsPresenter: GridItemsPresenter;
        static ItemsSourceProperty: DependencyProperty;
        static ColumnsProperty: ImmutableDependencyProperty<GridColumnCollection>;
        static AdornersProperty: ImmutableDependencyProperty<Primitives.GridAdornerCollection>;
        static SelectedItemProperty: DependencyProperty;
        static SelectedRowProperty: DependencyProperty;
        static EditingItemProperty: DependencyProperty;
        static EditingRowProperty: DependencyProperty;
        ItemsSource: nullstone.IEnumerable<any>;
        Columns: GridColumnCollection;
        Adorners: Primitives.GridAdornerCollection;
        SelectedItem: any;
        SelectedRow: number;
        EditingItem: any;
        EditingRow: number;
        SelectionChanged: nullstone.Event<SelectionChangedEventArgs>;
        OnSelectionChanged(): void;
        EditingChanged: nullstone.Event<EditingChangedEventArgs>;
        OnEditingChanged(): void;
        OnItemsSourceChanged(oldItemsSource: nullstone.IEnumerable<any>, newItemsSource: nullstone.IEnumerable<any>): void;
        private _OnItemsSourceUpdated(sender, e);
        private _IsCoercingSel;
        OnSelectedItemChanged(oldItem: any, newItem: any): void;
        OnSelectedRowChanged(oldRow: number, newRow: number): void;
        private _IsCoercingEdit;
        OnEditingItemChanged(oldItem: any, newItem: any): void;
        OnEditingRowChanged(oldRow: number, newRow: number): void;
        private _ToggleEditCommand;
        private _Items;
        Items: any[];
        private _AddItems(index, newItems);
        private _RemoveItems(index, oldItems);
        ToggleEditCommand: MVVM.RelayCommand;
        constructor();
        OnItemsAdded(index: number, newItems: any[]): void;
        OnItemsRemoved(index: number, oldItems: any[]): void;
        private _ColumnsChanged(sender, e);
        private _ColumnChanged(sender, e);
        private _AdornersChanged(sender, e);
    }
}
declare module Fayde.Experimental {
    import Grid = Fayde.Controls.Grid;
    class GridItemsPresenterNode extends FENode {
        XObject: GridItemsPresenter;
        constructor(xobj: GridItemsPresenter);
        private _ElementRoot;
        ElementRoot: Grid;
        DoApplyTemplateWithError(error: BError): boolean;
    }
    class GridItemsPresenter extends FrameworkElement {
        TemplateOwner: GridItemsControl;
        XamlNode: GridItemsPresenterNode;
        CreateNode(): GridItemsPresenterNode;
        GridItemsControl: GridItemsControl;
        Panel: Grid;
        private _CellContainers;
        private _Columns;
        CellClicked: RoutedEvent<CellMouseButtonEventArgs>;
        OnCellMouseLeftButtonDown(sender: any, e: Input.MouseButtonEventArgs): void;
        CellMouseEnter: RoutedEvent<CellMouseEventArgs>;
        OnCellMouseEnter(sender: any, e: Input.MouseEventArgs): void;
        CellMouseLeave: RoutedEvent<CellMouseEventArgs>;
        OnCellMouseLeave(sender: any, e: Input.MouseEventArgs): void;
        OnColumnAdded(index: number, newColumn: GridColumn): void;
        OnColumnRemoved(index: number): void;
        OnColumnsCleared(): void;
        OnColumnChanged(col: GridColumn): void;
        OnItemsAdded(index: number, newItems: any[]): void;
        OnItemsRemoved(index: number, oldItems: any[]): void;
        private _PrepareContainer(col, container, item);
        private _ClearContainer(col, container, item);
        private _EditIndex;
        OnEditingItemChanged(item: any, index: number): void;
    }
}
declare module Fayde.Experimental {
    import ColumnDefinition = Fayde.Controls.ColumnDefinition;
    class HeaderColumnDefinition extends ColumnDefinition {
        private _LinkedListener;
        private _LinkedColDef;
        constructor();
        Link(coldef: ColumnDefinition): void;
        Unlink(): void;
        private _ActualWidthChanged(sender, args);
        private _LinkedActualWidthChanged(sender, args);
    }
}
declare module Fayde.Experimental.Primitives {
    class GridAdorner extends DependencyObject {
        OnAttached(gic: GridItemsControl): void;
        OnDetached(gic: GridItemsControl): void;
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
        Background: Media.Brush;
        BorderBrush: Media.Brush;
        BorderThickness: Thickness;
        CornerRadius: CornerRadius;
        Cursor: CursorType;
        private _HoverRow;
        private _Element;
        private _ForegroundElement;
        CreateBackgroundElement(): UIElement;
        CreateForegroundElement(): UIElement;
        OnAttached(gic: GridItemsControl): void;
        OnDetached(gic: GridItemsControl): void;
        private _CellMouseEnter(sender, e);
        private _CellMouseLeave(sender, e);
        private _SetHoverRow(row);
        OnHoverRowChanged(oldRow: number, newRow: number): void;
    }
}
declare module Fayde.Experimental {
    class SelectedRowAdorner extends Primitives.GridAdorner {
        static BackgroundProperty: DependencyProperty;
        static BorderBrushProperty: DependencyProperty;
        static BorderThicknessProperty: DependencyProperty;
        static CornerRadiusProperty: DependencyProperty;
        static CursorProperty: DependencyProperty;
        Background: Media.Brush;
        BorderBrush: Media.Brush;
        BorderThickness: Thickness;
        CornerRadius: CornerRadius;
        Cursor: CursorType;
        private _Element;
        CreateElement(): UIElement;
        OnAttached(gic: GridItemsControl): void;
        OnDetached(gic: GridItemsControl): void;
        private _SelectionChanged(sender, e);
        private _Update(item, row);
    }
}
declare module Fayde.Experimental {
    class SelectionChangedEventArgs implements nullstone.IEventArgs {
        Item: any;
        Row: number;
        constructor(item: any, row: number);
    }
}
declare module Fayde.Experimental {
    class GridCell extends Controls.ContentControl {
        static IsEditingProperty: DependencyProperty;
        static IsEditableProperty: DependencyProperty;
        static EditTemplateProperty: DependencyProperty;
        IsEditing: boolean;
        IsEditable: boolean;
        EditTemplate: DataTemplate;
        OnIsEditingChanged(oldIsEditing: boolean, newIsEditing: boolean): void;
        OnIsEditableChanged(oldIsEditable: boolean, newIsEditable: boolean): void;
        constructor();
        OnApplyTemplate(): void;
        GoToStates(gotoFunc: (state: string) => boolean): void;
        GoToStateEditing(gotoFunc: (state: string) => boolean): boolean;
    }
}
declare module Fayde.Experimental {
    class GridInputCell extends GridCell {
        static DisplayPropertyProperty: DependencyProperty;
        static EditPropertyProperty: DependencyProperty;
        static DisplayMemberPathProperty: DependencyProperty;
        static ConverterProperty: DependencyProperty;
        static StringFormatProperty: DependencyProperty;
        DisplayProperty: string;
        EditProperty: string;
        DisplayMemberPath: string;
        Converter: Data.IValueConverter;
        StringFormat: string;
        OnDisplayPropertyChanged(oldProperty: string, newProperty: string): void;
        OnEditPropertyChanged(oldProperty: string, newProperty: string): void;
        OnDisplayMemberPathChanged(oldPath: string, newPath: string): void;
        OnConverterChanged(oldConverter: string, newConverter: string): void;
        OnStringFormatChanged(oldFormat: string, newFormat: string): void;
        OnIsEditableChanged(oldIsEditable: boolean, newIsEditable: boolean): void;
        private _Presenter;
        private _Editor;
        OnApplyTemplate(): void;
        UpdateDisplayMember(): void;
    }
}
declare module Fayde.Experimental {
    class GridDateCell extends GridInputCell {
        constructor();
    }
}
declare module Fayde.Experimental {
    class GridHeaderCell extends Controls.ContentControl {
        constructor();
    }
}
declare module Fayde.Experimental {
    class GridNumericCell extends GridInputCell {
        constructor();
    }
}
declare module Fayde.Experimental {
    class GridTextCell extends GridInputCell {
        constructor();
    }
}
declare module Fayde.Experimental {
    class GridTimeCell extends GridInputCell {
        constructor();
    }
}
declare module Fayde.Experimental {
    import GridLength = Fayde.Controls.GridLength;
    import ColumnDefinition = Fayde.Controls.ColumnDefinition;
    class GridColumn extends DependencyObject {
        static WidthProperty: DependencyProperty;
        static MaxWidthProperty: DependencyProperty;
        static MinWidthProperty: DependencyProperty;
        static ActualWidthProperty: DependencyProperty;
        static CellStyleProperty: DependencyProperty;
        static SourceProperty: DependencyProperty;
        static IsEditableProperty: DependencyProperty;
        Width: GridLength;
        MaxWidth: number;
        MinWidth: number;
        ActualWidth: number;
        CellStyle: Style;
        Source: Data.Binding;
        IsEditable: boolean;
        GetContainerForCell(item: any): UIElement;
        PrepareContainerForCell(cell: UIElement, item: any): void;
        ClearContainerForCell(cell: UIElement, item: any): void;
        private _Definition;
        private _ActualWidthListener;
        AttachToDefinition(coldef: ColumnDefinition): void;
        private _OnActualWidthChanged(sender, args);
        DetachDefinition(): void;
    }
    class GridColumnCollection extends Internal.ItemChangedCollection<GridColumn> {
    }
}
declare module Fayde.Experimental {
    class GridInputColumn extends GridColumn {
        static DisplayMemberPathProperty: DependencyProperty;
        static ConverterProperty: DependencyProperty;
        static StringFormatProperty: DependencyProperty;
        DisplayMemberPath: string;
        Converter: Data.IValueConverter;
        StringFormat: string;
        PrepareContainerForCell(cell: UIElement, item: any): void;
        ClearContainerForCell(cell: UIElement, item: any): void;
    }
}
declare module Fayde.Experimental {
    class GridDateColumn extends GridInputColumn {
        GetContainerForCell(item: any): GridDateCell;
    }
}
declare module Fayde.Experimental {
    class GridNumericColumn extends GridInputColumn {
        GetContainerForCell(item: any): GridNumericCell;
    }
}
declare module Fayde.Experimental {
    class GridTemplateColumn extends GridColumn {
        static DisplayTemplateProperty: DependencyProperty;
        static EditTemplateProperty: DependencyProperty;
        DisplayTemplate: DataTemplate;
        EditTemplate: DataTemplate;
        PrepareContainerForCell(cell: UIElement, item: any): void;
        ClearContainerForCell(cell: UIElement, item: any): void;
    }
}
declare module Fayde.Experimental {
    class GridTextColumn extends GridInputColumn {
        GetContainerForCell(item: any): GridTextCell;
    }
}
declare module Fayde.Experimental {
    class GridTimeColumn extends GridInputColumn {
        GetContainerForCell(item: any): GridTimeCell;
    }
}
