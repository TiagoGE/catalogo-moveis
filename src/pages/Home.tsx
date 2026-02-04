import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import CategoryCard from '../components/CategoryCard';
import type { Category } from '../types';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Buscando da tabela 'category' (singular como você definiu)
        const { data, error } = await supabase
          .from('category')
          .select('id, name, slug')
          .order('name', { ascending: true });

        if (error) {
          console.error('Erro Supabase:', error.message);
          throw error;
        }

        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 bg-[#F5F1EC]">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-semibold tracking-tight">
          Catálogo de Móveis
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-lg text-[#6B5E55]">
          Mobiliário para restaurantes, bares e ambientes comerciais
        </p>
      </header>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>

      {categories.length === 0 && (
        <div className="mt-20 text-center">
          <p className="text-xl text-gray-400">Nenhuma categoria encontrada no banco.</p>
          <p className="text-sm text-gray-400">Verifique se a tabela 'category' tem dados.</p>
        </div>
      )}
    </div>
  );
}