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
        <>
            <img
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={style}
                src={imgSrc}
                alt="Product Images"
                className={`${index === 0 ? "col-span-2 row-span-2" : ""} bg-white border border-zinc-300 rounded-md z-10`}
            />
        </>
    );
};

export default SortableImg;