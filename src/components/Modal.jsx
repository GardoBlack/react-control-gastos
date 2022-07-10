
import CerrarBTn from '../img/cerrar.svg'
import { useState } from 'react'
import { Mensaje } from './Mensaje';
import { useEffect } from 'react';

export const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    //State
    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId]= useState('');
    const[fecha, setFecha]= useState('')


    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0 ) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, []);

    //Extra functions
    const ocultarModal = () => {

        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
        }, 400);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los Campos son Obligatorios')

            setTimeout(() => {
                setMensaje("")
            }, 3000);
            return;
        }
        guardarGasto({ nombre, cantidad, categoria, id, fecha })
    }




    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBTn}
                    alt="Cerrarmodal"
                    onClick={ocultarModal}
                />
            </div>

            <div>
                <form
                    onSubmit={handleSubmit}
                    className={`formulario ${animarModal ? "animar" : 'cerrar'} `}>
                    <legend>{gastoEditar.nombre ? 'Editando' : 'Nuevo Gasto'}</legend>
                    {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

                    <div className='campo'>
                        <label htmlFor='nombre'>Nombre del  Gasto</label>
                        <input
                            placeholder='Nombre del gasto'
                            type='text'
                            id='nombre'
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>


                    <div className='campo'>
                        <label htmlFor='cantidad'>Cantidad del gasto</label>
                        <input
                            placeholder='cantidad $'
                            type='number'
                            id='cantidad'
                            value={cantidad}
                            onChange={e => setCantidad(Number(e.target.value))}
                        />
                    </div>

                    <div className='campo'>
                        <label htmlFor='categoria'>Categoria</label>

                        <select id='categoria' value={categoria} onChange={e => setCategoria(e.target.value)}>
                            <option value="">--Seleccionar--</option>
                            <option value="ahorro">Ahorro</option>
                            <option value="comida">Comida</option>
                            <option value="casa">Casa</option>
                            <option value="gastos">Gastos Varios</option>
                            <option value="ocio">Ocio</option>
                            <option value="salud">Salud</option>
                            <option value="suscripciones">Suscripciones</option>

                        </select>

                    </div>

                    <input
                        type="submit"
                        value={gastoEditar.nombre ? 'Guardar Cambios' : 'Nuevo Gasto'}
                    />
                </form>

            </div>
        </div>
    )
}
