'use client';

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Tabela from "@/components/tabela";

export default function ListasConsultas() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [filtro, setFiltro] = useState('medico');

    useEffect(() => {
        const getConsultas = async () => {
            try {
                const response = await fetch('https://api-clinica-2a.onrender.com/consultas');
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

        getConsultas();
    }, []);

    const consultasFiltradas = dados.filter((consulta) =>
        filtro === 'medico'
            ? consulta.medico.toLowerCase().includes(busca.toLowerCase())
            : consulta.paciente.toLowerCase().includes(busca.toLowerCase())
    );

    const colunas = [
        { chave: "id", label: "ID" },
        { chave: "medico", label: "Médico" },
        { chave: "especialidade", label: "Especialidade" },
        { chave: "paciente", label: "Paciente" },
        { chave: "tipo", label: "Tipo" }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.containerLista}>
                <h1 className={styles.title}>Lista de Consultas</h1>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={() => { setFiltro('medico'); setModalAberto(true); }}>
                        Buscar por Médico
                    </button>
                    <button className={styles.button} onClick={() => { setFiltro('paciente'); setModalAberto(true); }}>
                        Buscar por Paciente
                    </button>
                </div>

                {modalAberto && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <input
                                type="text"
                                className={styles.modalInput}
                                placeholder={`Digite o nome do ${filtro}`}
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                            />
                            <button className={styles.closeButton} onClick={() => setModalAberto(false)}>X</button>
                            <ul className={styles.medicoList}>
                                {consultasFiltradas.map((consulta) => (
                                    <li key={consulta.id}>
                                        {filtro === 'medico' ? consulta.medico : consulta.paciente}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <Tabela colunas={colunas} dados={dados} loading={loading} />
            </div>
        </div>
    );
}
