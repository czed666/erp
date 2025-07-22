$.ajax({
  url: "http://192.168.0.222/api/resource/User",
  method: "GET",
  headers: {
    Authorization: "token 82c71bb169bfb14:9b52c33f4f5f701",
  },
  data: {
    fields: JSON.stringify(["name", "full_name"]),
  },
  success: function (res) {
    const dropdown = $("#user-dropdown");
    dropdown
      .empty()
      .append(`<option value="">Select User</option>`);
    res.data.forEach((user) => {
      dropdown.append(
        `<option value="${user.name}">${user.full_name}</option>`
      );
    });
  },
  error: function () {
    $("#user-dropdown").html(
      '<option value="admin">Admin</option>'
    );
  },
});

// Keypad button click handler
const inputField = document.getElementById("pin");
if (inputField) {
  document
    .querySelectorAll(".key:not(.enter)")
    .forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent any form submission / reload
        const value = this.dataset.value;
        if (value === "clear") {
          inputField.value = "";
        } else if (value === "backspace") {
          inputField.value = inputField.value.slice(0, -1);
        } else {
          inputField.value += value;
        }
      });
    });
}

// Login function called by login button
function loginPOS() {
  const usr = $("#user-dropdown").val();
  const pwd = $("#pin").val();
  $("#error-message").text("");

  if (!usr || !pwd) {
    $("#error-message").text(
      "Please select your username and enter your PIN."
    );
    return;
  }

  $.ajax({
    url: "http://192.168.0.222/api/method/login",
    type: "POST",
    xhrFields: {
      withCredentials: true, // <-- this is critical
    },
    data: { usr, pwd },
    success: function (data) {
      window.open(
        `http://192.168.0.222 + ${data.home_page}`,
        "_blank"
      );
    },
    error: function () {
      $("#error-message").text(
        "Invalid login. Please try again."
      );
    },
  });
}

function getLoggedUser() {
  fetch("http://192.168.0.222/api/resource/User", {
    headers: {
      Authorization:
        "token 82c71bb169bfb14:9b52c33f4f5f701",
    },
  })
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
    });
}
