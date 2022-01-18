const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default postData;
