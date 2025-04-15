<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\Restaurant;

class RestoManager extends Controller
{
    public function welcome()
    {
        return view('welcome');
    }

    //---------------------------- MENU HERE ---------------------------------------//
    // Display all menus
    public function index()
    {
        return response()->json(Menu::all(), 200);
    }

    // Store a new menu
    public function store(Request $request)
    {
        $menu = Menu::create($request->validate([
            'name' => 'required|string',
            'restaurant_id' => 'required|exists:restaurants,id',
            'image' => 'nullable|string',
            'category' => 'nullable|string',
            'ingredients' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric'
        ]));

        return response()->json($menu, 201);
    }

    // Show a specific menu
    public function show($id)
    {
        $menu = Menu::find($id);
        return $menu ? response()->json($menu, 200) : response()->json(['error' => 'Menu not found'], 404);
    }

    // Update a menu
    public function update(Request $request, $id)
    {
        $menu = Menu::find($id);
        if (!$menu) return response()->json(['error' => 'Menu not found'], 404);

        $menu->update($request->validate([
            'name' => 'string',
            'restaurant_id' => 'exists:restaurants,id',
            'image' => 'string',
            'category' => 'string',
            'ingredients' => 'string',
            'description' => 'string',
            'price' => 'numeric'
        ]));

        return response()->json($menu, 200);
    }

    // Delete a menu
    public function destroy($id)
    {
        $menu = Menu::find($id);
        if (!$menu) return response()->json(['error' => 'Menu not found'], 404);

        $menu->delete();
        return response()->json(['message' => 'Menu deleted successfully'], 200);
    }

    //---------------------------- RESTO HERE ---------------------------------------//
    // Display all restaurants
    public function indexRestaurants()
    {
        return response()->json(Restaurant::all(), 200);
    }

    // Store a new restaurant
    public function storeRestaurant(Request $request)
    {
        $restaurant = Restaurant::create($request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email|unique:restaurants,email',
            'description' => 'nullable|string',
            'opening_hours' => 'nullable|string',
            'images' => 'nullable|string'
        ]));

        return response()->json($restaurant, 201);
    }

    // Show a specific restaurant
    public function showRestaurant($id)
    {
        $restaurant = Restaurant::find($id);
        return $restaurant ? response()->json($restaurant, 200) : response()->json(['error' => 'Restaurant not found'], 404);
    }

    // Update a restaurant
    public function updateRestaurant(Request $request, $id)
    {
        $restaurant = Restaurant::find($id);
        if (!$restaurant) return response()->json(['error' => 'Restaurant not found'], 404);

        $restaurant->update($request->validate([
            'name' => 'string',
            'address' => 'string',
            'city' => 'string',
            'phone' => 'string',
            'email' => 'email|unique:restaurants,email,' . $id,
            'description' => 'string',
            'opening_hours' => 'string',
            'images' => 'string'
        ]));

        return response()->json($restaurant, 200);
    }

    // Delete a restaurant
    public function destroyRestaurant($id)
    {
        $restaurant = Restaurant::find($id);
        if (!$restaurant) return response()->json(['error' => 'Restaurant not found'], 404);

        $restaurant->delete();
        return response()->json(['message' => 'Restaurant deleted successfully'], 200);
    }
}
