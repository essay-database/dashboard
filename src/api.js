import axios from "axios";
import { columns } from "./data";
const ENDPOINT_URL = "/essays/";

export const getEssays = async () => {
  let essays;
  try {
    ({ data: essays } = await axios.get(ENDPOINT_URL));
  } catch (error) {
    essays = [];
  }
  return essays.map(essay => convertToArray(essay));
};

export const createEssay = async essay => {
  try {
    await axios.post(ENDPOINT_URL, convertToObj(essay));
  } catch (error) {
    console.error(error);
  }
};

export const editEssay = async essay => {
  try {
    await axios.put(ENDPOINT_URL + essay[0], convertToObj(essay));
  } catch (error) {
    console.error(error);
  }
};

export const deleteEssay = async id => {
  try {
    await axios.delete(ENDPOINT_URL + id);
  } catch (error) {
    console.error(error);
  }
};

const convertToArray = essay => Object.values(essay);
const convertToObj = essay =>
  columns.reduce(
    (accum, curr, idx) =>
      Object.assign(accum, { [curr]: essay[idx] ? essay[idx] : "" }),
    {}
  );
