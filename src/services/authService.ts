export const login = async (email: string, password: string): Promise<{ token?: string }> => {
  try {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {'x-api-key': 'reqres-free-v1','Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {  
      console.log('Login failed with status:', response.status);
      return {};
  }
    const data = await response.json();
    return data;
  } catch (err) {
    return {};
  }
};