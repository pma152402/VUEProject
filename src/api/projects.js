const URL = "http://localhost:4000/graphql";

// CARGAR PROYECTO
export async function cargarProyecto(IDproyecto) {
  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query($id: Int!) {
          project(id: $id) {
            id
            name
            description
            createdAt
          }
        }
        `,
      variables: {
        id: Number(IDproyecto),
      },
    }),
  });

  const data = await respuesta.json();

  return data.data.project;
}

// Nombre proyecto
export async function actNombreProyecto(projectId, name) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation($projectId: Int!, $name: String!) {
          updateProjectName(projectId: $projectId, name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        projectId: Number(projectId),
        name: name
      }
    })
  })

  const data = await respuesta.json();

  return data.data.updateProjectName;

}