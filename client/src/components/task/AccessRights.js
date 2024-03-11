import { useContext } from "react";
import { Context } from '../../index.js'
import useSubordinate from '../../utils/useSubordinate.js'
export const AccessRights = () => {
    const { task, user } = useContext(Context);
    const userResponsible = user.user?.find(u => u.login === user?.currentUser?.login)?.user_id;
    const subordinate = useSubordinate()
    const subordinateResponsible = subordinate.filter(sub => sub.Header === userResponsible)
    const tasks = [...task.tasks]?.filter(task => {
        const responsibleId = task?.responsible_id;
        const creatorId = task?.creator_id;
        return user?.currentUser?.role === 'ADMIN' ?
            subordinateResponsible[0]?.accessor.includes(responsibleId) || subordinateResponsible[0]?.accessor.includes(creatorId) || userResponsible === responsibleId || userResponsible === creatorId
            : userResponsible === responsibleId;
    })
    return tasks
}

export const Subordinate = () => {
    const { task, user } = useContext(Context);
    const subordinate = useSubordinate()
    const userResponsible = user.user?.find(u => u.login === user?.currentUser?.login)?.user_id;
    const subordinateResponsible = subordinate.filter(sub => sub.Header === userResponsible)

    return subordinateResponsible
}