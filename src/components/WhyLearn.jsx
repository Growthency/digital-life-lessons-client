import { FaLightbulb, FaShieldAlt, FaSeedling, FaUsers } from "react-icons/fa";

const WhyLearn = () => {
  const reasons = [
    {
      id: 1,
      icon: <FaLightbulb className="text-4xl text-yellow-500" />,
      title: "Gain New Perspectives",
      description:
        "Seeing life through others' experiences opens your mind to new possibilities and ways of thinking.",
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-4xl text-blue-500" />,
      title: "Avoid Common Mistakes",
      description:
        "Learn from the challenges others faced so you can navigate your own journey with more wisdom.",
    },
    {
      id: 3,
      icon: <FaSeedling className="text-4xl text-green-500" />,
      title: "Personal Growth",
      description:
        "Reflecting on lessons helps you grow emotionally and mentally, becoming a better version of yourself.",
    },
    {
      id: 4,
      icon: <FaUsers className="text-4xl text-purple-500" />,
      title: "Connect & Inspire",
      description:
        "Sharing your story builds a bridge of empathy and inspires others who might be going through similar times.",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Learning From Life Matters
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Life is the greatest teacher. Here is why preserving and sharing
            these lessons is crucial for us and our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="card-body items-center text-center">
                <div className="p-4 rounded-full bg-base-200 mb-2">
                  {item.icon}
                </div>
                <h3 className="card-title text-xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearn;
