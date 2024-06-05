import { supabaseClient } from '$lib/supabaseClient';

export async function getSession() {
    const { data: { session } }  = await supabaseClient.auth.getSession();
    return session;
}
