import { supabaseClient } from '$lib/supabaseClient';

export async function load({ request }) {
    const accessToken = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('sb-access-token'))?.split('=')[1];

    if (accessToken) {
        const { data: { user } } = await supabaseClient.auth.getUser(accessToken);
        return {
            props: {
                user,
            },
        };
    }

    return {
        props: {
            user: null,
        },
    };
}
