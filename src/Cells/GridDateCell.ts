/// <reference path="GridInputCell.ts" />

module Fayde.Experimental {
    export class GridDateCell extends GridInputCell {
        constructor() {
            super();
            this.DefaultStyleKey = GridDateCell;
        }
    }
    Fayde.Controls.TemplateParts(GridDateCell, 
        { Name: "Presenter", Type: FrameworkElement },
        { Name: "Editor", Type: FrameworkElement });
    Fayde.Controls.TemplateVisualStates(GridDateCell,
        { GroupName: "EditStates", Name: "Display" },
        { GroupName: "EditStates", Name: "Edit" },
        { GroupName: "EditStates", Name: "NotEditable" });
}  