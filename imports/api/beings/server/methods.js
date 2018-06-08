import Beings from './beings';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// Add 10:52 am
import rateLimit from '../../modules/rate-limit.js';

export const upsertBeing = new ValidatedMethod({
  name: 'beings.upsert',
  validate: new SimpleSchema({
    // Filler descriptive information- 
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
  }).validator(),
  run(being) {
    return Beings.upsert({ _id: being._id }, { $set: being });
  },
});

export const removeBeing = new ValidatedMethod({
  name: 'being.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Beings.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertBeing,
    removeBeing,
  ],
  limit: 5,
  timeRange: 1000,
});
