const URL = "http://localhost:4000/graphql";

// CARGAR TARJETAS 
export async function cargarTarjetas(IDproyecto) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query($projectId: Int!) {
            cards(projectId: $projectId) {
              id
              title
              tasks {
                id
                text
                completed
              }
            }
          }
        `,
      variables: {
        projectId: Number(IDproyecto),
      },
    }),
  });

  const data = await respuesta.json();

  console.log(data);

  // Si hay error en GraphQL
  if (!data.data) {
    console.error(data.errors);
    return [];
  }

  // Transformar datos para el frontend
  return data.data.cards.map(card => ({
    id: card.id,
    titulo: card.title,
    tareas: card.tasks
  }));

}

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

// BORRAR TARJETA
export async function borrarTarjetaAPI(cardId) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation($cardId: Int!) {
          deleteCard(cardId: $cardId) {
            id
          }
        }
      `,
      variables: {
        cardId: Number(cardId)
      }
    })
  });

  const data = await respuesta.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }

  return data.data.deleteCard;
}

// ACTUALIZAR TITULO TARJETA
export async function actTituloTarjeta(cardId, title) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation($cardId: Int!, $title: String!) {
          updateCardTitle(cardId: $cardId, title: $title) {
            id
            title
          }
        }
      `,
      variables: {
        cardId: Number(cardId),
        title: title
      }
    })
  });

  const data = await respuesta.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }

  return data.data.updateCardTitle;
}