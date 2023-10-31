import { useState } from "react";

import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { images } from "../libs";
import SortableImg from "./SortableImg";

const Gallery = () => {
    // state for image cards and active card
    const [imageCards, setImageCards] = useState(images);
    const [activeImageCard, setActiveImageCard] = useState(false);

    // on drag start function
    const onDragStart = (event) => {
        // set active card state
        setActiveImageCard(event.active.id);
    }

    // on drag end function
    const onDragEnd = (event) => {
        // get active and over item from event
        const { active, over } = event;

        // checking active card is not overed this own card
        if (active.id === over.id) {
            return;
        }

        setImageCards((imageCards) => {
            // find old index of card
            const oldIndex = imageCards.findIndex((imageCard) => imageCard.id === active.id);

            // find new index of card
            const newIndex = imageCards.findIndex((imageCard) => imageCard.id === over.id);

            // return updated ui
            return arrayMove(imageCards, oldIndex, newIndex);
        })

        // remove active card state
        setActiveImageCard(null);
    }
    return (
        <section className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
            <div className="bg-white rounded-md shadow-sm">
                {/* gallery header */}
                <div className="flex items-center justify-between gap-4 py-4 sm:py-6 px-2 sm:px-4 md:px-8 border-b border-zinc-300">
                    <span className="sm:text-xl font-medium">Gallery</span>
                    <span className="text-red-500 sm:text-xl font-medium">Delete Files</span>
                </div>

                {/* grid gallery */}
                <div className="p-2 sm:p-4 md:p-8">
                    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={onDragStart}>
                        <SortableContext items={images} strategy={rectSortingStrategy}>

                            {/* grid gallery */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {
                                    imageCards.map((img, index) => (
                                        <SortableImg
                                            key={img.id}
                                            imgSrc={img.imgSrc}
                                            id={img.id}
                                            index={index} />
                                    ))
                                }
                            </div>
                        </SortableContext>

                        {/* overlay */}
                        <DragOverlay zIndex={0}>
                            {
                                activeImageCard &&
                                <div className="bg-zinc-50 border border-zinc-300 rounded-md w-full h-full">
                                </div>
                            }
                        </DragOverlay>
                    </DndContext>
                </div>
            </div>
        </section >
    );
};

export default Gallery;