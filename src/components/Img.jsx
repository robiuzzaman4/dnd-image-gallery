const Img = ({ imgSrc, index }) => {
    return (
        <>
            <img
                src={imgSrc}
                alt="Product Images"
                className={`${index === 0 ? "col-span-2 row-span-2" : ""} border border-zinc-300 rounded-md`}
            />
        </>
    );
};

export default Img;