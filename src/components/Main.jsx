import React, { useContext } from "react";
import { MoreHorizontal } from "react-feather";
import CardAdd from "./CardAdd";
import { BoardContext } from "../context/BoardContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Utils from "../utils/Utils";

const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const bdata = allboard.boards[allboard.active];

  function onDragEnd(res) {
    if (!res.destination) {
      console.log("No Destination");
      return;
    }
    const newList = [...bdata.list];
    const s_id = parseInt(res.source.droppableId);
    const d_id = parseInt(res.destination.droppableId);
    const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
    newList[d_id - 1].items.splice(res.destination.index, 0, removed);

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  }

  const cardData = (e, ind) => {
    let newList = [...bdata.list];
    newList[ind].items.push({ id: Utils.makeid(5), title: e });

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };

  const listData = (e) => {
    let newList = [...bdata.list];
    newList.push({ id: newList.length + 1 + "", title: e, items: [] });

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };

  return (
    <div className="flex flex-col w-full h-96 mx-auto">
      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-auto overflow-y-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            {bdata.list &&
              bdata.list.map((x, ind) => {
                return (
                  <div
                    key={ind}
                    className="mr-3 w-60 h-fit rounded-md p-2 bg-[#fff] flex-shrink-0"
                  >
                    <div className="list-body">
                      <div className="flex justify-between p-1">
                        <span className="text-xl">{x.title}</span>
                        <button className="p-1 rounded-sm">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                      <Droppable droppableId={x.id}>
                        {(provided, snapshot) => (
                          <div
                            className="py-1"
                            ref={provided.innerRef}
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "transparent"
                                : "transparent",
                            }}
                            {...provided.droppableProps}
                          >
                            {x.items &&
                              x.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div className="item flex justify-between items-center bg-[#fff] p-1 cursor-pointer rounded-md shadow-xl mt-2 hover:border-gray-500">
                                          <span>{item.title}</span>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <CardAdd getcard={(e) => cardData(e, ind)} />
                    </div>
                  </div>
                );
              })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Main;