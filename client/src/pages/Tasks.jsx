import { useState } from 'react';
import Layout from "../components/layout/Layout";
import { tasksAtom } from "../states/atoms/tasks"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ExpandableList from '../components/ExpandableList';
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import DefaultPage from "./DefaultPage";
import DraggableCard from '../components/DraggableCard';


export default function Tasks() {
    const tasksLoadable = useRecoilValueLoadable(tasksAtom);
    const setTasks = useSetRecoilState(tasksAtom);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const newTasks = Array.from(tasks);
        const [reorderedItem] = newTasks.splice(source.index, 1);
        reorderedItem.status = destination.droppableId;
        newTasks.splice(destination.index, 0, reorderedItem);

        setTasks(newTasks);
    };

    const addTask = (columnId) => {
        const newTask = {
            task: "task",
            description: "req.body.des",
            priority: "req.body.priority",
            status: "initiated",
            username: "req.user",
            usersAssigned: ["req.body.id"]
        };
        setTasks([...tasks, newTask]);
    };

    if (tasksLoadable.state === 'loading') {
        return (<Layout />);
    }

    if (tasksLoadable.state === 'hasError') {
        return (<DefaultPage />);
    }

    const tasks = tasksLoadable.contents;
    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Task Flow</h1>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div key={"initited"} className="flex-1 min-w-[250px]">
                            <h2 className="text-xl font-semibold mb-4">{"Initiated"}</h2>
                            <Droppable droppableId="initited" >
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`bg-gray-200 p-4 rounded-lg min-h-[200px] ${snapshot.isDraggingOver ? 'bg-gray-300' : ''
                                            }`}>
                                        {tasks
                                            .filter(task => task.status === 'initiated')
                                            .map((task, index) => (
                                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`mb-4 bg-white p-4 rounded shadow ${snapshot.isDragging ? 'opacity-50' : ''
                                                                }`}>
                                                            <div className="h-full flex items-start">
                                                                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                                                                    <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{task.month}</span>
                                                                    <span className="font-medium text-lg text-gray-800 title-font leading-none">{task.date}</span>
                                                                </div>
                                                                <div className="flex-grow pl-6">
                                                                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Priority: {task.priority}</h2>
                                                                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{task.task}</h1>
                                                                    <p className="leading-relaxed mb-5">{task.description}</p>
                                                                    <div className='inline-flex item-center justify-center'>
                                                                        <a className="inline-flex items-center mr-20">
                                                                            <img alt="blog" src="https://dummyimage.com/103x103" className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
                                                                            <span className="flex-grow flex flex-col pl-3">
                                                                                <span className="title-font font-medium text-gray-900">{task.username}</span>
                                                                            </span>
                                                                        </a>
                                                                        <a className="inline-flex items-center">
                                                                            <span className="flex-grow flex flex-col pl-3">
                                                                                <span className="title-font font-medium text-gray-900"><ExpandableList /></span>
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <button
                                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={addTask}>
                                Add Task
                            </button>
                        </div>
                        <div key={"in progress"} className="flex-1 min-w-[250px]">
                            <h2 className="text-xl font-semibold mb-4">{"In Progress"}</h2>
                            <Droppable droppableId={"in progress"}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`bg-gray-200 p-4 rounded-lg min-h-[200px] ${snapshot.isDraggingOver ? 'bg-gray-300' : ''
                                            }`}>
                                        {tasks
                                            .filter(task => task.status === 'in progress')
                                            .map((task, index) => (
                                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`mb-4 bg-white p-4 rounded shadow ${snapshot.isDragging ? 'opacity-50' : ''
                                                                }`}>
                                                            <div className="h-full flex items-start">
                                                                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                                                                    <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{task.month}</span>
                                                                    <span className="font-medium text-lg text-gray-800 title-font leading-none">{task.date}</span>
                                                                </div>
                                                                <div className="flex-grow pl-6">
                                                                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Priority: {task.priority}</h2>
                                                                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{task.task}</h1>
                                                                    <p className="leading-relaxed mb-5">{task.description}</p>
                                                                    <div className='inline-flex item-center justify-center'>
                                                                        <a className="inline-flex items-center mr-20">
                                                                            <img alt="blog" src="https://dummyimage.com/103x103" className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
                                                                            <span className="flex-grow flex flex-col pl-3">
                                                                                <span className="title-font font-medium text-gray-900">{task.username}</span>
                                                                            </span>
                                                                        </a>
                                                                        <a className="inline-flex items-center">
                                                                            <span className="flex-grow flex flex-col pl-3">
                                                                                <span className="title-font font-medium text-gray-900"><ExpandableList /></span>
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <div key={"completed"} className="flex-1 min-w-[250px]">
                            <h2 className="text-xl font-semibold mb-4">{"Completed"}</h2>
                            <Droppable droppableId={"completed"}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`bg-gray-200 p-4 rounded-lg min-h-[200px] ${snapshot.isDraggingOver ? 'bg-gray-300' : ''
                                            }`}>
                                        {tasks
                                            .filter(task => task.status === 'completed')
                                            .map((task, index) => (
                                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`mb-4 bg-white p-4 rounded shadow ${snapshot.isDragging ? 'opacity-50' : ''
                                                                }`}>
                                                            <div className="h-full flex items-start">
                                                                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                                                                    <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{task.month}</span>
                                                                    <span className="font-medium text-lg text-gray-800 title-font leading-none">{task.date}</span>
                                                                </div>
                                                                <div className="flex-grow pl-6">
                                                                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Priority: {task.priority}</h2>
                                                                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{task.task}</h1>
                                                                    <p className="leading-relaxed mb-5">{task.description}</p>
                                                                    <div className='inline-flex item-center justify-center'>
                                                                        <a className="inline-flex items-center mr-20">
                                                                            <img alt="blog" src="https://dummyimage.com/103x103" className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
                                                                            <span className="flex-grow flex flex-col pl-3">
                                                                                <span className="title-font font-medium text-gray-900">{task.username}</span>
                                                                            </span>
                                                                        </a>
                                                                        <a className="inline-flex items-center">
                                                                            <span className="flex-grow flex flex-col pl-3">
                                                                                <span className="title-font font-medium text-gray-900"><ExpandableList /></span>
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                </DragDropContext>
            </div>
        </Layout>
    );
}
