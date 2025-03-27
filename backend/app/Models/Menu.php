<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    use HasFactory;

    // All attribute for a Menu
    protected $fillable = [
        'name',
        'restaurant_id',
        'image',
        'category',
        'ingredients',
        'description',
        'price'
    ];

    // A menu belongs to a restaurant
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
