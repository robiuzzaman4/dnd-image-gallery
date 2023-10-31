import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableImg = ({ imgSrc, index, id }) => {
    // distructure some vaules from useSortable
    const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id });

    // style for some animation
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`${index === 0 && "col-span-2 row-span-2"} w-full h-full bg-white border border-zinc-300 rounded-md z-10 touch-none`}>
            <img
                src={imgSrc}
                alt="Product Images"
            />
        </div>
    );
};

export default SortableImg;