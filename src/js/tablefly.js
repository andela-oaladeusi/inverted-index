
let tableDraw = (dataIndex,length,fileName) =>{
let table_  = 'table_'+count;
table_ += '<table id="table_'+count+'">';
table_ +=  "<thead>" ;
table_ +=   "<tr>";
table_ += '<th>'+fileName+'</th>';
 for (let headLoop = 0; headLoop <= length; headLoop++) {
        if (headLoop === 0) {
            table_ += '<th>Terms</th>';
        }
        else {
            table_ += '<th>doc_' + headLoop + '</th>';
        }
    }
table_ +=   "</tr>" ;
table_ +=  "</thead>" ;
table_ +=  "<tbody>" ;

for (let index in dataIndex) {
   table_ += '<tr>';
        table_ += '<td>' + index + '</td>';
        for (let k = 0; k < length; k++) {
            if (dataIndex[index][k]) {
                table_ += '<td>' + '<i class = "fa fa-check"' +
                    'style = "font-size:15px"></i>' + '</td>';
            } else {
                table_+='<td>' + '<i class = "fa fa-times-circle-o"' +
                    'aria-hidden = "true"></i>' + '</td>';
            }
        }
        table_+='</tr>';
    }


table_ +=  "</tbody>" ;
table_ += "</table>" ;
count++;
return table_;
};

if(fileName==='all'){ 
    for(let id in dataIndex){
    fileName=id;
    length=invertedClass.jLength[id];
    dataIndex=dataIndex[id];
        $('.indexDiv').append(tableDraw(dataIndex,length,fileName));
    }
   }
