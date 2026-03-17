const URL = "http://localhost:4000/graphql";


// CREAR TAREA
export async function crearTareaAPI(cardId, text) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation($text: String!, $cardId: Int!) {
          createTask(text: $text, cardId: $cardId) {
            id
            text
            completed
          }
        }
      `,
      variables: {
        text: text,
        cardId: Number(cardId)
      }
    })
  });

  const data = await respuesta.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }

  return data.data.createTask;
}

// BORRAR TAREA
export async function borrarTareaAPI(taskId) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation($taskId: Int!) {
          deleteTask(taskId: $taskId) {
            id
          }
        }
      `,
      variables: {
        taskId: Number(taskId)
      }
    })
  });

  const data = await respuesta.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }

  return data.data.deleteTask;
}

// ACTUALIZAR TAREA 
export async function actualizarTarea(taskId, text) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation($taskId: Int!, $text: String!) {
          updateTask(taskId: $taskId, text: $text) {
            id
            text
          }
        }
      `,
      variables: {
        taskId: Number(taskId),
        text: text
      }
    })
  })

  const data = await respuesta.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }

  return data.data.updateTask;
}

// ACTUALIZAR EL CHECK
export async function actualizarCompletadaAPI(taskId, completed) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation($taskId: Int!, $completed: Boolean!) {
          updateCompletedTask(taskId: $taskId, completed: $completed) {
            id
            completed
          }
        }
      `,
      variables: {
        taskId: Number(taskId),
        completed: completed
      }
    })
  });

  const data = await respuesta.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }

  return data.data.updateCompletedTask;
}

// ARRASTRAR TAREAS
export async function moverTareaAPI(taskId, cardId) {

  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation($taskId: Int!, $cardId: Int!) {
          moveTask(taskId: $taskId, cardId: $cardId) {
            id
            cardId
          }
        }
      `,
      variables: {
        taskId: Number(taskId),
        cardId: Number(cardId)
      }
    })
  });

  const data = await respuesta.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }

  return data.data.moveTask;
}