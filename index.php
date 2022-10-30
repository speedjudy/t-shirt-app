<!DOCTYPE html>
<html lang="en">

<head>
    <title>T-Shirt</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="assets/js/jquery-3.6.0.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/main.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
</head>
<?php include("toastr.php"); ?>
<body>
    <div class="container-fluid main">
    	<div class="flex justify-content-center text-center">
    		<img src="assets/img/shirt.png" />
	    	<p class="name-display">ABCDEFGHIJ</p>
	    	<p class="number-display">00</p>
    	</div>
    	<div class="display">
    		<div class="name-edit">
    			<span class="bg-color ">NOM</span>
    			<input id="name" onchange="nameChange(event)" />
    		</div>
    		<div class="number-edit">
    			<span class="bg-color ">NUMERO</span>
    			<input id="number" />
    		</div>
    	</div>
        </div>
    	<div class="text-center">
			<button onclick="showEditor()" class="bg-color edit-btn">EDITER</button>
    	</div>
    </div>
    <script>
        var data = {
            name:'', number:'', flag:'save'
        }
        function showEditor(argument) {
        	$('.display')[0].style.display = 'inline-flex';
            $('button')[0].style.display = 'none';
            $('#name').focus()
        }
        $('#name')[0].addEventListener('input', nameChange, false);
        $('#number')[0].addEventListener('input', numberChange, false);
        $('#name').on('keyup', function(e){
            if (e.key === 'Enter' || e.keyCode === 13) {
                save();
            }
        });
        $('#number').on('keyup', function(e){
            if (e.key === 'Enter' || e.keyCode === 13) {
                save();
            }
        });
        function nameChange(e){
            if(e.target.value.length < 11){
                $('.name-display')[0].innerText = e.target.value;
                data.name = e.target.value;
            } else {
                e.target.value = e.target.value.slice(0, 10);
            }
        }
        function numberChange(e){
            if(!isNaN(e.target.value) && e.target.value.length < 3){
                $('.number-display')[0].innerText = e.target.value;
                data.number = e.target.value;
            } else {
                e.target.value = e.target.value.slice(0, 2);
            }
        }
        function save() {
            $('.display')[0].style.display = 'none';
            $('button')[0].style.display = 'inline';
            $.post(
                "server.php", 
                data,
                function(res) {
                    toastr.success("Success!");
                }
            );
        }
    </script>
</body>

</html>