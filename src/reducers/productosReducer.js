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
  //COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_ERROR,
  PRODUCTO_EDITADO_EXITO
} from "../types";

//cada reducer tiene su propio state
const initialState = {
  productos: [],
  error: false,
  loading: false,
  productoeliminar: null,
  productoeditar: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGAS_PRODUCTOS:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload]
      };
    case DESCARGAS_PRODUCTOS_ERROR:
    case AGREGAR_PRODUCTO_ERROR:
    case PRODUCTO_ELIMINAR_ERROR:
    case PRODUCTO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DESCARGAS_PRODUCTOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: action.payload
      };
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoeliminar: action.payload
      };
    case PRODUCTO_ELIMINAR_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id !== state.productoeliminar
        ),
        productoeliminar: null
      };
    case OBTENER_PRODUCTO_EDITAR:
      return {
        ...state,
        productoeditar: action.payload
      };
    case PRODUCTO_EDITADO_EXITO:
      return {
        ...state,
        productoeditar: null,
        productos: state.productos.map((producto) =>
          producto.id === action.payload.id
            ? (producto = action.payload)
            : producto
        )
      };
    default:
      return state;
  }
}
