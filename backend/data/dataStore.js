// Simple in-memory store
let datasets = {}; // { id: { name, rows } }

function addDataset(id, name, rows) {
  datasets[id] = { id, name, rows };
  return datasets[id];
}

function listDatasets() {
  return Object.values(datasets);
}

function getDataset(id) {
  return datasets[id];
}

function updateDataset(id, rows) {
  if (!datasets[id]) return null;
  datasets[id].rows = rows;
  return datasets[id];
}

module.exports = {
  addDataset,
  getDataset,
  listDatasets,
  updateDataset,
};
