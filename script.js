let tableDOM= document.getElementById("JSONTableDump");

fetch("./data.json").then(response=>{
    return response.json();
}).then(
    data=>{
        for (var i=0; i<data.length; i++){
            var plant= data[i];
            tableDOM.innerHTML=
            tableDOM.innerHTML+
            `<tr>
            <td class= "${plant.name}_name"> ${plant.name} </td>
            <td class= "${plant.name}_leaf_color"> ${plant.leaf.color} </td>
            <td class= "${plant.name}_leaf_shape"> ${plant.leaf.shape} </td>
            <td class= "${plant.name}_stem_color"> ${plant.stem.color} </td>
            </tr>
            `   
        }
    }
);