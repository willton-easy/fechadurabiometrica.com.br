-- Arquivo de migração do Supabase: 20260303_create_products.sql

CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    rank INTEGER NOT NULL,
    name TEXT NOT NULL,
    brand TEXT,
    badge TEXT,
    badgeColor TEXT,
    image TEXT NOT NULL,
    specs TEXT[] DEFAULT '{}',
    verdict TEXT NOT NULL,
    pros TEXT[] DEFAULT '{}',
    cons TEXT[] DEFAULT '{}',
    amazonUrl TEXT,
    mlUrl TEXT,
    reviewUrl TEXT,
    mlbId TEXT UNIQUE, -- ID do mercado livre (para o robô saber quem atualizar)
    stock INTEGER DEFAULT NULL,
    rating NUMERIC(3, 1) DEFAULT NULL,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativa RLS (Row Level Security) para o banco ser blindado
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Permite que qualquer um leia os produtos (para o FrontEnd do Blog puxar os dados)
CREATE POLICY "Permitir Leitura Pública de Produtos" 
ON public.products 
FOR SELECT 
USING (true);

-- Permite que apenas o Backend autenticado (O Robô Noturno) insira/atualize dados
CREATE POLICY "Apenas Robô pode atualizar produtos" 
ON public.products 
FOR ALL 
USING (auth.role() = 'service_role');
