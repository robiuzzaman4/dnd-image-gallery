import { useEffect, useState } from "react";

import {
    DndContext, DragOverlay, closestCenter, MouseSensor, useSensor, useSensors, TouchSensor, KeyboardSensor
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { images } from "../libs";
import SortableImg from "./SortableImg";

const Gallery = () => {
    // state for image cards and active card and find touch device
    const [imageCards, setImageCards] = useState(images);
    const [activeImageCard, setActiveImageCard] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    // state for selected images
    const [selectedImages, setSelectedImages] = useState([]);

    // sensors
    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);


    // handle img select function
    const handleImgSelection = (id) => {

        // // Check if the image is already selected
        const isSelected = selectedImages.includes(id);

        if (isSelected) {
            setSelectedImages(selectedImages.filter((img) => img !== id));
        } else {
            setSelectedImages([...selectedImages, id]);
        }
    }

    // delete selected img function
    const deleteSelectedImages = () => {
        setImageCards(imageCards.filter((img) => !selectedImages.includes(img.id)));

        // Clear the selected images after deletion
        setSelectedImages([]);

    };


    // handle window size
    useEffect(() => {
        const handleResize = () => {
            setIsTouchDevice(window.innerWidth < 768);
        };

        handleResize(); // Initial check

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // use sensors
    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor
    );

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
        <section className="max-w-screen-lg mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
            <main className="bg-white rounded-md shadow-sm">
                {/* gallery header */}
                <div className="flex items-center justify-between gap-4 py-4 sm:py-6 px-2 sm:px-4 md:px-8 border-b border-zinc-300">

                    {/* gallery name and selected items number */}
                    <span className="sm:text-xl font-semibold flex items-center gap-2">
                        {
                            selectedImages.length > 0 ?
                                <>
                                    <img src="/checkbox.svg" alt="Checkbox Svg Icon" className="w-6 h-6" />
                                    {
                                        selectedImages.length > 1
                                            ?
                                            `${selectedImages.length} Files Selected`
                                            :
                                            "1 File Selected"
                                    }
                                </>
                                :
                                <>
                                    Gallery
                                </>
                        }

                    </span>

                    {/* delete button */}
                    <button
                        onClick={deleteSelectedImages}
                        className="text-red-500 font-medium">
                        {
                            selectedImages.length > 0 ?
                                <>
                                    {
                                        selectedImages.length > 1 ?
                                            "Delete Files" : "Delete File"
                                    }
                                </>
                                :
                                <></>
                        }
                    </button>

                </div>

                {/* grid gallery */}
                <div className="p-2 sm:p-4 md:p-8">

                    {/* gallery for larger device with dragg and drop feature */}
                    {
                        !isTouchDevice
                            ?
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

                                <DndContext
                                    collisionDetection={closestCenter}
                                    onDragStart={onDragStart}
                                    onDragEnd={onDragEnd}
                                    sensors={sensors}>

                                    <SortableContext
                                        items={images}
                                        strategy={rectSortingStrategy}>
                                        {
                                            imageCards.map((img, index) => (
                                                <SortableImg
                                                    key={img.id}
                                                    imgSrc={img.imgSrc}
                                                    id={img.id}
                                                    index={index}
                                                    handleImgSelection={handleImgSelection} />
                                            ))
                                        }

                                    </SortableContext>

                                    {/* overlay */}
                                    <DragOverlay zIndex={0}>
                                        {
                                            activeImageCard &&
                                            <div className="bg-zinc-100 border border-zinc-300 rounded-md w-full h-full hidden md:block">
                                            </div>
                                        }
                                    </DragOverlay>

                                </DndContext>

                                 {/* add img button */}
                                <div className="p-4 md:p-0 col-span-2 md:col-span-1 border border-dashed border-zinc-300 rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer">
                                    <img src="/gallery.svg" alt="Gallery Svg Icon" className="w-6 h-6" />
                                    <span>Add Images</span>
                                </div>

                            </div>

                            // gallery for smaller device without dragg and drop feature 
                            :
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {
                                    imageCards.map((img, index) => (
                                        <SortableImg
                                            key={img.id}
                                            imgSrc={img.imgSrc}
                                            id={img.id}
                                            index={index}
                                            handleImgSelection={handleImgSelection} />
                                    ))
                                }

                                {/* add img button */}
                                <div className="p-4 md:p-0 col-span-2 md:col-span-1 border border-dashed border-zinc-300 rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer">
                                    <img src="/gallery.svg" alt="Gallery Svg Icon" className="w-6 h-6" />
                                    <span>Add Images</span>
                                </div>

                            </div>
                    }
                </div>
            </main>
        </section>
    );
};

export default Gallery;