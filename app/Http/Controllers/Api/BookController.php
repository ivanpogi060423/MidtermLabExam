<?php

namespace App\Http\Controllers\Api;

use App\Models\Book;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        if($books->count() > 0){


            return response()->json([
                'status' => 200,
                'books' =>  $books
            ], 200);
        }else{

            return response()->json([
                'status' => 404,
                'message' =>  'No Records Found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'author' => 'required|string',
            'published_year' => 'required|max:4|min:4',
            'genre' => 'required',
            'description' => 'required',
        ]);

        if($validator->fails()){

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }else{

            $book = Book::create([
                'title' => $request->title,
                'author' => $request->author,
                'published_year' => $request->published_year,
                'genre' => $request->genre,
                'description' => $request->description,
            ]);

            if($book){

                return response()->json([
                    'status' => 200,
                    'message' => 'Book Added Succesfuly'
                ], 200);
            }else{

                return response()->json([
                    'status' => 500,
                    'message' => 'Something Went Wrong'
                ], 500);
            }
        }
    }

    public function show($id)
    {
        $book = Book::find($id);
        if($book){
        return response()->json([
            'status' => 200,
            'book' => $book
        ], 200);
    
    }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Book Found'
            ], 404);
        }
    }


    public function edit($id)
    {
        $book = Book::find($id);
        if($book){
            return response()->json([
                'status' => 200,
                'book' => $book
            ], 200);
        
        }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Book Found'
                ], 404);
            }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'author' => 'required',
            'published_year' => 'required|max:4|min:4',
            'genre' => 'required',
            'description' => 'required',
        ]);

        if($validator->fails()){

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }else{

            $book = Book::find($id);
            if($book){

                $book->update([
                    'title' => $request->title,
                    'author' => $request->author,
                    'published_year' => $request->published_year,
                    'genre' => $request->genre,
                    'description' => $request->description,
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Book Updated Succesfuly'
                ], 200);
            }else{

                
                return response()->json([
                    'status' => 404,
                    'message' => 'No Book Found'
                ], 404);
            }
        }
    }

    public function destroy($id)
    {
        
        $book = Book::find($id);
        if($book){

            $book->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Book Succesfully Deleted'
            ], 200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Book Found'
            ], 404);
        }
    }
}
