import { useEffect, useState } from "react";
import { blogAPI } from "../../api";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    image: null,
  });

  const fetchBlogs = async () => {
    const res = await blogAPI.getAll();
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("author", form.author);
    data.append("content", form.content);
    if (form.image) data.append("image", form.image);

    if (editingId) {
      await blogAPI.update(editingId, data);
    } else {
      await blogAPI.create(data);
    }

    setForm({ title: "", author: "", content: "", image: null });
    setEditingId(null);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      author: blog.author,
      content: blog.content,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this blog?")) {
      await blogAPI.delete(id);
      fetchBlogs();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-24">
      <h2 className="text-2xl font-bold mb-4">Blog Admin</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="border p-2 w-full"
          required
        />

        <input
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
          className="border p-2 w-full"
          required
        />

        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Content"
          className="border p-2 w-full h-32"
          required
        />

        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Blog" : "Create Blog"}
        </button>
      </form>

      {blogs.map((b) => (
        <div key={b._id} className="border p-4 mb-4 rounded">
          <h3 className="font-bold">{b.title}</h3>
          <p className="text-sm text-gray-500">{b.author}</p>

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => handleEdit(b)}
              className="bg-yellow-500 px-3 py-1 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(b._id)}
              className="bg-red-600 px-3 py-1 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogAdmin;
