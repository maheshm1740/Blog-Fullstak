
function PostCard({post, onClick,}){
  return (
    <div
    onClick={()=>onClick(post.id)}
      className="cursor-pointer block p-6 bg-gray-200 rounded-2xl shadow-lg border border-gray-400 hover:shadow-xl transition-all"
      >
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-md font-bold text-gray-600 mb-1">Author: {post.author}</p>
      <p className="text-sm text-gray-400">Published on: {post.createdAt}</p>
    </div>
  )
}

export default PostCard;