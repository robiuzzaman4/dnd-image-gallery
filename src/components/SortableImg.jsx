import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableImg = ({ imgSrc, index, id, handleImgSelection }) => {
    // distructure some vaules from useSortable
    const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id });

    // state for get checked images
    const [isChecked, setIsChecked] = useState(false);

    // style for some animation
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div className={`${index === 0 && "col-span-2 row-span-2"} w-full h-full bg-white border border-zinc-300 rounded-md z-10 relative group`}>
            {/* checkbox */}
            <input
                onChange={() => {
                    handleImgSelection(id)
                    setIsChecked(!isChecked)
                }}
                type="checkbox"
                name="checkbox"
                id={id}
                className="cursor-pointer h-5 w-5 m-2 rounded-md hidden group-hover:block z-20 absolute top-2 left-2" />

            {/* draggable div */}
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={style} className="w-full h-full">

                {/* main img */}
                <img
                    src={imgSrc}
                    alt="Product Images"
                    className="rounded-md h-full w-full" />

                {/* overlay */}
                <div className={`${isChecked ? "block bg-black/20" : "hidden bg-black/50"} group-hover:block absolute inset-0 rounded-md`} id="overlay" />
            </div>
        </div>
    );
};

export default SortableImg;