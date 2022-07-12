function createDocuments(collection, howMany) {
  const c = db[collection];

  for(let i = 0; i < howMany; i++) {
    c.insertOne({
      name: 'document ' + i,
      value: i
    })
  }
}