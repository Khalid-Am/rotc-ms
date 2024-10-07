<?php

namespace App\Http\Requests;

use App\Models\Officer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOfficerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {   
        $officer = $this->route('officer');
        
        return [

                'student_id' => ['nullable', 'string', 'max:255', Rule::unique(Officer::class, 'student_id')->ignore($officer->id)],
                'rank' => ['nullable', 'string', 'max:255'],
                'class' => ['nullable', 'string', Rule::in(['1cl', '2cl', '3cl', '4cl'])],
                'firstName' => ['required', 'string', 'max:255', ],
                'middleName' => ['nullable', 'string', 'max:255', ],
                'lastName' => ['required', 'string', 'max:255', ],
                'program' => ['nullable', 'string', 'max:255', ],
                'major' => ['nullable', 'string', 'max:255', ],
                'birthdate' => ['nullable', 'date'],
                'religion' => ['nullable', 'string', 'max:255'],
                'blood_type' => ['nullable', 'string', 'max:255', Rule::in(['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-', 'unknown'])],
                'province' => ['nullable', 'string', 'max:255'],
                'region' => ['nullable', 'string', 'max:255'],
                'height_cm' => ['nullable', 'numeric'],
        ];
    }
}
