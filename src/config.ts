type Config = {
  supabaseUrl: string;
  supabaseKey: string;
};

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_KEY');

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Required environment variables is missing.');
}

export const config: Config = {
  supabaseUrl,
  supabaseKey,
};
