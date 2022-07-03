// @ts-check
"use strict";

module.exports.getDataByKeyName = async (key) => {
	return JSON.stringify({
		startAttemp: 1654238692500,
		attempCount: 1,
		nextAttemp: 0,
	});
};

module.exports.setDataByKeyValue = async (payload) => "OK";

module.exports.delDataByKey = async (key) => "OK";
