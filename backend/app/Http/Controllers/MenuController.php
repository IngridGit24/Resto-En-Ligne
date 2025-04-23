<?php
namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    /**
     * Fetch all menus
     */
    public function getMenus()
    {
        return response()->json(Menu::all(), 200);
    }

    /**
     * Fetch a single menu item by ID
     */
    public function getMenu($id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['error' => 'Menu item not found'], 404);
        }
        return response()->json($menu, 200);
    }

    /**
     * Add a new menu item
     */
    public function addMenu(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'restaurant_id' => 'required|exists:restaurants,id',
            'image' => 'nullable|string', 
            'category' => 'required|string|max:255',
            'ingredients' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        // Check validation failure
        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $validator->errors(),
            ], 422);
        }

        // Create menu item if validation passes
        $menu = Menu::create($request->all());
        return response()->json([
            'message' => 'Menu item created successfully!',
            'menu' => $menu
        ], 201);
    }

    /**
     * Update an existing menu item
     */
    public function updateMenu(Request $request, $id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['error' => 'Menu item not found'], 404);
        }

        // Validate update request
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'restaurant_id' => 'exists:restaurants,id',
            'image' => 'nullable|string',
            'category' => 'string|max:255',
            'ingredients' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $validator->errors(),
            ], 422);
        }

        $menu->update($request->all());
        return response()->json(['message' => 'Menu item updated successfully', 'menu' => $menu], 200);
    }

    /**
     * Delete a menu item
     */
    public function deleteMenu($id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['error' => 'Menu item not found'], 404);
        }

        $menu->delete();
        return response()->json(['message' => 'Menu item deleted successfully'], 200);
    }
}