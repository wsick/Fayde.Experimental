/// <reference path="GridInputCell.ts" />

module Fayde.Experimental {
    export class GridNumericCell extends GridInputCell {
        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.EditProperty = "Value";
        }
    }
    Fayde.Controls.TemplateParts(GridNumericCell, 
        { Name: "Presenter", Type: FrameworkElement },
        { Name: "Editor", Type: FrameworkElement });
    Fayde.Controls.TemplateVisualStates(GridCell,
        { GroupName: "EditStates", Name: "Display" },
        { GroupName: "EditStates", Name: "Edit" },
        { GroupName: "EditStates", Name: "NotEditable" });
} 