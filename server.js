const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const db = require('./database');
const cors = require('cors');


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    birth_date: { type: GraphQLString },
    gender: { type: GraphQLString },
  }),
});



const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: new GraphQLList(UserType),
        resolve: (_, args) => {
          return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', (err, rows) => {
              if (err) reject([]);
              resolve(rows);
            });
          });
        },
      },
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: (_, args) => {
          return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', args.id, (err, row) => {
              if (err) reject(null);
              resolve(row);
            });
          });
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addUser: {
        type: UserType,
        args: {
          first_name: { type: new GraphQLNonNull(GraphQLString) },
          last_name: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          birth_date: { type: new GraphQLNonNull(GraphQLString) },
          gender: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_, args) => {
          return new Promise((resolve, reject) => {
            db.run(
              'INSERT INTO users (first_name, last_name, email, birth_date, gender) VALUES (?, ?, ?, ?, ?)',
              [args.first_name, args.last_name, args.email, args.birth_date, args.gender],
              function (err) {
                if (err) reject(null);
                resolve({
                  id: this.lastID,
                  first_name: args.first_name,
                  last_name: args.last_name,
                  email: args.email,
                  birth_date: args.birth_date,
                  gender: args.gender,
                });
              }
            );
          });
        },
      },
      editUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
          first_name: { type: new GraphQLNonNull(GraphQLString) },
          last_name: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          birth_date: { type: new GraphQLNonNull(GraphQLString) },
          gender: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_, args) => {
          return new Promise((resolve, reject) => {
            db.run(
              'UPDATE users SET first_name = ?, last_name = ?, email = ?, birth_date = ?, gender = ? WHERE id = ?',
              [args.first_name, args.last_name, args.email, args.birth_date, args.gender, args.id],
              function (err) {
                if (err) reject(null);
                resolve({
                  id: args.id,
                  first_name: args.first_name,
                  last_name: args.last_name,
                  email: args.email,
                  birth_date: args.birth_date,
                  gender: args.gender,
                });
              }
            );
          });
        },
      },
      deleteUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_, args) => {
          return new Promise((resolve, reject) => {
            db.run('DELETE FROM users WHERE id = ?', args.id, function (err) {
              if (err) reject(null);
              resolve({ id: args.id });
            });
          });
        },
      },
    },
  }),
});

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
