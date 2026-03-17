export async function login(email, password) {

  const res = await fetch("https://organizer-5tll.onrender.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            id
            name
            email
          }
        }
      `,
      variables: { email, password },
    }),
  });

  const respuesta = await res.json();

  console.log(respuesta);

  if (respuesta.errors) {
    return {
      error: respuesta.errors[0].message
    };
  }

  return respuesta.data.login;
}