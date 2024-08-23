import React, { useState, useEffect } from 'react';
import axios from 'axios';

import imgProduto1 from './note1.jpg';
import imgProduto2 from '../src/image/phone2.jpg';

const placeholder = 'https://via.placeholder.com/200';

const imagens = [
    { id: 1, src: imgProduto1 },
    { id: 2, src: imgProduto2 },
    { id: 3, src: 'https://example.com/image3.jpg' },
    // Adicione mais imagens e URLs conforme necessário
  ];

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://ranekapi.origamid.dev/json/api/produto')
      .then(response => {
        console.log(response.data); // Verifique a estrutura dos dados
        setProdutos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            <h2>{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <p>Preço: {produto.preco}</p>
            <img 
              src={imagens[produto.id] || placeholder} 
              alt={produto.nome} 
              style={{ width: '200px', height: 'auto' }} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProdutoList;
