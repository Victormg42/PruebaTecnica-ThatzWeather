<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <script src="{{asset('js/ajax.js')}}"></script>
    <title>ThatzWeather</title>
</head>
<body>
    <div class="container container-sm mt-5">
        <img class="img-fluid img" src="{{asset('img/Bitmap.png')}}">
        <form style="margin-top: -6%; margin-left: 10%;" method="GET" action="{{url('/')}}">
            <input class="btn btn-primary" type="submit" name="Volver" value="Volver">
        </form>
    </div>
    
    <input type="hidden" name="postal" id="postal" value="{{$_GET['cpostal']}}"></input>

    <div class="container tiempo" id="tiempo">

    </div>
    
    <div class="container top5" id="top5">
        
    </div>
    

</body>
</html>