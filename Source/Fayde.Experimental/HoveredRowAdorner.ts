/// <reference path="Primitives/GridAdorner.ts" />

module Fayde.Experimental {
    import Grid = Fayde.Controls.Grid;
    import Border = Fayde.Controls.Border;

    export class HoveredRowAdorner extends Primitives.GridAdorner {
        static BackgroundProperty = DependencyProperty.Register("Background", () => Media.Brush, HoveredRowAdorner);
        static BorderBrushProperty = DependencyProperty.Register("BorderBrush", () => Media.Brush, HoveredRowAdorner);
        static BorderThicknessProperty = DependencyProperty.Register("BorderThickness", () => Thickness, HoveredRowAdorner);
        static CornerRadiusProperty = DependencyProperty.Register("CornerRadius", () => CornerRadius, HoveredRowAdorner);
        static CursorProperty = DependencyProperty.Register("Cursor", () => new Enum(Fayde.CursorType), HoveredRowAdorner, Fayde.CursorType.Hand);
        Background: Media.Brush;
        BorderBrush: Media.Brush;
        BorderThickness: Thickness;
        CornerRadius: CornerRadius;
        Cursor: Fayde.CursorType;

        private _HoverRow: number = -1;
        private _Element: UIElement = null;
        private _InGrid: boolean = false;

        CreateElement(): UIElement {
            var el = new Border();
            
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
            Fayde.Controls.Panel.SetZIndex(this._Element, -10);
            Grid.SetColumnSpan(this._Element, grid.ColumnDefinitions.Count);
            grid.MouseMove.Subscribe(this._MouseMove, this);
            grid.MouseEnter.Subscribe(this._MouseEnter, this);
            grid.MouseLeave.Subscribe(this._MouseLeave, this);
            this.OnHoverRowChanged(-1, -1);
        }
        OnDetached(gic: GridItemsControl) {
            super.OnDetached(gic);
            var grid = gic.ItemsPresenter.Panel;
            grid.MouseMove.Unsubscribe(this._MouseMove, this);
            grid.MouseEnter.Unsubscribe(this._MouseEnter, this);
            grid.MouseLeave.Unsubscribe(this._MouseLeave, this);
            grid.Children.Remove(this._Element);
            this._Element = null;
        }
        private _MouseMove(sender: any, e: Input.MouseEventArgs) {
            var grid = <Grid>sender;
            var pos = e.GetPosition(grid);
            this._SetHoverRow(isInGrid(pos.X, grid) ? getRow(pos.Y, grid) : -1);
        }
        private _MouseEnter(sender: any, e: Input.MouseEventArgs) {
            this._InGrid = true;
            var grid = <Grid>sender;
            var pos = e.GetPosition(grid);
            this._SetHoverRow(isInGrid(pos.X, grid) ? getRow(pos.Y, grid) : -1);
        }
        private _MouseLeave(sender: any, e: Input.MouseEventArgs) {
            this._InGrid = false;
            this._SetHoverRow(-1);
        }
        private _SetHoverRow(row: number) {
            if (this._HoverRow === row)
                return;
            var oldRow = this._HoverRow;
            this._HoverRow = row;
            this.OnHoverRowChanged(oldRow, row);
        }
        OnHoverRowChanged(oldRow: number, newRow: number) {
            var el = this._Element;
            if (!el)
                return;
            el.Visibility = newRow > -1 ? Visibility.Visible : Visibility.Collapsed;
            Grid.SetRow(el, newRow > -1 ? newRow : 0);
        }
    }

    function isInGrid(posX: number, grid: Grid): boolean {
        if (posX < 0 || posX >= grid.ActualWidth)
            return false;
        for (var enumerator = grid.ColumnDefinitions.GetEnumerator(); enumerator.MoveNext();) {
            posX -= enumerator.Current.ActualWidth;
            if (posX < 0)
                return true;
        }
        return false;
    }
    function getRow(posY: number, grid: Grid): number {
        if (posY < 0)
            return i;
        for (var i = 0, enumerator = grid.RowDefinitions.GetEnumerator(); posY > 0 && enumerator.MoveNext(); i++) {
            posY -= enumerator.Current.ActualHeight;
            if (posY < 0)
                return i;
        }
        return -1;
    }
}