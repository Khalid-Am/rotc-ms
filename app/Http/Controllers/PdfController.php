<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Officer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\Browsershot\Browsershot;

class PdfController extends Controller
{
    public function generate_officers_list() {

        $officers = Officer::where('id', '!=', 1)
                            ->orderBy('lastName', 'asc')
                            ->orderBy('firstName', 'asc')
                            ->get();


        $data = ['title' => 'Officers', 'officers' => $officers];

        $template = view('PDFs.officers.officers_list', compact('data'))->render();

        Browsershot::html($template)
                    ->showBackground()
                    ->landscape()
                    ->margins(4, 4, 4, 4)
                    ->save(storage_path('app/public/officers-list.pdf'));


        activity()->useLog('pdf')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log("Printed an officers' list");

        return response()->file(storage_path('app/public/officers-list.pdf'), [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="officers-list.pdf"',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    public function generate_1cl_list() {

        $officers = Officer::where('id', '!=', 1)
                            ->Where('class', '=', '1cl')
                            ->orderBy('lastName', 'asc')
                            ->orderBy('firstName', 'asc')
                            ->get();

        $data = ['title' => '1CL Officers', 'officers' => $officers ];

        $template = view('PDFs.officers.officers_list', compact('data'))->render();

        Browsershot::html($template)
                    ->showBackground()
                    ->landscape()
                    ->margins(4, 4, 4, 4)
                    ->save(storage_path('app/public/1cl-list.pdf'));

        activity()->useLog('pdf')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log("Printed 1CL officers'list");

        return response()->file(storage_path('app/public/1cl-list.pdf'), [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="1cl-list.pdf"',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    public function generate_2cl_list() {

        $officers = Officer::where('id', '!=', 1)
                            ->Where('class', '=', '2cl')
                            ->orderBy('lastName', 'asc')
                            ->orderBy('firstName', 'asc')
                            ->get();

        $data = ['title' => '2CL Officers', 'officers' => $officers ];

        $template = view('PDFs.officers.officers_list', compact('data'))->render();

        Browsershot::html($template)
                    ->showBackground()
                    ->landscape()
                    ->margins(4, 4, 4, 4)
                    ->save(storage_path('app/public/2cl-list.pdf'));

        activity()->useLog('pdf')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log("Printed 2CL officers' list");

        return response()->file(storage_path('app/public/2cl-list.pdf'), [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="2cl-list.pdf"',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    public function generate_3cl_list() {

        $officers = Officer::where('id', '!=', 1)
                            ->Where('class', '=', '3cl')
                            ->orderBy('lastName', 'asc')
                            ->orderBy('firstName', 'asc')
                            ->get();

        $data = ['title' => '3CL Officers', 'officers' => $officers ];

        $template = view('PDFs.officers.officers_list', compact('data'))->render();

        Browsershot::html($template)
                    ->showBackground()
                    ->landscape()
                    ->margins(4, 4, 4, 4)
                    ->save(storage_path('app/public/3cl-list.pdf'));

        activity()->useLog('pdf')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log("Printed 3CL officers' list");

        return response()->file(storage_path('app/public/3cl-list.pdf'), [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="3cl-list.pdf"',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    public function generate_cocc_list() {

        $officers = Officer::where('id', '!=', 1)
                            ->Where('class', '=', '4cl')
                            ->orderBy('lastName', 'asc')
                            ->orderBy('firstName', 'asc')
                            ->get();

        $data = ['title' => 'COCC Officers', 'officers' => $officers ];

        $template = view('PDFs.officers.officers_list', compact('data'))->render();

        Browsershot::html($template)
                    ->showBackground()
                    ->landscape()
                    ->margins(4, 4, 4, 4)
                    ->save(storage_path('app/public/cocc-list.pdf'));

        activity()->useLog('pdf')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log("Printed COCC list");

        return response()->file(storage_path('app/public/cocc-list.pdf'), [
                        'Content-Type' => 'application/pdf',
                        'Content-Disposition' => 'inline; filename="cocc-list.pdf"',
                        'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    public function generate_attendance_list(Request $request) {

        logger('Generating attendance list for date: ' . $request->input('attendance_date'));
        
        $attendances = Attendance::with('signedBy')
                                    ->whereDate('signed_at', $request->input('attendance_date'))
                                    ->where('officer_id', '!=', 1)
                                    ->get();

        
        $finalAttendanceList = $this->process_attendance($attendances);
        $date = $request->input('attendance_date');

        $data = ['title' => 'Officers', 'date' => $date ,'attendanceList' => $finalAttendanceList];

        $template = view('PDFs.attendances.attendance_list', compact('data'))->render();

        Browsershot::html($template)
                    ->showBackground()
                    ->margins(4, 20, 4, 20)
                    ->save(storage_path('app/public/attendance-list.pdf'));

        activity()->useLog('pdf')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log("Printed " . Carbon::parse($date)->format('Y-m-d') . " attendance list");

        return response()->file(storage_path('app/public/attendance-list.pdf'), [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="attendance-list.pdf"',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    private function process_attendance($attendances) {

        $attendanceSummary = [];

        foreach($attendances as $attendance) {
            
            $userID = $attendance->signedBy->id;
            $fullname = $attendance->signedBy->firstName . ' ' . $attendance->signedBy->middleName . ' ' . $attendance->signedBy->lastName;
            $attendanceDate = Carbon::parse($attendance->signed_at);

            if(!isset($attendanceSummary[$userID])) {

                $attendanceSummary[$userID] = [
                    'id' => $userID,
                    'fullname' => $fullname,
                    'morning' => null,
                    'afternoon' => null,
                ];
            };

            $isMorning = $attendanceDate->format('H') < 12;

            if($isMorning) {
                $attendanceSummary[$userID]['morning'] = "{$attendanceDate->hour}{$attendanceDate->minute}H";
            }else {
                $attendanceSummary[$userID]['afternoon'] = "{$attendanceDate->hour}{$attendanceDate->minute}H";
            }

        }

        return array_values($attendanceSummary);
    }

}
