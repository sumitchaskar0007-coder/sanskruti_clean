import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogAPI } from "../api";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    blogAPI.getById(id).then((res) => setBlog(res.data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {blog.image && (
        <img
          src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${blog.image}`}
          className="w-full h-80 object-cover mb-4"
        />
      )}

      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        By {blog.author} • {new Date(blog.createdAt).toDateString()}
      </p>

      <p className="leading-7">{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
