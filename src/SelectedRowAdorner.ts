/// <reference path="Primitives/GridAdorner.ts" />

module Fayde.Experimental {
    import Grid = Fayde.Controls.Grid;
    import Border = Fayde.Controls.Border;

    export class SelectedRowAdorner extends Primitives.GridAdorner {
        static BackgroundProperty = DependencyProperty.Register("Background", () => Media.Brush, SelectedRowAdorner);
        static BorderBrushProperty = DependencyProperty.Register("BorderBrush", () => Media.Brush, SelectedRowAdorner);
        static BorderThicknessProperty = DependencyProperty.Register("BorderThickness", () => Thickness, SelectedRowAdorner);
        static CornerRadiusProperty = DependencyProperty.Register("CornerRadius", () => CornerRadius, SelectedRowAdorner);
        static CursorProperty = DependencyProperty.Register("Cursor", () => new Enum(Fayde.CursorType), SelectedRowAdorner, Fayde.CursorType.Hand);
        Background: Media.Brush;
        BorderBrush: Media.Brush;
        BorderThickness: Thickness;
        CornerRadius: CornerRadius;
        Cursor: Fayde.CursorType;

        private _Element: UIElement = null;

        CreateElement(): UIElement {
            var el = new Border();
            el.IsHitTestVisible = false;

            var binding = new Data.Binding("Background");
            binding.Source = this;
            el.SetBinding(Border.BackgroundProperty, binding);

            binding = new Data.Binding("BorderBrush");
            binding.Source = this;
            el.SetBinding(Border.BorderBrushProperty, binding);

            binding = new Data.Binding("BorderThickness");
            binding.Source = this;
            el.SetBinding(Border.BorderThicknessProperty, binding);

            binding = new Data.Binding("CornerRadius");
            binding.Source = this;
            el.SetBinding(Border.CornerRadiusProperty, binding);

            binding = new Data.Binding("Cursor");
            binding.Source = this;
            el.SetBinding(FrameworkElement.CursorProperty, binding);

            return el;
        }

        OnAttached(gic: GridItemsControl) {
            super.OnAttached(gic);
            var grid = gic.ItemsPresenter.Panel;
            grid.Children.Add(this._Element = this.CreateElement());
            Fayde.Controls.Panel.SetZIndex(this._Element, -5);
            Grid.SetColumnSpan(this._Element, grid.ColumnDefinitions.Count);
            gic.SelectionChanged.Subscribe(this._SelectionChanged, this);
            this._Update(undefined, -1);
        }
        OnDetached(gic: GridItemsControl) {
            super.OnDetached(gic);
            gic.SelectionChanged.Unsubscribe(this._SelectionChanged, this);
            var grid = gic.ItemsPresenter.Panel;
            grid.Children.Remove(this._Element);
            this._Element = null;
        }
        private _SelectionChanged(sender: any, e: SelectionChangedEventArgs) {
            this._Update(e.Item, e.Row);
        }
        private _Update(item: any, row: number) {
            var el = this._Element;
            if (!el)
                return;
            el.Visibility = row > -1 ? Visibility.Visible : Visibility.Collapsed;
            Grid.SetRow(el, row > -1 ? row : 0);
        }
    }
}