import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0';
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
    // TODO: context.request.url から指定できるようにする
    const limit = 10;
    const offset = 0;
    const { data, count } = await supabase
      .from('meetings')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit);
    context.response.body = JSON.stringify({
      data,
      limit,
      offset,
      count,
    });
  })
  .post('/meetings', async (context) => {
    const body = await context.request.body().value;
    const r = await supabase
      .from('meetings')
      .insert(body);
    context.response.body = JSON.stringify(r);
  })
  .get('/meetings/:id', async (context) => {
    const id = context.params.id;
    const { data } = await supabase
      .from('meetings')
      .select()
      .eq('meeting_id', id);
    if (!Array.isArray(data)) {
      throw new Error('Invalid data.');
    }
    context.response.body = JSON.stringify({
      data: data[0],
    });
  })
  .get('/themes', async (context) => {
    const { data } = await supabase
      .from('themes')
      .select();
    context.response.body = JSON.stringify({ data });
  })
  .post('/themes', async (context) => {
    const body = await context.request.body().value;
    const r = await supabase
      .from('themes')
      .insert(body);
    context.response.body = JSON.stringify(r);
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
