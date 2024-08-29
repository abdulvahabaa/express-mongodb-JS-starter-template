import connectToDatabase from "../connection/db.mjs";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // const result = await pool.query(
    //   "SELECT id, userid, name, email, created_at FROM public.users WHERE userid = $1",
    //   [id]
    // );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
