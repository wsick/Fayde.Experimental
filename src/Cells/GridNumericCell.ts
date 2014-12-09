/// <reference path="GridInputCell.ts" />

module Fayde.Experimental {
    export class GridNumericCell extends GridInputCell {
        constructor() {
            super();
            this.DefaultStyleKey = GridNumericCell;
            this.EditProperty = "Value";
        }
    }
    Fayde.Controls.TemplateParts(GridNumericCell, 
        { Name: "Presenter", Type: FrameworkElement },
        { Name: "Editor", Type: FrameworkElement });
    Fayde.Controls.TemplateVisualStates(GridNumericCell,
        { GroupName: "EditStates", Name: "Display" },
        { GroupName: "EditStates", Name: "Edit" },
        { GroupName: "EditStates", Name: "NotEditable" });
} 