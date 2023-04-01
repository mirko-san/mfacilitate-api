import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.11.0';
import { Application, Router } from 'https://deno.land/x/oak@v12.1.0/mod.ts';
import { config } from './config.ts';

// https://supabase.com/docs/reference/javascript/initializing
const supabase = createClient(config.supabaseUrl, config.supabaseKey);

const router = new Router();

router
  .get('/', (context) => {
    context.response.body = 'Hello world!';
  })
  .get('/meetings', async (context) => {
    const { data } = await supabase
      .from('meetings')
      .select();
    context.response.body = JSON.stringify({ data });
  })
  .get('/themes', async (context) => {
    const { data } = await supabase
      .from('themes')
      .select();
    context.response.body = JSON.stringify({ data });
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
