const Post = require("../models/Post");

exports.addPost = async (req, res) => {
  const { number, userId } = req.body;
  function isValidNumber(value) {
    // Check if the value is a valid finite number
    const number = parseFloat(value);
    return typeof number === "number" && isFinite(number);
  }
  if (!number || !isValidNumber(number)) {
    return res.status(401).json({ message: "Invalid number" });
  }

  try {
    const post = new Post({
      number,
      userId,
      comments: [],
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllPost = async (req, res) => {
  const limit = req.params.limit ? +req.params.limit : 10;
  const page = req.params.page;

  try {
    // const posts = await Post.find().populate([
    //   {
    //     path: "comments",
    //     populate: [
    //       {
    //         path: "replies",
    //         model: "Comment",
    //       },
    //       {
    //         path: "userId",
    //         select: "-password", // Exclude the password field
    //       },
    //     ],
    //   },
    //   {
    //     path: "userId",
    //     select: "-password",
    //   },
    // ]);

    const posts = await Post.paginate(
      {},
      {
        limit,
        page,
        sort: {
          _id: -1,
        },
        populate: [
          {
            path: "comments",
            populate: [
              {
                path: "replies",
                populate: [
                  {
                    path: "replies",
                    populate: [
                      {
                        path: "replies",
                        model: "Comment",
                      },
                      {
                        path: "userId",
                        select: "-password",
                      },
                    ],
                  },
                  {
                    path: "userId",
                    select: "-password",
                  },
                ],
              },
              {
                path: "userId",
                select: "-password",
              },
            ],
          },
          {
            path: "userId",
            select: "-password",
          },
        ],
      }
    );

    const { docs, totalPages } = posts;

    res.status(200).json({ posts: docs, totalPages, limit });
    // res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
