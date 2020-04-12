import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  DESCARGAS_PRODUCTOS_ERROR,
  DESCARGAS_PRODUCTOS_EXITO,
  COMENZAR_DESCARGAS_PRODUCTOS,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINAR_ERROR,
  PRODUCTO_ELIMINAR_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_ERROR,
  PRODUCTO_EDITADO_EXITO
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      //insertar en la api
      await clienteAxios.post("/productos", producto);
      dispatch(agregarProductoExito(producto));
      //Alerta
      Swal.fire("Correto", "El producto se agrego correctamente", "success");
    } catch (error) {
      console.log(error);
      //si hay un error
      dispatch(agregarProductoError(true));
      //alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo"
      });
    }
  };
}
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});
//Si pasa a la bd
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});
//si no pasa
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});

//funcion que obtiene los productos de la bd
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(descargaProductosExitosa(respuesta.data));
      // console.log(respuesta.data);
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGAS_PRODUCTOS,
  payload: true
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGAS_PRODUCTOS_EXITO,
  payload: productos
});

const descargaProductosError = (productos) => ({
  type: DESCARGAS_PRODUCTOS_ERROR,
  payload: true
});

//funcion que elimina
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar());

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      //mostrar alerta
      Swal.fire("Eliminado!", "Tu producto fue eliminado.", "success");
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINAR_EXITO
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINAR_ERROR,
  payload: true
});

//COLOCAR producto en edicion
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
});

//edita api y state
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log(error);
      dispatch(editarProductoError());
    }
  };
}
const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
});

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true
});
