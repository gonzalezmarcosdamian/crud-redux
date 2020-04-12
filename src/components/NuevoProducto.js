import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//actions de redux
import { crearNuevoProductoAction } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NuevoProducto = ({ history }) => {
  //state
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  //utilizar use dispatch y devuelve func
  const dispatch = useDispatch();
  //acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);
  //mandar llamar el action de productoaction
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));
  //submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    //validar
    if (precio <= 0 && nombre.trim() === "") {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3"
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }
    //si no hay errores
    dispatch(ocultarAlertaAction());
    //crear un nuevo producto
    agregarProducto({
      nombre,
      precio
    });
    //redireccionar
    history.push("/");
  };
  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center md-4 font-weigth-bold'>
              Agregar nuevo producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoProducto}>
              <div className='form-group'>
                <label>Nombre producto</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre Producto'
                  name='nombre'
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>Precio producto</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Precio'
                  name='precio'
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary fonte-weight-bold text-uppercase d-block w-100'
              >
                Agregar
              </button>
              {cargando ? <p>Cargando...</p> : null}
              {error ? (
                <p className='alert alert-danger p2 mt-4 text-center'>
                  Hubo un error
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
