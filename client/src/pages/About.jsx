import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { useRecoilValueLoadable } from 'recoil';
// import { taskColSelector } from '../states/selectors/tasks';

const initialColumns = [
    {
        id: 'todo',
        title: 'To Do',
        tasks: [
            { id: 'task-1', content: 'Learn React' },
            { id: 'task-2', content: 'Build a project' },
        ],
    },
    {
        id: 'inProgress',
        title: 'In Progress',
        tasks: [
            { id: 'task-3', content: 'Study JSX' },
        ],
    },
    {
        id: 'done',
        title: 'Done',
        tasks: [
            { id: 'task-4', content: 'Set up development environment' },
        ],
    },
];

export default function About() {
    const [columns, setColumns] = useState(initialColumns);
    // const ta = useRecoilValueLoadable(taskColSelector)
    // if (ta.state === 'hasValue') {
    //     console.log(ta.contents)
    // }
    const onDragEnd = (result) => {
        const { source, destination } = result;

        // If dropped outside the list
        if (!destination) return;

        // If dropped in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const sourceColIndex = columns.findIndex(col => col.id === source.droppableId);
        const destColIndex = columns.findIndex(col => col.id === destination.droppableId);
        const sourceCol = columns[sourceColIndex];
        const destCol = columns[destColIndex];

        const sourceTasks = [...sourceCol.tasks];
        const destTasks = sourceCol === destCol ? sourceTasks : [...destCol.tasks];

        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);

        const newColumns = [...columns];
        newColumns[sourceColIndex] = {
            ...sourceCol,
            tasks: sourceTasks
        };
        if (sourceCol !== destCol) {
            newColumns[destColIndex] = {
                ...destCol,
                tasks: destTasks
            };
        }

        setColumns(newColumns);
    };

    const addTask = (columnId) => {
        const newTask = {
            id: `task-${Date.now()}`,
            content: 'New Task'
        };
        const newColumns = columns.map(col =>
            col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
        );
        setColumns(newColumns);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Task Board</h1>
            <p className="text-center mb-4">To drag a card, click and hold anywhere on the card, then move it to the desired location.</p>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-col md:flex-row gap-4">
                    {columns.map((column) => (
                        <div key={column.id} className="flex-1 min-w-[250px]">
                            <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`bg-gray-200 p-4 rounded-lg min-h-[200px] ${snapshot.isDraggingOver ? 'bg-gray-300' : ''
                                            }`}
                                    >
                                        {column.tasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`mb-4 bg-white p-4 rounded shadow ${snapshot.isDragging ? 'opacity-50' : ''
                                                            }`}
                                                    >
                                                        <h3 className="text-sm font-semibold mb-2">{task.content}</h3>
                                                        <p className="text-xs text-gray-500">Click and hold to drag</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <button
                                onClick={() => addTask(column.id)}
                                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Task
                            </button>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}