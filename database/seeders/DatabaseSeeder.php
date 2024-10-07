<?php

namespace Database\Seeders;

use App\Models\Officer;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Officer::factory()->create([
            'firstName' => 'USeP',
            'middleName' => 'ROTC',
            'lastName' => 'Admin',
            'program' => null,
            'class' => null,
            'blood_type' => 'unknown'
        ]);

        Officer::factory(10)->create();

        User::factory()->create([
            'officer_id' => Officer::first()->id,
            'role' => 'corps',
            'username' => 'rotc_admin',
            'password' => bcrypt('admin12345'),
        ]);

        Task::factory()->count(100)->create();

    }
}
