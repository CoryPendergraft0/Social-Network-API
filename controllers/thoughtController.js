const { Thought, User } = require('../models');

module.exports = {
  // this gets all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // this gets a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'These are not the droids you are looking for' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // this creates a thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        console.log(thought)
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: false,
            new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but that person does not exist',
            })
          : res.json('Thought created')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

}