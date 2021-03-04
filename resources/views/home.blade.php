<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <title>ThatzWeather</title>
</head>
<body>
    <div class="container mt-5">
    <img class="img-fluid img" src="{{asset('img/Bitmap.png')}}">
    </div>

    <div class="container">
        <form action="{{url('consulta')}}" class="form" method="GET">
            <input type="text" class="form-control input-postal" name="cpostal" id="cpostal" placeholder="Introduce un codigo postal"><br>
            <input type="submit" class="input-submit btn btn-primary" name="consultar" value="Consultar">
        </form>
    </div>
</body>
</html>