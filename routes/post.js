const express = require("express")
const router = express.Router()
const Post = require("../Model/Post")

// Reading Post or Getting Posts
router.get("/", async (req, res) => {
  // res.send("You are in posts.")
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.json({ message: err })
  }
})

// Creating Post

router.post("/", async (req, res) => {
  const post = new Post({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  try {
    const savedPost = await post.save()
    res.json(savedPost)
  } catch (error) {
    res.json({ message: error })
  }

  // calling data from DB and sending data into DB

  // post
  //   .save()
  //   .then((data) => {
  //     res.json(data)
  //     //.status(200)
  //   })
  //   .catch((err) => {
  //     res.json({ message: err })
  //   })
})

// Specific Post || Dynamic Route
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.json(post)
  } catch (err) {
    res.json({ message: err })
  }
})

// Deleting Post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.postId })
    res.json(removedPost)
  } catch (error) {
    res.json({ message: error })
  }
})

//Updateing a post

router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      // { $set: { name: req.body.name } },
      //{ $set: { email: req.body.email } }
      { $set: { password: req.body.password } }
    )
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router  // Exporting this file
