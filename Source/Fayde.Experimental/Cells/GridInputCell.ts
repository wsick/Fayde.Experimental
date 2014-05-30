 /// <reference path="GridCell.ts" />

 module Fayde.Experimental {
    export class GridInputCell extends GridCell {
        static DisplayPropertyProperty = DependencyProperty.Register("DisplayProperty", () => String, GridInputCell, "Text");
        static EditPropertyProperty = DependencyProperty.Register("EditProperty", () => String, GridInputCell, "Text");
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, GridInputCell, undefined, (d, args) => (<GridInputCell>d).OnDisplayMemberPathChanged(args.OldValue, args.NewValue));
        static ConverterProperty = DependencyProperty.Register("Converter", () => Fayde.Data.IValueConverter_, GridInputCell);
        static StringFormatProperty = DependencyProperty.Register("StringFormat", () => String, GridInputCell);
        DisplayProperty: string;
        EditProperty: string;
        DisplayMemberPath: string;
        Converter: Fayde.Data.IValueConverter;
        StringFormat: string;

        OnDisplayPropertyChanged(oldProperty: string, newProperty: string) {
            this.UpdateDisplayMember();
        }
        OnEditPropertyChanged(oldProperty: string, newProperty: string) {
            this.UpdateDisplayMember();
        }
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

        private _Presenter: FrameworkElement = null;
        private _Editor: FrameworkElement = null;

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this._Presenter = <FrameworkElement>this.GetTemplateChild("Presenter", FrameworkElement);
            this._Editor = <FrameworkElement>this.GetTemplateChild("Editor", FrameworkElement);
            this.UpdateDisplayMember();
        }
        
        UpdateDisplayMember() {
            var binding: Data.Binding;
            var path = this.DisplayMemberPath;
            var propd: DependencyProperty;

            if (this._Presenter) {
                binding = new Data.Binding(path);
                binding.Converter = this.Converter;
                binding.StringFormat = this.StringFormat;
                
                propd = DependencyProperty.GetDependencyProperty(this._Presenter.constructor, this.DisplayProperty);
                this._Presenter.SetBinding(propd, binding);
            }
            
            if (this.IsEditable && this._Editor) {
                if (!path)
                    throw new ArgumentException("DisplayMemberPath cannot be null for editable GridInputCell");
                binding = new Data.Binding(path);
                binding.UpdateSourceTrigger = Data.UpdateSourceTrigger.PropertyChanged;
                binding.Mode = Data.BindingMode.TwoWay;
                binding.Converter = this.Converter;

                propd = DependencyProperty.GetDependencyProperty(this._Editor.constructor, this.EditProperty);
                this._Editor.SetBinding(propd, binding);
            }
        }
    }
 }