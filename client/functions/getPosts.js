const axios = require('axios');
require('dotenv').config();
exports.handler = async (event, context, callback) => {

    const { data } = await axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.FUANADB_ACCESS_KEY}`
        },
        data: {
            query: `query {
                getPosts {
                  data {
                    _id
                    title
                    description
                    code
                    createdDate
                  }
                }
              }`,
            variables: {}
        }
    });

    return {
        statusCode: 200,
        body: JSON.stringify(data.data.getPosts.data),
    }


}