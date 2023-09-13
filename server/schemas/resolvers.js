const { Profile, Location } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // profile queries

    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    // location queries

    locations: async () => {
      return Location.find();
    },

    location: async (parent, { locationId }) => {
      return Location.findOne({_id: locationId});
    }
  },

  // create a new profile
  Mutation: {
    // profile mutations

    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    // location mutations

    addLocation: async (parent, {name, lat, lng, photo_ref, description, username}) => {
      const location = await Location.create({name, lat, lng, photo_ref, description, username});
      return location;
    },

    // user can only remove location if it is theirs
    removeLocation: async (parent, { locationId }, context) => {
      if (context.user) {
        // remove location
        const location = await Location.findOneAndRemove({_id: locationId});

        if (!location) {
          return res.status(404).json({ message: 'No location with this id!' });
        }

        // get current user
        const user = Profile.findOneAndUpdate(
          {_id: context.user._id},
          { $pull: { locations: locationId }},
          {new: true}
        );

        if (!user) {
          return res
            .status(404)
            .json({ message: 'Location deleted but no user with this id!' });
        }

        return { location, user };
      }
      throw AuthenticationError;
    },

    // comment mutations

    addComment: async (parent, { locationId, comment}, context) => {
      if (context.user) {
        return Location.findOneAndUpdate(
          { _id: locationId },
          { $addToSet: { comments: comment } },
          { new: true, runValidators: true}
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;


