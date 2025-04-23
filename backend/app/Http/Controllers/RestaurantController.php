<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    /**
     * Fetch all restaurants
     */
    public function getRestaurants()
    {
        return response()->json(Restaurant::all(), 200);
    }

    /**
     * Fetch a single restaurant by ID
     */
    public function getRestaurant($id)
    {
        $restaurant = Restaurant::find($id);
        if (!$restaurant) {
            return response()->json(['error' => 'Restaurant not found'], 404);
        }
        return response()->json($restaurant, 200);
    }

    /**
     * Add a new restaurant
     */
    public function addRestaurant(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'email' => 'required|string|email|unique:restaurants',
            'description' => 'nullable|string',
            'opening_hours' => 'nullable|string',
            'images' => 'nullable|string',
        ]);

        // Check validation failure
        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $validator->errors(),
            ], 422);
        }

        // Create restaurant if validation passes
        $restaurant = Restaurant::create($request->all());
        return response()->json([
            'message' => 'Restaurant created successfully!',
            'restaurant' => $restaurant
        ], 201);
    }

    /**
     * Update an existing restaurant
     */
    public function updateRestaurant(Request $request, $id)
    {
        $restaurant = Restaurant::find($id);
        if (!$restaurant) {
            return response()->json(['error' => 'Restaurant not found'], 404);
        }

        // Validate update request
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'address' => 'string|max:255',
            'city' => 'string|max:255',
            'phone' => 'string|max:15',
            'email' => 'string|email|unique:restaurants,email,' . $id,
            'description' => 'nullable|string',
            'opening_hours' => 'nullable|string',
            'images' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $validator->errors(),
            ], 422);
        }

        $restaurant->update($request->all());
        return response()->json([
            'message' => 'Restaurant updated successfully', 
            'restaurant' => $restaurant], 200);
    }

    /**
     * Delete a restaurant
     */
    public function deleteRestaurant($id)
    {
        $restaurant = Restaurant::find($id);
        if (!$restaurant) {
            return response()->json(['error' => 'Restaurant not found'], 404);
        }

        $restaurant->delete();
        return response()->json(['message' => 'Restaurant deleted successfully'], 200);
    }
}