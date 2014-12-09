module Fayde.Experimental {
    export class GridCell extends Fayde.Controls.ContentControl {
        static IsEditingProperty = DependencyProperty.Register("IsEditing", () => Boolean, GridCell, false, (d, args) => (<GridCell>d).OnIsEditingChanged(args.OldValue, args.NewValue));
        static IsEditableProperty = DependencyProperty.Register("IsEditable", () => Boolean, GridCell, false, (d, args) => (<GridCell>d).OnIsEditableChanged(args.OldValue, args.NewValue));
        static EditTemplateProperty = DependencyProperty.Register("EditTemplate", () => DataTemplate, GridCell);
        IsEditing: boolean;
        IsEditable: boolean;
        EditTemplate: DataTemplate;
        
        OnIsEditingChanged(oldIsEditing: boolean, newIsEditing: boolean) {
            this.UpdateVisualState();
        }
        OnIsEditableChanged(oldIsEditable: boolean, newIsEditable: boolean) {
            this.UpdateVisualState();
        }

        constructor() {
            super();
            this.DefaultStyleKey = GridCell;
        }

        OnApplyTemplate() {
            this.UpdateVisualState();
            super.OnApplyTemplate();
        }

        GoToStates(gotoFunc: (state: string) => boolean) {
            super.GoToStates(gotoFunc);
            this.GoToStateEditing(gotoFunc);
        }
        GoToStateEditing(gotoFunc: (state: string) => boolean): boolean {
            return gotoFunc(this.IsEditing ? (this.IsEditable ? "Edit" : "NotEditable") : "Display");
        }
    }
    Fayde.Controls.TemplateVisualStates(GridCell,
        { GroupName: "EditStates", Name: "Display" },
        { GroupName: "EditStates", Name: "Edit" },
        { GroupName: "EditStates", Name: "NotEditable" });
} 