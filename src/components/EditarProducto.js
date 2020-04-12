import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { useHistory } from "react-router-dom";

const EditarProducto = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  //nuevo state
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: ""
  });
  //producto a editar
  const productoeditar = useSelector((state) => state.productos.productoeditar);
  //llenar el state
  useEffect(() => {
    guardarProducto(productoeditar);
  }, [productoeditar]);

  //leer los datos
  const onChangeFormulario = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const { nombre, precio } = producto;

  //submit
  const submitEditarProducto = (e) => {
    e.preventDefault();

    dispatch(editarProductoAction(producto));

    history.push("/");
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center md-4 font-weigth-bold'>
              Editar producto
            </h2>
            <form onSubmit={submitEditarProducto}>
              <div className='form-group'>
                <label>Nombre producto</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre Producto'
                  name='nombre'
                  value={nombre}
                  onChange={onChangeFormulario}
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
                  onChange={onChangeFormulario}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary fonte-weight-bold text-uppercase d-block w-100'
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
