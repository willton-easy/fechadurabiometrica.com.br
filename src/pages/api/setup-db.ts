import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { products } from '../../lib/products';

export const prerender = false;

// Esta é uma rota que usaremos UMA VEZ, apenas visitando no navegador, para criar a tabela.
export const GET: APIRoute = async () => {
    const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.SUPABASE_URL || 'https://ahgbxzbyylawrxryyhuc.supabase.co';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || import.meta.env.SUPABASE_SERVICE_KEY || 'sb_secret_8Vs7nSeu9XBQYiwI8n8tCQ_PjKvg4sB'; 
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Na API REST do Supabase, não temos como mandar DDL (Create Table) facilmente usando chaves se não tivermos ativado a Extensão plpgsql "exec_sql" ou o Postgres puro.
    // MAS, como o Vercel não cria o arquivo estático na primeira visita, nós podemos usar a força bruta!
    // A melhor saída é informar ao usuário: 
    // "Ei! Você não criou a tabela pelo painel e o acesso robótico está bloqueado".
    
    try {
        const produtosLimpos = products.map(({ id, ...resto }) => resto);
        
        // Tentaremos inserir sem criar a tabela para ver se o erro de ausência de schema existe
        const { data, error } = await supabase.from('products').insert(produtosLimpos).select();
        
        if(error) {
             return new Response(JSON.stringify({ 
                 status: 'FALHA - TABELA PRECISAR SER CRIADA', 
                 motivo: error.message,
                 solucao_para_o_will: 'Abra supabase.com > SQL Editor > Novo Comando > Cole o SQL e execute'
             }), { status: 400 });
        }
        
        return new Response(JSON.stringify({ status: 'SUCESSO', quantidade: data?.length }), { status: 200 });
    } catch(e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
