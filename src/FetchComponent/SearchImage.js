const SearchImage = async (search) => {
  let data;
  try {
    let response = await fetch(
      "https://api.unsplash.com/search/photos?query=" +
        search +
        "&client_id=mPPrNItdfN1rJQxQdc8KCBG9ljDFbUO7X21h3lCjDls"
    );
    let newData = await response.json();

    if (!response) {
      console.log("failed to search images");
    }

    data = newData;
  } catch (error) {
    console.log(error.message);
  }
  return { data };
};
export default SearchImage;
