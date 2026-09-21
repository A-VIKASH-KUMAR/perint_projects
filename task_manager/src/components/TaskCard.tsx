interface Task {
    taskName:string;
    description:string;
}
export const TaskCard = (props:Task) => {
    const {taskName, description  } = props
    return (
        <div>
            <ul>
                <li>{taskName}</li>
                <li>{description}</li>
            </ul>
        </div>
        
    )
}