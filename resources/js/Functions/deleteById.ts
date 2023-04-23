const deleteById = (id, name, array, setData) => {
    setData(array.filter(i => i.id !== id));

};

export default deleteById;
