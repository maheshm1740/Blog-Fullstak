import { useEffect, useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { deletePost, getPostById, getPostByname, updatePost} from "../service/PostService";
import Modal from "../components/ModaL.JSX";
import MyPostCard from "../components/MyPostCard";
import { useNavigate } from "react-router-dom";

function Myposts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost]=useState();
  const [showModal, setShowModal]=useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newContent, setNewContent] = useState("");

  const { user } = useAuth();
  const navigate=useNavigate();

  useEffect(() => {
      getPostByname(user?.username)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, [user.username]);

  const handlePostClick=async(id)=>{
    try{
      const res=getPostById(id);
      setSelectedPost((await res).data);
      setShowModal(true);
    }catch (error){
      console.error("Failed to fetch post details",error);
    }
  }
    const handleEdit = (post) => {
      setEditingPost(post);
      setNewContent(post.content);
      setShowModal(true);
    };
    const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    try {
      await deletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Delete failed", error);
    }
  }
};

  const handleUpdateContent = async (id) => {
  try {
    const updatedPost = { ...editingPost, content: newContent };
    await updatePost(id,updatedPost); 
    const updatedPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    setPosts(updatedPosts);
    setShowModal(false);
    setEditingPost(null);
  } catch (err) {
    console.error("Update failed", err);
  }
};


  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600 underline underline-offset-4 decoration-2">
          Featured Posts
        </h1>
        
        {posts.length==0 ? (
          <div className="flex flex-col items-center justify-center min-h-[20vh]">
            <p className="text-gray-600 font-semibold text-center text-3xl mb-3">
              You have not created a post yet. Create now
            </p>
            <button
              onClick={() => navigate("/create")}
              className="text-blue-500 hover:underline font-semibold text-2xl"
            >
              Click here
            </button>
          </div>
        ) :
        (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <MyPostCard 
              post={post} 
              key={post.id} 
              onClick={handlePostClick} 
              onEdit={handleEdit}
              onDelete={handleDelete}
              />
          ))}
        </div>
        )}
      </div>
      {showModal && selectedPost && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{selectedPost.title}</h2>
          <div className="border rounded-md bg-gray-100 p-6 max-h-80 overflow-y-auto shadow-inner">
            <p className="text-gray-800 text-lg whitespace-pre-line">
              {selectedPost.content}
            </p>
          </div>
          <p className="text-gray-600 font-semibold">
            <span className="font-medium text-gray-700">Created By:</span> {selectedPost.author}
          </p>
          <p className="text-gray-500 text-sm">
            <span className="font-medium">Published on:</span> {selectedPost.createdAt}
          </p>
          <p className="text-gray-500 text-sm">
            <span className="font-medium">Updated on:</span> {selectedPost.updatedAt}
          </p>
          </div>
        </Modal>
      )}
     
  {showModal && editingPost && (
    <Modal onClose={() => { setShowModal(false); setEditingPost(null); }}>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{editingPost.title}</h2>

        <p className="text-gray-600 font-semibold mb-4">
            <span className="font-medium text-gray-700">Created By:</span> {editingPost.author}
        </p>
        <h3 className="text-xl font-bold mb-2">Edit Content</h3>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows={8}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <p className="text-gray-500 text-sm">
            <span className="font-medium">Created on:</span> {editingPost.createdAt}
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => { setShowModal(false); setEditingPost(null); }}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={()=>handleUpdateContent(editingPost.id)}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  )}
    </div>
  );
}

export default Myposts;
