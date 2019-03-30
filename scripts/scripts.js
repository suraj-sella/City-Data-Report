$(function () {

    var birthmin = 0;
    var birthmax = 2000;
    var populationmin = 0;
    var populationmax = 10000000;
    var area = 10000;
    var height = 0;
    var growth = 0;
    var dataset=[];
    var table = $('#mytable').DataTable();
    
    var populateTable = function(){
        $.ajax({
            type: 'POST',
            url: 'api/getdata.php',
            data: {
                'area': area,
                'height': height,
                'growth': growth,
                'birthmin': birthmin,
                'birthmax': birthmax,
                'populationmin': populationmin,
                'populationmax': populationmax
            },
            dataType: 'json',
            beforeSend: function () {
                // console.log('beforeSend');
            },
            success: function (data) {
                // console.log("Success: ", data);
                var row = '';
                // $("#mytable tbody").empty();
                dataset = [];
                for (let i = 0; i < data.length; i++) {
                    dataset.push([data[i]['name'], data[i]['area'], data[i]['population'], data[i]['height'], data[i]['density'], data[i]['births'], data[i]['growth']]);
                }
                table.clear().rows.add(dataset).draw();
            },
            error: function (xhr) {
                console.log("Error: ", xhr.statusText + xhr.responseText);
                table.clear();
            },
            complete: function () {
                // console.log("Complete!");
            }
        });
    }

    populateTable();
    
    $("#area").on('input', function(){
        area = $(this).val();
        setTimeout(function(){ 
            populateTable();
        }, 1200);
    });
    
    $("#height").on('input', function(){
        height = $(this).val();
        setTimeout(function(){ 
            populateTable();
        }, 1200);
    });
    
    $("#growth").on('input', function(){
        growth = $(this).val();
        setTimeout(function(){ 
            populateTable();
        }, 1200);
    });

    $("#birthmin").on('input', function(){
        birthmin = $(this).val();
        setTimeout(function(){ 
            populateTable();
        }, 1200);
    });

    $("#birthmax").on('input', function(){
        birthmax = $(this).val();
        setTimeout(function(){ 
            populateTable();
        }, 1200);
    });

    $("#populationmin").on('input', function(){
        populationmin = $(this).val();
        setTimeout(function(){ 
            populateTable();
        }, 1200);
    });

    $("#populationmax").on('input', function(){
        populationmax = $(this).val();
        setTimeout(function(){ 
            populateTable();
        }, 1200);
    });
});