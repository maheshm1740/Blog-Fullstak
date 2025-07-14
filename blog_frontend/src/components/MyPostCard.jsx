function MyPostCard({ post, onClick, onEdit, onDelete }) {
  return (
      <div
        onClick={()=>onClick(post.id)}
        className="cursor-pointer block p-6 bg-gray-200 rounded-2xl shadow-lg border border-gray-400 hover:shadow-xl transition-all"
        >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-md font-bold text-gray-600 mb-1">Author: {post.author}</p>
        <p className="text-sm text-gray-400">Published on: {post.createdAt}</p>
        <div className="flex gap-3 mt-4">
        <button
          className="bg-blue-600 text-white px-2 py-0.5 rounded hover:shadow-xl transition-all"
          onClick={() => onEdit(post)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 text-white px-2 py-0.5 rounded hover:shadow-xl transition-all"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </button>
      </div>
      </div>
  );
}

export default MyPostCard;