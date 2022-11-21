export default function handler(req, res) {
  let pincodes = {
    226016: ["Lucknow", "Uttar Pradesh"],
    110003: ["Delhi", "Delhi"],
  };
  res.status(200).json(pincodes);
}
