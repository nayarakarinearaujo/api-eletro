import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProdutoList.css'; // Certifique-se de importar o arquivo CSS

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://ranekapi.origamid.dev/json/api/produto')
      .then(response => {
        console.log(response.data); 
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
    <div className='products'>
      <h2>Lista de Produtos</h2>
      <ul className='products-item'>
        {produtos.map(produto => (
          <li key={produto.id} className='product'>
            <h3>{produto.nome}</h3>
            <p>Preço: {produto.preco}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProdutoList;
