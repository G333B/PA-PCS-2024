import React, { useState } from 'react';
import { useRouter } from 'next/router';
import InputGroup from '../../components/InputGroup';
import Cookie from 'js-cookie';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/host/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration Successful', data);
        Cookie.set('token', data.accessToken, { expires: 1, secure: true, sameSite: 'lax' });
        router.push('/host/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Une erreur s’est produite lors de l’inscription.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <InputGroup name="email" label="Adresse Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputGroup name="password" label="Mot de Passe *" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputGroup name="firstName" label="Prénom *" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <InputGroup name="lastName" label="Nom *" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <button className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" type="submit">Inscription</button>
        </form>
        <p className="mt-4 text-center">
          <a href="/host/login" className="text-blue-600 hover:underline">Vous avez déjà un compte, cliquez ici ?</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
