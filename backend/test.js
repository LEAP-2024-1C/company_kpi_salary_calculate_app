const pr = [
  {
    status: {
      pending: 30,
      progress: 10,
      done: 0,
      review: 0,
      assign: 0,
    },
    taskName: "шошгоны суурь оёх",
    quantity: 2,
    unitPrice: 100,
    _id: "672c32b7dafbb5c0b7b63785",
  },
];

const dbPro = [
  {
    status: {
      pending: 38,
      progress: 2,
      done: 0,
      review: 0,
      assign: 0,
    },
    taskName: "шошгоны суурь оёх",
    quantity: 2,
    unitPrice: 100,
    _id: "672c32b7dafbb5c0b7b63785",
  },
  {
    status: {
      pending: 38,
      progress: 2,
      done: 0,
      review: 0,
      assign: 0,
    },
    taskName: "Сугалгаа 1-р эгнээ",
    quantity: 6,
    unitPrice: 500,
    _id: "672c32b7dafbb5c0b7b63786",
  },
];

const mnP = dbPro.map((dp) => {
  const findId = pr.findIndex((pp) => pp._id === dp._id);
  if (findId > -1) {
    return pr[findId];
  }
  return dp;
});

console.log(mnP);
