const handleCheckboxChange = (cb) => {
  const checked = cb.checked;
  const id = cb.id;
  const url = window.location.href;

  const i = url.indexOf("/accounts");
  const end = url.length;
  const milestonesURL = url.slice(i, end);

  axios({
    method: "post",
    url: milestonesURL,
    data: {
      milestone_id: id,
      checked: checked,
    },
  })
    .then((response) => {
      console.log(response);
      window.location.reload(true);
    })
    .catch((err) => console.log(err));
};
