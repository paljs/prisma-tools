import { mergeTypes } from 'merge-graphql-schemas';
import inputTypes from './inputTypes';
import Comment from './Comment/typeDefs';
import Post from './Post/typeDefs';
import Group from './Group/typeDefs';
import User from './User/typeDefs';

export default mergeTypes([inputTypes, Comment, Post, Group, User], {
  all: true,
});
