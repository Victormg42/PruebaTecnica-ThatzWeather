<?php

namespace App\Http\Controllers;

use App\Models\Tiempo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
    // Devuelve a la vista principal //
    public function home() {
        return view('home');
    }
    // Devuelve a la vista de tiempo, donde se muestra la consulta //
    public function consulta() {
        return view('tiempo');
    }
    // Función que nos permite comprobar si el codigo postal ya existe, si existe actualiza los datos con la temperatura //
    public function InsertOrUpdate(Request $request) {
        $cpostal = $request->input('cpostal');
        $nombre = $request->input('nombre');
        $temp = $request->input('temperatura');
        try {
            $ciudad=DB::select('SELECT * FROM tbl_ciudad WHERE nombre= ?', [$nombre]);
            $count = count($ciudad);
            if ($count == 0) {
                DB::table('tbl_ciudad')->insertGetId(['nombre' =>$nombre, 'cp'=>$cpostal, 'temperatura'=>$temp]);
            } else {
                DB::update('UPDATE `tbl_ciudad` SET `temperatura`= ? WHERE nombre= ?', [$temp, $nombre]);
            }
            return response()->json(array('resultado'=>'OK'),200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=>'NOK '. $th->getMessage()),200);
        }
    }
    // Hacemos una consulta a la base de datos que nos devuelve las cinco temperaturas mas frias. //
    public function readTop(Request $request) {
        $request->except('_token');
        //$mostrar = DB::table('tbl_ciudad')->get();
        $mostrar = DB::select('SELECT * FROM tbl_ciudad ORDER BY temperatura ASC LIMIT 5');
        return response()->json($mostrar, 200);
    }
}
