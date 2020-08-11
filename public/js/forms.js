$(document).ready(() => {
    $("#reg-email").on("input", () => {
        if (!$("#reg-email").val().match(/\S+@\S+\.\S+/)) {
            $("#reg-email").css({outline: "2px solid red"})
        } else {
            $("#reg-email").css({outline: "2px solid green"})
        }
    })
    $("#reg-password").on("input", () => {
        if ($("#reg-password").val().length < 8) {
            $("#reg-password").css({outline: "2px solid red"})
        } else {
            $("#reg-password").css({outline: "2px solid green"})
        }
    })
    $("#reg-reenter").on("input", () => {
        if ($("#reg-reenter").val().length < 8) {
            $("#reg-reenter").css({outline: "2px solid red"})
        } else {
            $("#reg-reenter").css({outline: "2px solid green"})
        }
    })
    $("#register-form").submit(async (event) => {
        event.preventDefault()
        if ($("#reg-password").val() !== $("#reg-reenter").val()) {
            await $("#reg-status").stop(true).hide(0).css("color", "red").html("Passwords do not match.").fadeIn(1000).delay(3000).fadeOut(1000)
            return
        }
        if ($("#reg-password").val().length < 8) {
            await $("#reg-status").stop(true).hide(0).css("color", "red").html("Password must be at least 8 characters in length.").fadeIn(1000).delay(3000).fadeOut(1000)
            return
        }
        let res = await fetch("/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ username: $("#reg-username").val(), email: $("#reg-email").val(), password: $("#reg-password").val() })
        })
        if (!res.ok) {
            await $("#reg-status").stop(true).hide(0).css("color", "red").html("An unexpected error occurred. The username may already be taken.").fadeIn(1000).delay(3000).fadeOut(1000)
            return
        } else {
            fetch("/get-username").then(async (res) => {
                if (res.ok) {
                    let info = await res.json()
                    $(".account-name").show()
                    $(".account-name").html(info.username)
                } else {
                    $(".account-name").css({display: "none"})
                }
            })
            await $("#reg-status").stop(true).hide(0).css("color", "green").html("Successfully registered as " + $("#reg-username").val() + "!").fadeIn(1000).delay(3000).fadeOut(1000)
            return
        }
    })
    $("#login-form").submit(async (event) => {
        event.preventDefault()
        let res = await fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ username: $("#log-username").val(), password: $("#log-password").val() })
        })
        if (!res.ok) {
            await $("#log-status").stop(true).hide(0).css("color", "red").html("Invalid username or password.").fadeIn(1000).delay(3000).fadeOut(1000)
            return
        } else {
            fetch("/get-username").then(async (res) => {
                if (res.ok) {
                    let info = await res.json()
                    $(".account-name").show()
                    $(".account-name").html(info.username)
                } else {
                    $(".account-name").css({display: "none"})
                }
            })
            await $("#log-status").stop(true).hide(0).css("color", "green").html("Successfully logged in as " + $("#log-username").val() + "!").fadeIn(1000).delay(3000).fadeOut(1000)
            return
        }
    })
})