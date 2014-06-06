class TestItem extends Fayde.MVVM.ObservableObject {
    FirstName: string;
    LastName: string;
    Age: number;
    SpecialDay: DateTime;
    constructor(firstName?: string, lastName?: string, age?: number, specialDay?: DateTime) {
        super();
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Age = age;
        this.SpecialDay = specialDay;
    }
}
Fayde.MVVM.NotifyProperties(TestItem, ["FirstName", "LastName", "Age", "SpecialDay"]);
export = TestItem; 