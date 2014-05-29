module Fayde.Experimental {
    import TextBlock = Fayde.Controls.TextBlock;
    import TextBox = Fayde.Controls.TextBox;

    export class GridTextCell extends GridCell {
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, GridTextCell, undefined, (d, args) => (<GridTextCell>d).OnDisplayMemberPathChanged(args.OldValue, args.NewValue));
        DisplayMemberPath: string;
        OnDisplayMemberPathChanged(oldPath: string, newPath: string) {
            this.UpdateDisplayMember();
        }

        OnIsEditingChanged(oldIsEditing: boolean, newIsEditing: boolean) {
            super.OnIsEditingChanged(oldIsEditing, newIsEditing);
            this.UpdateVisualState();
        }

        private _Presenter: TextBlock = null;
        private _Editor: TextBox = null;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this._Presenter = <TextBlock>this.GetTemplateChild("PresentingTextBlock", TextBlock);
            this._Editor = <TextBox>this.GetTemplateChild("EditingTextBox", TextBox);
            this.UpdateDisplayMember();
            this.UpdateVisualState();
        }

        GoToStates(gotoFunc: (state: string) => boolean) {
            super.GoToStates(gotoFunc);
            this.GoToStateEditing(gotoFunc);
        }
        GoToStateEditing(gotoFunc: (state: string) => boolean): boolean {
            return gotoFunc(this.IsEditing ? "Edit" : "Display");
        }

        private UpdateDisplayMember() {
            var binding: Data.Binding;
            var path = this.DisplayMemberPath;

            if (this._Presenter) {
                this._Presenter.SetBinding(TextBlock.TextProperty, new Data.Binding(path));
            }

            if (this._Editor) {
                if (!path)
                    throw new ArgumentException("DisplayMemberPath cannot be null for editable GridTextCell");
                binding = new Data.Binding(path);
                binding.UpdateSourceTrigger = Data.UpdateSourceTrigger.PropertyChanged;
                binding.Mode = Data.BindingMode.TwoWay;
                this._Editor.SetBinding(TextBox.TextProperty, binding);
            }
        }
    }
    Fayde.Controls.TemplateVisualStates(GridTextCell,
        { GroupName: "EditStates", Name: "Display" },
        { GroupName: "EditStates", Name: "Edit" });
    Fayde.Controls.TemplateParts(GridTextCell, 
        { Name: "PresentingTextBlock", Type: TextBlock },
        { Name: "EditingTextBox", Type: TextBox });
} 