module Fayde.Experimental {
    export module EnumerableEx {
        export function ToArray<T>(en: IEnumerable<T>) {
            var arr: T[] = [];
            for (var enu = en.getEnumerator(); enu.moveNext();) {
                arr.push(enu.current);
            }
            return arr;
        }
    }
}