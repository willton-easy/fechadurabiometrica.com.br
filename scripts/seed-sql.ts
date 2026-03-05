import postgres from 'postgres';
import { products } from '../src/lib/products.js';

// Usando o Driver Nativo Postgres para mandar o DDL (Create Table)
// A URL de conexão precisa ser no formato postgres:// postgres.[ref]:[password]@[region].pooler.supabase.com:6543/postgres

// Vamos pegar a Project URL: https://ahgbxzbyylawrxryyhuc.supabase.co
// O REF do projeto é a string antes do .supabase.co: ahgbxzbyylawrxryyhuc
const projectRef = 'ahgbxzbyylawrxryyhuc';
const dbPassword = encodeURIComponent('AstroFechadura2026!@#');

const connectionString = `postgresql://postgres.${projectRef}:${dbPassword}@aws-0-sa-east-1.pooler.supabase.com:6543/postgres`;
const sql = postgres(connectionString);

async function setupDatabase() {
  console.log("Conectando ao Supabase Data Warehouse...");
  
  try {
      // 1. Criando a Tabela
      await sql`
      CREATE TABLE IF NOT EXISTS public.products (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        rank INTEGER NOT NULL,
        name TEXT NOT NULL,
        brand TEXT,
        badge TEXT,
        "badgeColor" TEXT,
        image TEXT NOT NULL,
        specs TEXT[] DEFAULT '{}',
        verdict TEXT NOT NULL,
        pros TEXT[] DEFAULT '{}',
        cons TEXT[] DEFAULT '{}',
        "amazonUrl" TEXT,
        "mlUrl" TEXT,
        "reviewUrl" TEXT,
        "mlbId" TEXT UNIQUE,
        stock INTEGER DEFAULT NULL,
        rating NUMERIC(3, 1) DEFAULT NULL,
        reviews_count INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
      `;
      console.log("Tabela 'products' criada com sucesso!");

      // 2. Limpando a tabela para evitar duplicações se rodar o script 2x
      await sql`TRUNCATE TABLE public.products;`;
      
      console.log(`Formatando ${products.length} produtos para injeção...`);
      
      // 3. Inserindo os produtos
      // O drizzle / postgresjs consegue fazer o insert by array de objetos
      for (const prod of products) {
         await sql`
            INSERT INTO public.products (
                rank, name, badge, "badgeColor", image, specs, verdict, pros, cons, "amazonUrl", "mlUrl", "reviewUrl", "mlbId", brand
            ) VALUES (
                ${prod.rank}, ${prod.name}, ${prod.badge}, ${prod.badgeColor}, ${prod.image}, ${prod.specs}, ${prod.verdict}, ${prod.pros}, ${prod.cons}, ${prod.amazonUrl}, ${prod.mlUrl}, ${prod.reviewUrl}, ${prod.mlbId || null}, ${prod.brand || null}
            )
         `;
      }
      
      console.log("SUCESSO! Todos os produtos copiados para o Supabase.");

  } catch (err: any) {
      console.error("Erro fatal ao criar a estrutura:", err.message);
  } finally {
      await sql.end();
  }
}

setupDatabase();
