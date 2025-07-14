// Load POS users on page load
$(document).ready(function () {
  $.get(
    '/api/resource/User?fields=["name","full_name"]&filters=[["UserRole","role","=","POS User"]]',
    function (res) {
      const dropdown = $("#user-dropdown");
      dropdown
        .empty()
        .append(`<option value="">Select User</option>`);
      res.data.forEach((user) => {
        dropdown.append(
          `<option value="${user.name}">${
            user.full_name || user.name
          }</option>`
        );
      });
    }
  ).fail(() => {
    $("#user-dropdown").html(
      '<option value="">Failed to load users</option>'
    );
  });

  // Keypad button click handler
  const inputField = document.getElementById("pin");
  if (inputField) {
    document.querySelectorAll(".key").forEach((button) => {
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
});

// Login function called by login button
function loginPOS() {
  const usr = $("#user-dropdown").val();
  const pwd = $("#pwd").val();
  $("#error-message").text("");

  if (!usr || !pwd) {
    $("#error-message").text(
      "Please select a user and enter the password."
    );
    return;
  }

  $.ajax({
    type: "POST",
    url: "/api/method/login",
    data: { usr, pwd },
    success: function () {
      window.location.href = "/app/pos";
    },
    error: function () {
      $("#error-message").text(
        "Invalid login. Please try again."
      );
    },
  });
}
