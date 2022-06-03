import Paciente from "./Paciente";

function ListadoPacientes ({pacientes, setPaciente, eliminarPaciente}) {
  return ( 
    <div className="lg:w-3/5 md:w-1/2 md:h-screen overflow-y-scroll">

      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
          <p className="text-lg mt-5 text-center mb-10">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
    
          { pacientes.map( (paciente) => (
            <Paciente
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            />
    
          ))}
        </>
        
      ) :
      <>
        <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">
          Comienza agregando pacientes {''}
          <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
        </p>
      </>
        
      }

      

    </div>
   )
}
 
export default ListadoPacientes;