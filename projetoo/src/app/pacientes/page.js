'use client';

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Tabela from "@/components/tabela";

export default function ListasMedicos() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState('');
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        const getMedicos = async () => {
            try {
                const response = await fetch('https://api-clinica-2a.onrender.com/pacientes');
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados: ' + response.statusText);
                }
                const data = await response.json();
                setDados(data);
                setLoading(false);
            } catch (error) {
                console.log('Ocorreu algum erro: ' + error);
                setLoading(false);
            }
        };

        getMedicos();
    }, []); 

    const pacienteFiltrado = dados.filter(paciente =>
        paciente.nome.toLowerCase().includes(busca.toLowerCase())
    );

    const colunas = [
        { chave: 'id', label: 'ID' },
        { chave: 'nome', label: 'Nome' },
        { chave: 'telefone', label: 'Telefone' },
        { chave: 'email', label: 'Email' },
        { chave: 'cpf', label: 'CPF' }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.containerLista}>
                <h1 className={styles.title}>Lista de Pacientes</h1>
                <button className={styles.button} onClick={() => setModalAberto(true)}>
                    Buscar paciente
                </button>

                <Tabela colunas={colunas} dados={pacienteFiltrado} loading={loading} />

                {modalAberto && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <input
                                type="text"
                                className={styles.modalInput}
                                placeholder="Digite o nome do paciente"
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                            />
                            <button className={styles.closeButton} onClick={() => setModalAberto(false)}>X</button>
                            <ul className={styles.pacientesList}>
                                {pacienteFiltrado.map((paciente) => (
                                    <li key={paciente.id}>{paciente.nome}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
