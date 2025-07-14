import axiosClient from "./axiosClient";

export const getAllPosts = ()=>axiosClient.get("/post");

export const getPostById=(id)=>axiosClient.get(`/post/id/${id}`);

export const getPostByname=(name)=>axiosClient.get(`/post/${name}`);

export const createPost=(postData)=>axiosClient.post("/post",postData);

export const deletePost=(id)=>axiosClient.delete(`/post/${id}`);

export const updatePost=(id,updatePost)=>axiosClient.put(`/post/${id}`,updatePost);