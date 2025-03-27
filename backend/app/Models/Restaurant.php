<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Restaurant extends Model
{
    use HasFactory;

    // The attribute of a restaurant
    protected $fillable = [
        'name',
        'address',
        'city',
        'phone',
        'email',
        'description',
        'opening_hours',
        'images'
    ];

    // A restaurant has many menus
    public function menus()
    {
        return $this->hasMany(Menu::class);
    }
}
