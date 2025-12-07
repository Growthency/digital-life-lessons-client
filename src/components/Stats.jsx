const Stats = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Growing Community</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-extrabold mb-2">
              500+
            </span>
            <span className="text-sm md:text-base font-medium opacity-80">
              Active Users
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-extrabold mb-2">
              1.2K
            </span>
            <span className="text-sm md:text-base font-medium opacity-80">
              Lessons Shared
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-extrabold mb-2">
              15K
            </span>
            <span className="text-sm md:text-base font-medium opacity-80">
              Total Views
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-extrabold mb-2">
              24/7
            </span>
            <span className="text-sm md:text-base font-medium opacity-80">
              Inspiration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
