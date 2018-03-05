<?php

use Illuminate\Database\Seeder;
use Faker\Factory;
use App\Idea;

class IdeasTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $faker = Factory::create();
    for ($i = 0; $i < 25; $i++) {
      Idea::create(
        [
          'title' => $faker->word,
          'description' => $faker->paragraph,
        ]
      );
    }
  }
}
