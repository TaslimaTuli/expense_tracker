import axios from "axios";

// Function to fetch data from the server
export const FetchData = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of error
  }
};

// Function to delete data from the server
export const DeleteData = async (id) => {
  try {
     await axios.delete(
      `http://127.0.0.1:8000/api/delete/${id}`
    );
    //return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    return []; // Return an empty array in case of error
  }
};
