import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SolucoesUsuario = ({ userId }) => {
    const [solucoes, setSolucoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const solucoess = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/desafios/solucoes/${userId}`);
                setSolucoes(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Erro ao buscar soluções');
            } finally {
                setLoading(false);
            }
        };

        solucoess();
    }, [userId]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            <h2>Soluções do Usuário</h2>
            {solucoes.length === 0 ? (
                <p>Nenhuma solução encontrada</p>
            ) : (
                solucoes.map((item, index) => (
                    <div key={index} className="solucao-detalhe">
                        <h3>Detalhes do Desafio</h3>
                        <p><strong>Título:</strong> {item.desafio.titulo}</p>
                        <p><strong>Descrição:</strong> {item.desafio.descricao}</p>

                        <h4>Solução:</h4>
                        <p>{item.solucao.descricao}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default SolucoesUsuario;
