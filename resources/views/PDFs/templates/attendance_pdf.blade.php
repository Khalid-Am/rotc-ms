<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title', 'Document')</title>
    @vite('resources/js/app.jsx')
</head>
<body>

    <div class="flex flex-col justify-center mb-10">
        <img src={{ @asset('images/rotcms-logo.png') }} class="h-[125px] w-[125px] block self-center">
        <div class="text-center self-center flex flex-col">
            <span class="text-2xl font-bold">University of Southeastern Philippines</span>
            <span class="text-xl font-semibold"><i>National Service Training Program</i></span>
            <span class="text-xl font-semibold">Reserve Officers' Training Corps</span>
        </div>
    </div>
    
    <div class="space-y-4">
        <span class="">{{ $data['date'] }}</span>
        
        <p class="text-2xl font-bold text-center">ROTC {{ $data['title']}} Attendance List</p>

        @yield('content')
    </div>
</body>
</html>