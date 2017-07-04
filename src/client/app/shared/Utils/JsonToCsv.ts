export class JsonToCsv {
    static ConvertToCSV(objArray: Array<any>): string {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";
        for (var index in objArray[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
                line += '"' + array[i][index] +  '"';
            }
            str += line + '\r\n';
        }
        return str;
    }
    static download(csvData: string, filename?: string) {
        var a = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvData], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename ? filename : 'robinhood-data.csv';
        a.click();
    }
    static ExportAsCsv(objArray: Array<any>, filename?: string) {
        const data = objArray.map(o => this.FlattenObject(o));
        const csv = this.ConvertToCSV(data);
        this.download(csv, filename);
    }
    static FlattenObject(ob:any) {
        var toReturn:any = {};
        for (var i in ob) {
            if (!ob.hasOwnProperty(i)) continue;

            if (((typeof ob[i]) == 'object' && ob[i] !== null)) {
                var flatObject = this.FlattenObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue;
                    toReturn[i + '.' + x] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    }
}