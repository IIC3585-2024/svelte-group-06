import { supabaseClient } from '$lib/supabaseClient';

export async function handle({ event, resolve }) {
  const accessToken = event.request.headers.get('cookie')?.split('; ').find(c => c.startsWith('sb-access-token'))?.split('=')[1];

  if (accessToken) {
      const { data: { user } } = await supabaseClient.auth.getUser(accessToken);
      event.locals.user = user;
  } else {
      event.locals.user = null;
  }

  const response = await resolve(event);

  return response;
}
