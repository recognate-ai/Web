"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Zap, ArrowRight, Clock } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Container } from '@/components/ui/Container';

import { api } from '@/lib/services/api';



export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await api.getProducts();
      if (data && data.length > 0) {
        setProducts(data as any);
      }
    };
    fetchProducts();
  }, []);
  return (
    <PageLayout
      badgeText="Our Products"
      badgeColor="blue"
      title={
        <h1 className="heading-1 mb-6">
          Intelligent Products. <br/>
          <span className="text-gradient">Tangible Results.</span>
        </h1>
      }
      description="Discover our proprietary platforms and hardware solutions, designed and engineered in-house to solve the most complex challenges in data collection and autonomous operations."
      glowColors={['cyan']}
    >
      <Container className="relative z-10">
        <div className="space-y-32">
          {products?.map((product, index) => {
            const pColor = product.color || "blue";
            return (
            <div key={product.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
              
              {/* Product Visual Placeholder */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2 w-full"
              >
                <div className="aspect-video w-full glass-card border-blue-500/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#111827] to-blue-900/20"></div>
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-sm font-medium text-blue-300 backdrop-blur-md">
                    <Clock size={16} className="animate-pulse" />
                    {product.status}
                  </div>

                  {/* Abstract representation of the product */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Box size={80} className="text-blue-500/50 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-500" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                </div>
              </motion.div>

              {/* Product Details */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 !== 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2 w-full space-y-6"
              >
                <h3 className="inline-block px-3 py-1 mb-2 rounded-md bg-blue-500/20 border border-blue-500/20 text-blue-400 font-bold tracking-wider text-xs uppercase shadow-lg shadow-blue-500/20">
                  {product.subtitle}
                </h3>
                <h2 className="text-3xl md:text-4xl font-space font-bold text-white">
                  {product.name}
                </h2>
                <p className="text-lg text-body">
                  {product.description}
                </p>
                
                <ul className="space-y-4 pt-4">
                  {product.features?.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-blue-500/20 text-blue-400 shrink-0">
                        <Zap size={14} />
                      </div>
                      <span className="text-body font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                  <button 
                    disabled
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-600/30 bg-gray-800/50 text-body font-medium cursor-not-allowed`}
                  >
                    Coming Soon <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>

            </div>
          )})}
        </div>
      </Container>
    </PageLayout>
  );
}
