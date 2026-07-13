import { api } from '@/lib/services/api';
import ProductsClient from './ProductsClient';

export const revalidate = 60; // Enable ISR, revalidate every 60 seconds

export default async function ProductsPage() {
  const products = await api.getProducts();

  return <ProductsClient initialProducts={products || []} />;
}
