import { Draggable } from 'react-beautiful-dnd';

export default function DraggableCard({taskDetails, index}) {
    const { _id, month, date, task, description, priority, username } = taskDetails
    return (
        <>
            <Draggable key={_id} draggableId={_id} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`mb-4 bg-white p-4 rounded shadow ${snapshot.isDragging ? 'opacity-50' : ''
                            }`}>
                        <div className="h-full flex items-start">
                            <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                                <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{month}</span>
                                <span className="font-medium text-lg text-gray-800 title-font leading-none">{date}</span>
                            </div>
                            <div className="flex-grow pl-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Priority: {priority}</h2>
                                <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{task}</h1>
                                <p className="leading-relaxed mb-5">{description}</p>
                                <div className='inline-flex item-center justify-center'>
                                    <a className="inline-flex items-center mr-20">
                                        <img alt="blog" src="https://dummyimage.com/103x103" className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
                                        <span className="flex-grow flex flex-col pl-3">
                                            <span className="title-font font-medium text-gray-900">{username}</span>
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
        </>
    )
}