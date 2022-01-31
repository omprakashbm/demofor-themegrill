const FetchUrl = async (Url) => {
  let data, loading;
  try {
    let response = await fetch(Url);
    let newData = await response.json();
    if (!response) {
      console.log(Error("failed to fetch"));
    }
    data = newData;
    loading = false;
  } catch (error) {
    console.log(error.message);
  }
  return { data, loading };
};

export default FetchUrl;
