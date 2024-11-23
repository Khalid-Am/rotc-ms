@extends('PDFs.templates.officer_pdf')

@section('title', $data['title'])

@section('content')

<table class="w-full text-sm text-left rtl:text-right">
    <thead class="text-xs bg-green-700 text-white uppercase">
        <tr>
            <th scope="col" class="px-6 py-2">
                No.
            </th>
            <th scope="col" class="px-6 py-2">
                Last Name
            </th>
            <th scope="col" class="px-6 py-2">
                First Name
            </th>
            <th scope="col" class="px-6 py-2">
                Middle Name
            </th>
            <th scope="col" class="px-6 py-2">
                Program - Major
            </th>
            <th scope="col" class="px-6 py-2">
                Birthdate
            </th>
            <th scope="col" class="px-6 py-2">
                Religion
            </th>
            <th scope="col" class="px-6 py-2">
                Province
            </th>
            <th scope="col" class="px-6 py-2">
                Region
            </th>
            <th scope="col" class="px-6 py-2">
                Height
            </th>
        </tr>
    </thead>
    <tbody>
        @foreach ($data['officers'] as $officer)
        <tr class="bg-white border-b">
            <td class="px-6 py-4">
                {{ $loop->iteration }}
            </td>
            <td class="px-6 py-4">
                {{ $officer['lastName'] }}
            </td>
            <td class="px-6 py-4">
                {{ $officer['firstName'] }}
            </td>
            <td class="px-6 py-4">
                {{ $officer['middleName'] }}
            </td>
            <td class="px-6 py-4 text-nowrap">
                {{ $officer['program']}} {{ $officer['major']  ? '- ' . $officer['major'] : ""}}
            </td>
            <td class="px-6 py-4 text-nowrap">
                {{ $officer['birthdate'] }}
            </td>
            <td class="px-6 py-4">
                {{ $officer['religion'] }}
            </td>
            <td class="px-6 py-4">
                {{ $officer['province'] }}
            </td>
            <td class="px-6 py-4">
                {{ $officer['region'] }}
            </td>
            <td class="px-6 py-4 text-nowrap">
                {{ $officer['height_cm'] ? $officer['height_cm'] . " cm" : "" }}
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection