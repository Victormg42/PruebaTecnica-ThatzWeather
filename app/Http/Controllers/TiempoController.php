<?php

namespace App\Http\Controllers;

use App\Models\Tiempo;
use Illuminate\Http\Request;

class TiempoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tiempo  $tiempo
     * @return \Illuminate\Http\Response
     */
    public function show(Tiempo $tiempo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tiempo  $tiempo
     * @return \Illuminate\Http\Response
     */
    public function edit(Tiempo $tiempo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tiempo  $tiempo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tiempo $tiempo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tiempo  $tiempo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tiempo $tiempo)
    {
        //
    }

    public function home() {
        return view('home');
    }

    public function consulta() {
        return view('tiempo');
    }
}
