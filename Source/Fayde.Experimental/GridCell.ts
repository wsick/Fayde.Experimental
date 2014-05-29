module Fayde.Experimental {
    export class GridCell extends Fayde.Controls.ContentControl {
        static IsEditingProperty = DependencyProperty.Register("IsEditing", () => Boolean, GridCell, false, (d, args) => (<GridCell>d).OnIsEditingChanged(args.OldValue, args.NewValue));
        IsEditing: boolean;
        private OnIsEditingChanged(oldIsEditing: boolean, newIsEditing: boolean) {
            this.SetCurrentValue(GridCell.ActiveTemplateProperty, newIsEditing ? this.EditTemplate || this.ContentTemplate : this.ContentTemplate);
        }
        
        static EditTemplateProperty = DependencyProperty.Register("EditTemplate", () => DataTemplate, GridCell, undefined, (d, args) => (<GridCell>d).OnEditTemplateChanged(args.OldValue, args.NewValue));
        EditTemplate: DataTemplate;
        OnEditTemplateChanged(oldTemplate: DataTemplate, newTemplate: DataTemplate) {
            if (this.IsEditing)
                this.SetCurrentValue(GridCell.ActiveTemplateProperty, newTemplate || this.ContentTemplate);
        }

        static ActiveTemplateProperty = DependencyProperty.RegisterReadOnly("ActiveTemplate", () => DataTemplate, GridCell);
        ActiveTemplate: DataTemplate;
        
        OnContentTemplateChanged(oldContentTemplate: DataTemplate, newContentTemplate: DataTemplate) {
            super.OnContentTemplateChanged(oldContentTemplate, newContentTemplate);
            if (!this.IsEditing)
                this.SetCurrentValue(GridCell.ActiveTemplateProperty, newContentTemplate);
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }
    }
} 