//actions are dispatched to trigger state changes in the store

export const setData = (data) => ({
  type: "SET_DATA",
  payload: data,
});

export const setLoading = (loading) => ({
  type: "SET_LOADING",
  payload: loading,
});
