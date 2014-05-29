/// <reference path="Internal/ItemChangedCollection.ts" />

module Fayde.Experimental {
    import GridLength = Fayde.Controls.GridLength;
    import ColumnDefinition = Fayde.Controls.ColumnDefinition;
    import ContentControl = Fayde.Controls.ContentControl;

    export class GridColumn extends DependencyObject {
        static WidthProperty = DependencyProperty.Register("Width", () => GridLength, GridColumn);
        static MaxWidthProperty = DependencyProperty.Register("MaxWidth", () => Number, GridColumn, Number.POSITIVE_INFINITY);
        static MinWidthProperty = DependencyProperty.Register("MinWidth", () => Number, GridColumn, 0.0);
        static ActualWidthProperty = DependencyProperty.RegisterReadOnly("ActualWidth", () => Number, GridColumn, 0.0);
        static CellStyleProperty = DependencyProperty.Register("CellStyle", () => Style, GridColumn);
        static SourceProperty = DependencyProperty.Register("Source", () => Data.Binding, GridColumn);
        Width: GridLength;
        MaxWidth: number;
        MinWidth: number;
        ActualWidth: number;
        CellStyle: Style;
        Source: Data.Binding;

        GetContainerForCell(item: any): UIElement {
            return new GridCell();
        }
        PrepareContainerForCell(cell: UIElement, item: any) {
            var binding: Data.Binding;

            if (cell instanceof FrameworkElement) {
                binding = new Data.Binding("CellStyle");
                binding.Source = this;
                cell.SetBinding(FrameworkElement.StyleProperty, binding);
            }

            if (cell instanceof ContentControl) {
                binding = new Data.Binding("Source");
                binding.Source = this;
                //TODO: Use FallbackValue when fixed
                binding.Converter = {
                    Convert: (value: any, targetType: IType, parameter: any, culture: any): any => {
                        if (value === undefined)
                            return item;
                        return value;
                    },
                    ConvertBack: (value: any, targetType: IType, parameter: any, culture: any): any => {
                        return value;
                    }
                };
                cell.SetBinding(ContentControl.ContentProperty, binding);
            }
        }
        ClearContainerForCell(cell: UIElement, item: any) {
            if (cell instanceof FrameworkElement) {
                cell.ClearValue(FrameworkElement.StyleProperty);
            }
            if (cell instanceof ContentControl) {
                cell.ClearValue(ContentControl.ContentProperty);
            }
        }

        private _Definition: ColumnDefinition = null;
        private _ActualWidthListener: Providers.IPropertyChangedListener = null;
        AttachToDefinition(coldef: ColumnDefinition) {
            this._Definition = coldef;
            if (!coldef)
                return;

            var binding = new Data.Binding("Width");
            binding.Source = this;
            binding.Mode = Data.BindingMode.OneWay;
            binding.Converter = new EmptyWidthConverter();
            coldef.SetBinding(ColumnDefinition.WidthProperty, binding);

            binding = new Data.Binding("MaxWidth");
            binding.Source = this;
            binding.Mode = Data.BindingMode.OneWay;
            coldef.SetBinding(ColumnDefinition.MaxWidthProperty, binding);

            binding = new Data.Binding("MinWidth");
            binding.Source = this;
            binding.Mode = Data.BindingMode.OneWay;
            coldef.SetBinding(ColumnDefinition.MinWidthProperty, binding);

            this._ActualWidthListener = ColumnDefinition.ActualWidthProperty.Store.ListenToChanged(coldef, ColumnDefinition.ActualWidthProperty, this._OnActualWidthChanged, this);
        }
        private _OnActualWidthChanged(sender: any, args: IDependencyPropertyChangedEventArgs) {
            this.SetCurrentValue(ColumnDefinition.ActualWidthProperty, args.NewValue);
        }
        DetachDefinition() {
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
        }
    }

    export class GridColumnCollection extends Internal.ItemChangedCollection<GridColumn> {
    }

    class EmptyWidthConverter implements Data.IValueConverter {
        Convert(value: any, targetType: IType, parameter: any, culture: any): any {
            if (!value)
                return "auto";
            return value;
        }
        ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any { }
    }
}