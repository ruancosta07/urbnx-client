import React from 'react'
import Header from '../_components/Header'
import { Product } from '@/types/Product'
import SearchProducts from './_components/Search'



const page = async ({ searchParams }: { searchParams: Promise<{ produto: string; pagina: number; limite: string; max: number; min: number; order: "desc" | "asc" }> }) => {
  const { produto, pagina, limite, max, min, order } = await searchParams
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_PROD_URL}/products/search?produto=${produto}&pagina=${pagina}&limite=${limite}&min=${min}&max=${max}&order=${order}`)

  const data = await result.json() as { products: Product[]; total: number; totalPages: number; clearProducts: Product[] }
  return (
    <>
      <Header />
      <SearchProducts products={data.products} clearProducts={data.clearProducts} total={data.total} totalPages={data.totalPages} />

    </>
  )
}

export default page
