const URL = "http://localhost:4000/graphql";

// CREAR TARJETA
export async function crearTarjetaAPI(projectId) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          mutation($title: String!, $projectId: Int!) {
          createCard(title: $title, projectId: $projectId) {
            id
            title
          }
        }
        `,
      variables: {
        title: "Nueva tarjeta",
        projectId: Number(projectId),
      },
    }),
  });

  const data = await respuesta.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }

  return data.data.createCard;
}