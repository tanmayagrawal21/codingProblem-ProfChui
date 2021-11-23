google.charts.load('current', {packages:["orgchart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    
    fetch("./data.json").then(response=>{
    return response.json();
    }).then(
        response=>{
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('string', 'Manager');
            var rows= []
             // For each orgchart box, provide the name, manager, and tooltip to show.
             rows.push(
                 [{'v':'All Plants', 'f':'All Plants'}, ''],
              )
            
            for(var i=0; i<response.length; i++){
                rows.push(
                    [{'v':`${response[i].name}_name`,'f':`${response[i].name}`},'All Plants'],
                );  
            }

            for(var i=0; i<response.length; i++){
                let item= response[i];
                if (item.leaf.color!='' || item.leaf.shape!=''){
                    rows.push(
                        [{'v':`Leaf${item.name}`, f:'Leaf'}, `${item.name}_name`],
                    );
                }
            }
            for(var i=0; i<response.length; i++){
                let item= response[i];
                if (item.stem.color!=''){
                    rows.push(
                        [{'v':`Stem${item.name}`, f:'Stem'}, `${item.name}_name`],
                    );
                }
            }
            for(var i=0; i<response.length; i++){
                let item= response[i];
                if(item.leaf.color!=''){
                    rows.push(
                        [{'v':`${item.name}_leaf_color`, f:`<div class=${item.name}_leaf_color>${item.leaf.color}</div>`}, `Leaf${item.name}`]
                    )
                }
                if(item.leaf.shape!=''){
                    rows.push(
                        [{'v':`${item.name}_leaf_shape`, f:`<div class=${item.name}_leaf_shape>${item.leaf.shape}</div>`}, `Leaf${item.name}`]
                   )
                }
                if(item.stem.color!=''){
                    rows.push(
                        [{'v':`${item.name}_stem_color`, f:`<div class=${item.name}_stem_color>${item.stem.color}<div>`}, `Stem${item.name}`]
                    )
                }
            } 
            data.addRows(rows);

            var chartDiv= document.getElementById("chartDiv");
            chartDiv.addEventListener("click", ()=>{
            var selection= chart.getSelection();
            selection=selection[0].row;
            var className= rows[selection][0].v;
            for(var i=0; i<rows.length; i++){
                var thisItem=document.querySelector(`.${rows[i][0].v}`);
                if(thisItem!=null){
                    thisItem.style.backgroundColor="white";
                }
            }
            var item= document.querySelector(`.${className}`);
            item.style.backgroundColor="yellow";
           })



           
            // Create the chart.
            var chart = new google.visualization.OrgChart(document.getElementById('chartDiv'));
            // Draw the chart, setting the allowHtml option to true for the tooltips.
            chart.draw(data, {'allowHtml':true});

        });




}