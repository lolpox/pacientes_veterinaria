import {useState, useEffect} from 'react';
import Error from './Error';
function Formulario ({pacientes, setPacientes, paciente, setPaciente}) {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])

  const generarId = () => {
    const ramdon = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return ramdon + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion del formulario

    if( [nombre, propietario, email, fecha, sintomas].includes('') ){
      setError(true);
      return;
    }

    setError(false);

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    };

    if(paciente.id){
      //Editando
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState );
      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      //Creando
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
      
    }

    //Reiniciar el form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }

  return ( 
    <div className="lg:w-2/5 md:w-1/2 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5">
        
        {error && <Error><p>Todos los campos son obligatorios</p></Error> }
        
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="nombre_mascota">Nombre mascota</label>
          <input className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md" type="text" id="nombre_mascota" value={nombre} onChange={ (e) => setNombre(e.target.value)} placeholder="Nombre de la Mascota"/>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="nombre_propietario">Nombre propietario</label>
          <input className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md" type="text" id="nombre_propietario" value={propietario} onChange={ (e) => setPropietario(e.target.value)} placeholder="Nombre del propietario"/>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
          <input className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md" type="email" id="email" value={email} onChange={ (e) => setEmail(e.target.value)} placeholder="Email"/>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>
          <input className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md" type="date" id="alta" value={fecha} onChange={ (e) => setFecha(e.target.value)} placeholder="Alta"/>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas</label>
          <textarea className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md" name="" id="sintomas" value={sintomas} onChange={ (e) => setSintomas(e.target.value)} placeholder="Describe los Sintomas"></textarea>
        </div>
        <div className="mb-5">
          <input className="bg-indigo-600 w-full p-3  text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" type="submit" value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' } />
        </div>
      </form>
    </div>
    
  )
}
 
export default Formulario