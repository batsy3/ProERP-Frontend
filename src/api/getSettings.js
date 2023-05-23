import axios from "axios";

const getSetting = async () => {
  try {
    const res = await axios.get(`setting`)
    

    console.log(res.data)
    return {
      result: res.data,
      message: "success",
    };
  } catch (error) {
    console.log(error.message);
  }
}

export default getSetting;