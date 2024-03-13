import React, { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import api from './services/api';
import Alerts from './components/Alerts';

function App() {
    const [ValorDoInput, setInput] = useState('');
    const [cep, setCep] = useState({});
    
    const [errosInput, setErrosInput] = useState('');
    const [erro, setErro] = useState(false);

    async function handleBuscar() {
        if (ValorDoInput === '') {
            setErrosInput("Informe o CEP!"); 
            setErro(true); 
            return;
        }

        try {
            let response = await api.get(`${ValorDoInput}/json`);
            console.log(response.data);
            setCep(response.data);
            setInput("");
            setErro(false); 
            setErrosInput(""); 
        } catch (error) {
            setCep({});
            setErrosInput("Endereço não encontrado!");
            setErro(true);
            setInput("");
        }
    }

    function handleInputChange(event) {
        setInput(event.target.value);
        setErro(false);
        setErrosInput("");
    }

    return (
        <div className='App'>
            {(erro || errosInput !== '') && <Alerts erros={errosInput} />}
            <main className='principal'>
                <h2>Buscador de CEP</h2>
                <div className='principal-inpput'>
                    <div className="input-group mb-3">
                        <input value={ValorDoInput} onChange={handleInputChange} type="text" className="form-control" placeholder="Informe o CEP..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button onClick={handleBuscar} className="btn btn btn-outline-secondary" type="button" id="button-addon2">Buscar</button>
                    </div>
                </div>
            </main>

            {Object.keys(cep).length > 0 && (
                <div className='resultado-cep'>
                    <div className="card">
                        <h5 className="card-header"><b>CEP: {cep.cep}</b></h5>
                        <div className="card-body">
                            <span><b>Lagradouro:</b> {cep.logradouro}</span>
                            <span><b>Bairro:</b> {cep.bairro}</span>
                            <span><b>UF: </b>{cep.localidade} - {cep.uf}</span>
                            <span><b>Complemeto:</b> {cep.complemento}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
