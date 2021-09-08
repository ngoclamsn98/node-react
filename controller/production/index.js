export const getProducts = async (req,res) => {
  try {
    return res.status(200).json({data: []});
  } catch (error) {
    return res.json({error});
  }
}
