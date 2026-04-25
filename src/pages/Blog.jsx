import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogAPI } from "../api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogAPI.getAll().then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Our Blog</h1>

      {blogs.map((b) => (
        <div key={b._id} className="border rounded mb-6 overflow-hidden">
          {b.image && (
            <img
              src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${b.image}`}
              className="w-full h-64 object-cover"
            />
          )}

          <div className="p-4">
            <h2 className="text-xl font-bold">{b.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(b.createdAt).toDateString()}
            </p>

            <p className="mt-2">
              {b.content.substring(0, 150)}...
            </p>

            <Link
              to={`/blog/${b._id}`}
              className="inline-block mt-3 text-blue-600 font-semibold"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
