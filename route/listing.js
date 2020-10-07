const router = require("express").Router();
const verify = require("../route/verifyToken");
const Listing = require("../model/listingSchema");

// create
router.post("/", verify, async (req, res) => {
  const createlisting = new Listing({
    title: req.body.title,
    price: req.body.price,
    locality: req.body.locality,
    details: req.body.details,
  });
  try {
    const listingSave = await createlisting.save();
    res.send(listingSave);
  } catch (error) {
    res.json({ message: error });
  }
});

// read all data
router.get("/", async (req, res) => {
  try {
    const readData = await Listing.find();
    res.send(readData);
  } catch (error) {
    res.json({ message: error });
  }
});

// read single data
router.get("/:listingId", async (req, res) => {
  try {
    const singleData = await Listing.findOne({
      _id: req.params.listingId,
    });
    res.send(singleData);
  } catch (error) {
    res.json({ message: error });
  }
});

// update data
router.put("/:updateId", verify, async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      price: req.body.price,
      locality: req.body.locality,
      details: req.body.details,
    };
    const updateData = await Listing.findByIdAndUpdate(
      { _id: req.params.updateId },
      data
    );
    res.send(updateData);
  } catch (error) {
    res.json({ message: error });
  }
});

// delete data
router.delete("/:deleteId", verify, async (req, res) => {
  try {
    const deletedata = await Listing.findByIdAndRemove(req.params.deleteId);
    res.send(deletedata);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
