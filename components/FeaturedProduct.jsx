import Image from "next/image";

const collections = [
  {
    id: 1,
    title: "S-Line",
    subtitle: "Narrow lamellas for a taller, cozier space",
    colors: ["White", "Grey", "Anthracite", "Black", "Mocca", "Natural", "Natural Black"],
    image: "/collections/s-line.png",
  },
  {
    id: 2,
    title: "M-Line",
    subtitle: "Medium-width lamellas with extra depth",
    colors: ["White", "Grey", "Anthracite", "Black", "Mocca", "Natural", "Natural Black", "Chocolate"],
    image: "/collections/m-line.png",
  },
  {
    id: 3,
    title: "L-Line",
    subtitle: "Wide lamellas for bold visual impact",
    colors: ["White", "Grey", "Anthracite", "Mocca", "Natural", "Chocolate"],
    image: "/collections/l-line.png",
  },
];

const OurCollections = () => {
  return (
    <div className="mt-16 px-4 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Our Collections</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map(({ id, title, subtitle, colors, image }) => (
          <div
            key={id}
            className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col"
          >
            <div className="h-64 w-full relative">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-between flex-1 p-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-500 mb-4 text-sm">{subtitle}</p>
                <p className="font-semibold text-gray-800 mb-2 text-sm">Available Colors:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <button className="mt-auto w-full py-2.5 bg-red-600 hover:bg-red-700 transition text-white rounded text-sm font-semibold">
                View Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurCollections;
