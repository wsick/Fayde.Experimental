module Fayde.Experimental {
    import TextBlock = Fayde.Controls.TextBlock;
    import TextBox = Fayde.Controls.TextBox;

    export class GridTextCell extends GridCell {
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, GridTextCell, undefined, (d, args) => (<GridTextCell>d).OnDisplayMemberPathChanged(args.OldValue, args.NewValue));
        static ConverterProperty = DependencyProperty.Register("Converter", () => Fayde.Data.IValueConverter_, GridTextCell);
        static StringFormatProperty = DependencyProperty.Register("StringFormat", () => String, GridTextCell);
        DisplayMemberPath: string;
        Converter: Fayde.Data.IValueConverter;
        StringFormat: string;

        OnDisplayMemberPathChanged(oldPath: string, newPath: string) {
            this.UpdateDisplayMember();
        }
        OnConverterChanged(oldConverter: string, newConverter: string) {
            this.UpdateDisplayMember();
        }
        OnStringFormatChanged(oldFormat: string, newFormat: string) {
            this.UpdateDisplayMember();
        }

        OnIsEditableChanged(oldIsEditable: boolean, newIsEditable: boolean) {
            super.OnIsEditableChanged(oldIsEditable, newIsEditable);
            this.UpdateDisplayMember();
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
        }

        private UpdateDisplayMember() {
            var binding: Data.Binding;
            var path = this.DisplayMemberPath;

            if (this._Presenter) {
                binding = new Data.Binding(path);
                binding.Converter = this.Converter;
                binding.StringFormat = this.StringFormat;
                this._Presenter.SetBinding(TextBlock.TextProperty, binding);
            }
            
            if (this.IsEditable && this._Editor) {
                if (!path)
                    throw new ArgumentException("DisplayMemberPath cannot be null for editable GridTextCell");
                binding = new Data.Binding(path);
                binding.UpdateSourceTrigger = Data.UpdateSourceTrigger.PropertyChanged;
                binding.Mode = Data.BindingMode.TwoWay;
                binding.Converter = this.Converter;
                this._Editor.SetBinding(TextBox.TextProperty, binding);
            }
        }
    }
    Fayde.Controls.TemplateParts(GridTextCell, 
        { Name: "PresentingTextBlock", Type: TextBlock },
        { Name: "EditingTextBox", Type: TextBox });
} 