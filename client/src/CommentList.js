import React from "react";


const CommentList = ({ comments }) => {
  //const [comments, setComments] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );
  //   console.log(res.data);

  //   console.log(Array.isArray(res.data)); 
    
  //   setComments(res.data)
  //};

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
