import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import type { Product } from '../types';

export default function CategoryProducts() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductsByCategory() {
      setLoading(true);
      try {
        // 1. Busca a categoria pelo slug
        const { data: categoryData, error: catError } = await supabase
          .from('category')
          .select('id, name')
          .eq('slug', slug)
          .single();

        if (catError) throw catError;

        if (categoryData) {
          setCategoryName(categoryData.name);

          // 2. Busca os produtos (usando a coluna 'photo' conforme seu banco)
          const { data: productsData, error: prodError } = await supabase
            .from('products')
            .select('*')
            .eq('category_id', categoryData.id);

          if (prodError) throw prodError;
          if (productsData) setProducts(productsData);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductsByCategory();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <Link to="/" className="mb-12 inline-flex items-center gap-2 rounded-full border border-[#E2D8CF] bg-white px-6 py-3 text-sm font-semibold text-[#6B5E55] shadow-sm transition hover:bg-[#8B5E3C] hover:text-white active:scale-96">
          ← Voltar
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-gray-900">{categoryName}</h1>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Nenhum produto cadastrado nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                
                key={product.id}
                to={`/produto/${product.id}`}
                className="group cursor-pointer rounded-2xl border border-[#E2D8CF] bg-white p-8 text-center shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-[#8B5E3C] hover:bg-orange-100/20"
                
              >
                <h3 className="text-lg font-semibold tracking-wide">
                  {product.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}