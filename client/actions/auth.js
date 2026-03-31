'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const signUp = async (_, formData) => {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const day = formData.get('day');
    const month = formData.get('month');
    const year = formData.get('year');

    if (!name || !email || !password || !day || !month || !year)
        return { resObj: { success: false, errorMsg: 'Provide your email and password' } };

    const date = new Date(Date.UTC(year, month, day));

    const payload = {
        displayName: name,
        email,
        password,
        birthDate: date,
    }

    try {
        const api = `${process.env.API_URL}auth/register`;
        const res = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const fetchedData = await res.json();
        if (!res.ok)
            return { resObj: { success: false, errorMsg: fetchedData.errorMsg || 'Something went wrong at server' } };

        return { resObj: fetchedData };
    }

    catch (e) {
        return { resObj: { success: false, errorMsg: 'Check your internet or try again later' } }
    }
}


const signIn = async (_, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password)
        return { resObj: { success: false, errorMsg: 'Provide your email and password' } };

    try {
        const api = `${process.env.API_URL}auth/login`
        const res = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const fetchedData = await res.json();

        if (!res.ok)
            return { resObj: { success: false, errorMsg: fetchedData.errorMsg || 'Something went wrong at server' } };

        const cookieStore = await cookies();
        cookieStore.set('twitter-jwt', fetchedData.token, {
            httpOnly: true,
            secure: false,   // HTTP or https
            sameSite: 'lax',
            maxAge: 3 * 24 * 60 * 60,
        });


        return { resObj: fetchedData }

    } catch (e) {
        return { resObj: { success: false, errorMsg: 'Check your internet or try again later' } }
    }
}

const signOut = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('twitter-jwt');
    redirect('/');
}

const requireAuth = async () => {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('twitter-jwt')?.value;

    if (!jwt) {
        redirect('/login');
    }

    return jwt;
};

const redirectIfAuthenticated = async () => {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('twitter-jwt')?.value;

    if (jwt) {
        redirect('/home');
    }
};


export { signUp, signIn, signOut, requireAuth, redirectIfAuthenticated }