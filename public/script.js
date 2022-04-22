import axios from "axios";

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
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

  axios({
    method: "get",
    url: milestonesURL,
  })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

// const checkboxes = document.querySelectorAll(
//   "input[type=checkbox][name=milestones-list]"
// );
// console.log(window.location.href);
// console.log(fn);
// checkboxes.forEach((cb) => {
//   console.log(cb.id);
//   cb.addEventListener("change", () => {
//     const msId = cb.id;
//     const state = cb.checked;
//     if (cb.checked) {
//       console.log("checked");
//     } else {
//       console.log("unchecked");
//     }
//   });
// });
