const URL = "https://organizer-5tll.onrender.com";

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

// ACTUALIZAR NOMBRE PROYECTO
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

  if (data.errors) {
    console.error(data.errors);
    return null;
  }

  return data.data.updateProjectName;

}


// ACTUALIZAR DESCRIPCION PROYECTO
export async function actDescProyecto(projectId, description) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation($projectId: Int!, $description: String!) {
          updateProjectDescription(projectId: $projectId, description: $description) {
            id
            description
          }
        }
      `,
      variables: {
        projectId: Number(projectId),
        description: description
      }
    })
  })

  const data = await respuesta.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }

  return data.data.updateProjectDescription;

}