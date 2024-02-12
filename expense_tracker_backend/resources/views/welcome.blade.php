<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    @foreach ($data as $category)
        <h2>category: {{ $category}}</h2>
        @foreach ($category->transactions as $transaction)
            <p>transactions: {{ $transaction }}</p>
        @endforeach
    @endforeach
</body>
</html>
