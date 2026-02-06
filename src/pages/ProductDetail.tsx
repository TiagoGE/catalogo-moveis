import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import ProductGallery from '../components/ProductGallery'
import type { Product } from '../types'
import { STORAGE_BASE_URL } from '../utils/storage'

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProduct() {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single()

            if (!error) setProduct(data)
            setLoading(false)
        }

        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-b-transparent border-gray-800" />
            </div>
        )
    }

    if (!product) return null

    const cover = product.photo?.[0]
    const rest = product.photo?.slice(1) ?? []

    return (
        <div className="min-h-screen bg-[#f5f1eb] px-4 sm:px-6 lg:px-10 py-6">
            <div className="mx-auto w-full max-w-md md:max-w-2xl lg:max-w-5xl">

                {/* botão voltar */}
                <Link
                    to={-1 as any}
                    className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#3b2f2f] px-4 py-2 text-sm text-white"
                >
                    ← Voltar
                </Link>

                {/* Título */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#3b2f2f]">
                    {product.name}
                </h1>

                {/* HERO: primeira foto */}
                {/* HERO + DESCRIÇÃO */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">

                    {/* Foto principal */}
                    {cover && (
                        <div className="overflow-hidden rounded-2xl border border-[#E2D8CF] bg-white shadow-sm">
                            <div className="aspect-[4/3] w-full bg-[#e9e2db]">
                                <img
                                    src={STORAGE_BASE_URL + cover}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                    loading="eager"
                                />
                            </div>
                        </div>
                    )}

                    {/* Descrição */}
                    <div className="lg:pt-2">
                        {product.description ? (
                            <p className="text-sm md:text-base leading-relaxed text-[#4b3c32]">
                                {product.description}
                            </p>
                        ) : (
                            <p className="text-sm text-[#6B5E55]">
                                Sem descrição.
                            </p>
                        )}
                    </div>
                </div>

                {/* Outras fotos */}
                {rest.length > 0 && (
                    <div className="mt-10">
                        <h2 className="mb-4 text-lg font-semibold text-[#3b2f2f]">
                            Fotos
                        </h2>

                        <ProductGallery images={rest} />
                    </div>
                )}
            </div>
        </div>
    )
}
