import React from 'react';
import { useState, useEffect } from 'react';
import CharacterCard from './Character';

// ─── Componente de paginação ───────────────────────────────────
function NavPage({ page, setPage, hasNext }) {
  return (
    <nav className="nav-page">

      {/* Botão anterior — desabilitado na página 1 */}
      <button
        className="btn btn-outline-light"
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        ‹
      </button>

      <span className="page-label">Página {page}</span>

      {/* Botão próximo — desabilitado quando não há próxima página */}
      <button
        className="btn btn-outline-light"
        onClick={() => setPage(p => p + 1)}
        disabled={!hasNext}
      >
        ›
      </button>

    </nav>
  );
}

// ─── Componente principal ──────────────────────────────────────
export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage]             = useState(1);
  const [loading, setLoading]       = useState(true);
  const [hasNext, setHasNext]       = useState(false);

  // Busca personagens sempre que a página muda
  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const data = await response.json();
        setCharacters(data.results);          // 20 personagens por página
        setHasNext(data.info.next !== null);  // controla se há próxima página

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);  // ← re-executa só quando `page` muda

  // Enquanto carrega, exibe mensagem no lugar do grid
  if (loading) return <p className="loading">Carregando...</p>;

  return (
    <div className="character-list-wrapper">

      <NavPage page={page} setPage={setPage} hasNext={hasNext} />

      {/* Grid customizado: 4 colunas em desktop */}
      <div className="character-grid">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <NavPage page={page} setPage={setPage} hasNext={hasNext} />

    </div>
  );
}