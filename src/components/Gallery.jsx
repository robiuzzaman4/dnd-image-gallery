import { images } from "../libs";
import Img from "./Img";

const Gallery = () => {
    return (
        <section className="bg-white ">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {
                    images.map((img, index) => (
                        <Img
                            key={img.id}
                            imgSrc={img.imgSrc}
                            id={img.id}
                            index={index}/>
                    ))
                }
            </div>
        </section>
    );
};

export default Gallery;