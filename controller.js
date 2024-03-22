const Inventory = require("./model");

// get all Inventories
const getInventories = async (req, res) => {
  const inventories = await Inventory.find({});
  res.status(200).json(inventories);
};

// Add one Inventory
const addInventory = async (req, res) => {
  const { name, description, quantity, price } = req.body;

  const newInventory = new Inventory({ name, description, quantity, price});
  await newInventory.save();
  res.status(201).json(newInventory);
};

// Get Inventory by ID
const getInventory = async (req, res) => {
  const { id } = req.params;

  const Inventory = await Inventory.findById(id);
  if (!inventory) {
    return res.status(404).json({ message: "Inventory not found" });
  }
  res.status(200).json(inventory);
};

// Delete Inventory by ID
const deleteInventory = async (req, res) => {
  const { id } = req.params;

  const inventory = await Inventory.findByIdAndDelete({ _id: id });
  if (!inventory) {
    return res.status(404).json({ message: "Inventory not found" });
  }
  res.status(200).json({ message: "Inventory deleted successfully" });
};

// Delete all Inventories
const deleteAllInventories = async (req, res) => {
  const result = await Inventory.deleteMany({});
  res
    .status(200)
    .json({ message: `Deleted ${result.deletedCount} inventories successfully` });
};

// Update Inventory by ID
const updateInventory = async (req, res) => {
  const { id } = req.params;
  const updatedInventory = req.body;
  const inventory = await Inventory.findOneAndUpdate({ _id: id }, updatedInventory);
  if (!inventory) {
    return res.status(404).json({ message: "Inventory not found" });
  }
  res.status(200).json(inventory);
};

module.exports = {
  getInventories,
  addInventory,
  getInventory,
  deleteInventory,
  deleteAllInventories,
  updateInventory,
};