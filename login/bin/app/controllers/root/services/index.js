// @ts-check
"use strict";

const {
  getData,
  postData,
  putData,
  deleteData,
} = require("../../../models/mysql/queries/news.queries");
const formatReturn = require("../../../utilities/return.formatter");

module.exports.getService = async (payload) => {
  const data = await getData(payload.id);
  return formatReturn({ success: true, data, message: "success get data" });
};

module.exports.postService = async (payload) => {
  await postData(payload);
  return formatReturn({ success: true, message: "success add data" });
};
module.exports.putService = async (payload) => {
  await putData(payload);
  return formatReturn({ success: true, message: "success edit data" });
};
module.exports.deleteService = async (payload) => {
  await deleteData(payload);
  return formatReturn({ success: true, message: "success delete data" });
};
