import { $authost } from ".";

export const createTask = async (task) => {
    const { data } = await $authost.post('api/task', task)
    return data
}

export const getTask = async () => {
    const { data } = await $authost.get('api/task')
    return data
}
export const getUser = async () => {
    const { data } = await $authost.get('api/task')
    return data
}

export const putTask = async (task) => {
    const { data } = await $authost.put('api/task', task);
    return data; 
  };
