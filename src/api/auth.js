export async function login(email, password) {
// a bbdd
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    // lo hago json
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

      // variables que le paso
      variables: { email, password },
    }),
  });
  
  // la respuesta en json
  const respuesta = await res.json();
  console.log(respuesta);
  return respuesta.data.login;
}
