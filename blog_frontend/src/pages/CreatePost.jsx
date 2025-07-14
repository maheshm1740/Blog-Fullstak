import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../service/PostService";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const postData = { title, content };
      await createPost(postData);
      setSuccess("Post created successfully!");
      setTimeout(() => navigate("/dashboard"), 1000); 
    } catch (err) {
      setError("Failed to create post.",err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 pt-10">
      <div className="max-w-2xl mx-auto p-6 mt-8 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-200 p-2 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            className="w-full border border-gray-200 p-2 rounded-md h-40 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default CreatePost;
