
# search-integration-package

## Installation

To use this search integration package, add the following line to your `package.json` file:

```json
"searchintegration": "git+https://github.com/ritvik-infobeans/search-integration-package"
```

Then run:

```bash
npm install
```

## Usage

In your server code, where you want to use the package, import the `phraseSearch` function as follows:

```javascript
const phraseSearch = require("searchintegration");
```

Create a route and API endpoint in your server, for example:

```javascript
const express = require('express');
const app = express();

// Change the name of fields based on the JSON you provided
const searchFields = [
  "firstname",
  "lastname",
  "gender",
  "employer",
  "email",
  "city",
  "state",
  "address",
];

// Modify the index based on which index you are targeting
const index = "bank";

app.get("/search", async (req, res) => {
  try {
    const data = await phraseSearch(index, req.query.q, searchFields);
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

Ensure that Elasticsearch is installed on your system and that you have successfully indexed data into it using the following command:

```bash
curl -H "Content-Type: application/x-ndjson" -XPOST "localhost:9200/bank/_bulk?pretty&refresh" --data-binary "@myData.json"
```

Make sure that the JSON you are uploading follows a specified JSONL format.

## Notes

- Update the names of fields in the `searchFields` array based on the structure of your JSON data.
- Modify the `index` variable based on the Elasticsearch index you are targeting.

## License

This package is licensed under the [MIT License](LICENSE).
```

Adjust the content as needed, and ensure that you include any additional information or instructions that may be relevant for users of your package.
