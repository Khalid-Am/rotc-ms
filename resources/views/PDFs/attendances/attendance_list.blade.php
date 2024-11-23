@extends('PDFs.templates.attendance_pdf')

@section('title', $data['title'])

@section('content')
<table class="w-full text-sm text-left rtl:text-right">
    <thead class="text-xs bg-green-700 text-white uppercase">
        <tr>
            <th scope="col" class="px-6 py-1" rowspan="2">
                No.
            </th>
            <th scope="col" class="px-6 py-1" rowspan="2">
                Name
            </th>
            <th scope="col" class="px-6 py-1 text-center" colspan="2">
                Signature
            </th>
        </tr>
        <tr>
            <th scope="col" class="px-6 py-1 text-center">
                Morning
            </th>
            <th scope="col" class="px-6 py-1 text-center">
                Afternoon
            </th>
        </tr>
    </thead>
    <tbody>
        @foreach ($data['attendanceList'] as $attendance)
        <tr class="bg-white border-b">
            <td class="px-6 py-4">
                {{ $loop->iteration }}
            </td>
            <td class="px-6 py-4">
                {{ $attendance['fullname'] }}
            </td>
            <td class="px-6 py-4  text-center">
                {{ $attendance['morning'] }}
            </td>
            <td class="px-6 py-4  text-center">
                {{ $attendance['afternoon'] }}
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection