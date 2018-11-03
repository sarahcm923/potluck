var data;
var sendData={};
function getNewData(dataObj){
  var name = $("#nameField").val();
  var category = $('input[name=category]:checked').val();
  var item = $('#descField').val();
  dataObj[name]={"category":category,"item":item}
  return dataObj


}
//jquery . ready function
$(function() {
    //async js call
    $.ajax({url: "http://ec2-18-222-27-209.us-east-2.compute.amazonaws.com:5984/potluck/72c3681b5dd2f10a2d61f4eecd001ab1",
       success: function(result){
            data =result;
            console.log(result);
            //need to do this here because call is async so we need to wait for data before drawing the table.
            var table = d3.select("#dataTable");
            for (key in data.dataObj){
                if(key!=""){
                  var tr = table.append("tr");
                  tr.append("td").text(key);
                  tr.append("td").text(data.dataObj[key].category);
                  tr.append("td").text(data.dataObj[key].item);
                }
            }

        },
        error: function(xhr){
          console.log ("An error occured: " + xhr.status + " " + xhr.statusText);
        }
      });

  //jquery to attach a click listener to our button
  $('#btnSend').click(function(){
    event.preventDefault();
    sendData={};

    sendData["dataObj"] = getNewData(data.dataObj);
    sendData["_rev"] = data._rev;
    //another async call to the database
    $.ajax({url: "http://ec2-18-222-27-209.us-east-2.compute.amazonaws.com:5984/potluck/72c3681b5dd2f10a2d61f4eecd001ab1",  type: "put",
    dataType: "json",
    data:JSON.stringify(sendData),
      success: function(result){
        console.log(result);
        location.reload();
      },
      error: function(xhr){
        console.log ("An error occured: " + xhr.status + " " + xhr.statusText);
        alert("data is out of sync try reloading the page");
      }
   });
 });





});
