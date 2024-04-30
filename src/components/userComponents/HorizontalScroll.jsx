import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const HorizontalScroll = ({category}) => {
  console.log(category)
  return (
    <div className="bg-neutral-800 opacity-100 bg-transparent w-full">
        
      <div className="flex h-48 items-center justify-center">
        {/* <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span> */}
      </div>
      <HorizontalScrollCarousel category={category} />
      <div className="flex h-48 items-center justify-center bg-transparent">
        {/* <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span> */}
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = ({category}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
 

  if (!Array.isArray(category) || category.length === 0) {
    return null;
  }


  const categoryData = category.slice(1).map((cat) => ({
    categoryName: cat.name.split(" ")[0],
    categoryImage: cat.image, 
  }));

 return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900 bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {categoryData.map((cat, index) => (
            <Card
              categoryName={cat.categoryName}
              categoryImage={cat.categoryImage}
              key={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ categoryName, categoryImage }) => {
  return (
    <div className="group relative h-[350px] w-[350px] overflow-hidden bg-neutral-200">
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url(${categoryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-xl font-black uppercase text-white backdrop-blur-lg">
          {categoryName}
        </p>
      </div>
    </div>
  );
};


export default HorizontalScroll;

