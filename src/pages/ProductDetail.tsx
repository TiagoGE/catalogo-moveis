import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import ProductGallery from '../components/ProductGallery'
import ProductGallerySkeleton from '../components/ProductGallerySkelleton'
import type { Product } from '../types'

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

    return (
        <div className="min-h-screen bg-[#f5f1eb] px-4 sm:px-6 lg:px-10 py-6">
            <div className="mx-auto w-full max-w-md md:max-w-2xl lg:max-w-4xl">
                <Link
                    to={-1 as any}
                    className="mb-4 inline-block rounded-full bg-[#3b2f2f] px-4 py-2 text-sm text-white"
                >
                    ← Voltar
                </Link>

                <h1 className="mb-4 text-2xl font-bold text-[#3b2f2f]">
                    {product.name}
                </h1>

                {loading ? (
                    <ProductGallerySkeleton />
                ) : (
                    <ProductGallery images={product.photo} />
                )}

                {product.description && (
                    <p className="mt-6 text-sm leading-relaxed text-gray-700">
                        {product.description}
                    </p>
                )}
            </div>
        </div>
    )
}
