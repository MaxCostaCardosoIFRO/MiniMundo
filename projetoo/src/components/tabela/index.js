'use client';

import styles from './tabela.module.css'
import { useState, useEffect } from 'react';


export default function Tabela({ colunas, dados, loading }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {colunas.map((coluna) => (
                        <th key={coluna.chave}>{coluna.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td colSpan={colunas.length} className={styles.loading}>Carregando...</td>
                    </tr>
                ) : (
                    dados.map((item, index) => (
                        <tr key={index}>
                            {colunas.map((coluna) => (
                                <td key={coluna.chave}>{item[coluna.chave]}</td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}