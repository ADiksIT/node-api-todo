const checkUserById = async (id, User) => {
  if (!id) {
    return { message: `"id" from req.params === ${id}`, status: 400 };
  }

  const candidate = await User.findById(id);

  if (!candidate) {
    return { message: `User for this ID(${id}) was not found`, status: 404 };
  }

  return { status: 200, candidate };
};

module.exports = checkUserById;
