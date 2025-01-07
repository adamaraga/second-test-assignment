const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const { postId, parentId, operation, number, userId } = req.body;

  try {
    // Find the target (post or parent comment)
    const target = parentId
      ? await Comment.findById(parentId)
      : await Post.findById(postId);

    if (!target) {
      return res.status(404).json({ message: "Parent post/comment not found" });
    }

    // Calculate the result
    const baseNumber = parentId ? target.result : target.number;

    function isValidOperation(operation) {
      // Define allowed operations
      const allowedOperations = ["+", "-", "*", "/"];
      return allowedOperations.includes(operation);
    }

    function isValidNumber(value) {
      // Check if the value is a valid finite number
      const number = parseFloat(value);
      return typeof number === "number" && isFinite(number);
    }

    if (!isValidOperation(operation)) {
      return res.status(401).json({ message: "Invalid operation" });
    }

    if (!isValidNumber(number)) {
      return res.status(401).json({ message: "Invalid number" });
    }

    const result = eval(`${baseNumber} ${operation} ${number}`);

    // Create the new comment
    const newComment = new Comment({
      postId,
      parentId,
      operation,
      number,
      result,
      userId,
      replies: [],
    });

    await newComment.save();

    console.log("req.body", target.replies);
    // Add the comment to the parent's `children` array
    if (parentId) {
      target.replies.push(newComment._id);
    } else {
      target.comments.push(newComment._id);
    }

    await target.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
};
