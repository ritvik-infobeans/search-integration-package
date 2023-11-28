const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" }); // this is for elasticsearch client address

const phraseSearch = async (index, phrase, searchFields) => {
  const hits = [];

  if (phrase.trim().length === 0) {
    return {
      hitsCount: 0,
      hits,
    };
  }

  try {
    const searchResult = await client.search({
      index,
      body: {
        query: {
          multi_match: {
            fields: searchFields,
            query: phrase,
            type: "phrase_prefix",
          },
        },
        highlight: {
          fields: Object.fromEntries(searchFields.map((field) => [field, {}])),
        },
      },
    });

    if (searchResult) {
      searchResult.hits.hits.forEach((hit) => {
        console.log("Hit:", JSON.stringify(hit, null, 2));
        console.log(hit);
        hits.push(hit);
      });
    } else {
      console.log("No hits found", searchResult);
    }
  } catch (e) {
    console.error("Elasticsearch query failed:", e);
    return {
      hitsCount: 0,
      hits,
      error: "Search query failed",
    };
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

module.exports = {
  phraseSearch
};
