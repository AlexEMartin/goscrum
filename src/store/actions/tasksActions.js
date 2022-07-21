import { TASK_REQUEST, TASK_SUCCESS, TASK_FAILURE } from '../types'

const tasksRequest = () => ({
    type: TASK_REQUEST,
})

const taskSuccess = (data) => ({
    type: TASK_SUCCESS,
    payload: data,
})

const taskFailure = (error) => ({
    type: TASK_FAILURE,
    payload: error,
})

export const getTasks = (path) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`https://goscrum-api.alkemy.org/task/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then(response => response.json())
    .then(data => {dispatch(taskSuccess(data.result))})
    .catch(error => {dispatch(taskFailure(error))})
};

export const deleteTask = id => (dispatch) => {
    dispatch(tasksRequest());
    fetch(`https://goscrum-api.alkemy.org/task/${id}`, {
      method: 'DELETE',  
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(response => response.json())
      .then(() => {dispatch(getTasks(''))})
      .catch(error => {dispatch(taskFailure(error))})
  };
  
  export const editCardStatus = data => (dispatch) => {

    const statusArray = ['NEW', 'IN PROGRESS', 'FINISHED'];

    const newStatusIndex = statusArray.indexOf(data.status) > 1
            ? 0
            : statusArray.indexOf(data.status) + 1
    
    dispatch(tasksRequest());
    fetch(`https://goscrum-api.alkemy.org/task/${data._id}`, {
      method: 'PATCH',  
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        task: {
          title: data.title,
          importance: data.importance,
          status: statusArray[newStatusIndex],
          description: data.description,
        }
      })
    }).then(response => response.json())
      .then(() => {dispatch(getTasks(''))})
      .catch(error => {dispatch(taskFailure(error))})
  };  
