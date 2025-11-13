import React, { useEffect, useState } from "react";
import { MessageSquare, Car } from "lucide-react"; // Icons for meta-info

const NewsAndArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://assigmen-10-server-side.vercel.app/newsandarticle"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setArticles(data);
      } catch (err) {
        setError("Failed to fetch articles: " + err.message);
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          Loading articles...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-[#0a0f1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500">
          Error: {error}
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return { day: "", month: "" };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { day: "", month: "" };

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return { day, month };
  };

  return (
    <section className="py-16 md:py-24 bg-[#0a0f1b] ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-3xl font-black text-white leading-tight">
            News & <span className="text-blue-500">Articles</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {articles.map((article) => {
            const formattedDate = formatDate(article.date);
            return (
              <div
                key={article.id}
                className="bg-[#101828] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative">
                  {/* --- CHANGE MADE HERE: Using article.banner_image for the image source --- */}
                  <img
                    src={article.banner_image}
                    alt={article.title}
                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-lg text-center font-bold text-sm">
                    <span className="block text-lg leading-none">
                      {formattedDate.day}
                    </span>
                    <span className="block leading-none">
                      {formattedDate.month}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <Car className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="mr-3">{article.category}</span>
                    <MessageSquare className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{article.comment_status}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-100 mb-4 leading-tight group-hover:text-blue-400 transition-colors duration-200">
                    <a href="#" className="hover:underline">
                      {article.title}
                    </a>
                  </h3>

                  <div className="flex items-center text-gray-400 text-sm">
                    <img
                      src={article.admin.image}
                      alt={article.admin.name}
                      className="h-8 w-8 rounded-full object-cover mr-2"
                    />
                    <span>{article.admin.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsAndArticles;
