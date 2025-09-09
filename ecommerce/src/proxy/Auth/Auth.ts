export const auth = async (user: string, password: string) => {
    const response = await fetch(`https://dummyjson.com/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            username: user, 
            password: password
        })
    });

    return response;
}