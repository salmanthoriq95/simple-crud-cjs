// @ts-check
"use strict";

module.exports.getData = async (id) => {
  const allData = [
    {
      id: 1,
      title: "Pacific Northwest high-speed rail line",
      content:
        "Currently there are only a few options for traveling the 140 miles between Seattle and Vancouver and none of them are ideal.",
      author: "Greg",
    },
    {
      id: 2,
      title: "Hitting the beach was voted the best part of life in the region",
      content:
        "Exploring tracks and trails was second most popular, followed by visiting the shops and then traveling to local parks.",
      author: "Ethan",
    },
    {
      id: 3,
      title: "Machine Learning from scratch",
      content:
        "Bare bones implementations of some of the foundational models and algorithms.",
      author: "Jo",
    },
    {
      id: 7,
      title: "Lorem Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      author: "salman",
    },
    {
      id: 8,
      title: "hello world",
      content:
        "Currently there are only a few options for traveling the 140 miles between Seattle and Vancouver and none of them are ideal.",
      author: "salman",
    },
    {
      id: 11,
      title: "hello world",
      content:
        "Currently there are only a few options for traveling the 140 miles between Seattle and Vancouver and none of them are ideal.",
      author: null,
    },
  ];

  const dataWithId = [
    {
      id: id,
      title: "hello world",
      content:
        "Currently there are only a few options for traveling the 140 miles between Seattle and Vancouver and none of them are ideal.",
      author: null,
    },
  ];
  const dataReturn = id ? dataWithId : allData;
  return await dataReturn;
};

module.exports.postData = async () => {
  return await {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 12,
    info: "",
    serverStatus: 2,
    warningStatus: 0,
  };
};

module.exports.putData = async () => {
  return await {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: "Rows matched: 1  Changed: 1  Warnings: 0",
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  };
};

module.exports.deleteData = async () => {
  return await {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: "",
    serverStatus: 2,
    warningStatus: 0,
  };
};
