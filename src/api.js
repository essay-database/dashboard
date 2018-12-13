import axios from "axios";
const ENDPOINT_URL = "/essays/";

export const getEssays = async () => {
  let essays;
  try {
    ({ data: essays } = await axios.get(ENDPOINT_URL));
  } catch (error) {
    essays = [];
  }
  return essays;
};

export const createEssay = async essay => {
  try {
    await axios.post(ENDPOINT_URL, essay);
  } catch (error) {
    console.error(error);
  }
};

export const editEssay = async essay => {
  try {
    await axios.put(ENDPOINT_URL + essay.id, essay);
  } catch (error) {
    console.error(error);
  }
};

export const deleteEssay = async essay => {
  try {
    await axios.delete(ENDPOINT_URL + essay.id, essay);
  } catch (error) {
    console.error(error);
  }
};
