import { useEffect, useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { getAllPosts, getPostById} from "../service/PostService";
import PostCard from "../components/PostCard";
import Modal from "../components/ModaL.JSX";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost]=useState();
  const [showModal, setShowModal]=useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
      getAllPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handlePostClick=async(id)=>{
    try{
      const res=getPostById(id);
      setSelectedPost((await res).data);
      setShowModal(true);
    }catch (error){
      console.error("Failed to fetch post details",error);
    }
  }

  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to 📚 Post Dashboard {user?.username}
        </h1>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} onClick={handlePostClick}/>
          ))}
        </div>
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
    </div>
  );
}

export default Dashboard;
