const cfConfig = {
  error: {
    title: "Error!",
    message:
      GEBID("contactform").getAttribute("error_text") ||
      "Sorry, an error occurred while receiving your message, Try contacting me with another method.",
  },
  success: {
    title: "Message Sent Successfully.",
    message:
      GEBID("contactform").getAttribute("success_text") ||
      "Thank you for contacting me, I'll get back to you soon.",
  },
};

const cfbody = `
<div class="box right-button" id="cf" style="display: inline-block; z-index: 9999;">
	<div class="button color" onclick="cfClick();"><span class="m-cf-icon-default"><i class="material-icons">chat_bubble</i></span><span class="cl-icon"><i class="material-icons">arrow_downward</i></span></div>
	<div class="panel" id="cfcontent"></div>
</div>
`;

const cfform = `
<h3 class="title">Contact Me</h3>
<p>Drop a message, I'll try to contact you soon.</p>
<div>
	<input class="element" onchange="cfonChange('cfname')" id="cfname" type="text" name="name" placeholder="Name" autocomplete="off">
	<input class="element" onchange="cfonChange('cfemail')" id="cfemail" type="email" name="email" placeholder="Email" autocomplete="off">
	<input class="element" onchange="cfonChange('cftgusername')" id="cftgusername" type="text" name="tgusername" placeholder="Telegram Username" autocomplete="off">
	<input class="element" onchange="cfonChange('cfsubject')" id="cfsubject" type="text" name="subject" placeholder="Subject" autocomplete="off">
	<textarea class="element" onchange="cfonChange('cfmessage')" id="cfmessage" name="message" placeholder="Your message"></textarea>
	<button id="cfbutton" onclick="cfSubmitMessage()" class="form-button color">Send</button>
</div>
`;

window.onload = () => {
  var cfstylesheet = document.createElement("link");
  cfstylesheet.rel = "stylesheet";
  cfstylesheet.href = `/contactform/cf.css`;
  document.getElementsByTagName("head")[0].appendChild(cfstylesheet);

  cfstylesheet.onload = function () {
    var cfdiv = document.createElement("section");
    cfdiv.classList.add("contact-form-cf");
    cfdiv.innerHTML = cfbody;
    document.getElementsByTagName("body")[0].appendChild(cfdiv);

    var cfresult = JSON.parse(localStorage.getItem("contact-form"));
    if (
      GEBID("contactform").getAttribute("disable_waittime") !== "true" &&
      cfresult &&
      cfresult.sent &&
      cfresult.canSendUnix > new Date().getTime()
    ) {
      GEBID("cfcontent").innerHTML = createHtmlFromObj(cfConfig.success);
    } else {
      GEBID("cfcontent").innerHTML = cfform;
    }
  };
};

function cfClick() {
  GEBID("cf").classList.toggle("showing-state");
  GEBID("cf").classList.toggle("showing");
}

async function cfSubmitMessage() {
  var cfvalue = {
    name: GEBID("cfname").value,
    email: GEBID("cfemail").value.toLowerCase(),
    tg_username: GEBID("cftgusername").value,
    subject: GEBID("cfsubject").value,
    message: GEBID("cfmessage").value,
  };

  let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (cfvalue.name === "") {
    GEBID("cfname").classList.add("error");
  } else if (!emailRegex.test(cfvalue.email)) {
    GEBID("cfemail").classList.add("error");
  } else if (cfvalue.tg_username === "") {
    GEBID("cftgusername").classList.add("error");
  } else if (cfvalue.subject === "") {
    GEBID("cfsubject").classList.add("error");
  } else if (cfvalue.message === "") {
    GEBID("cfmessage").classList.add("error");
  } else {
    GEBID("cfbutton").removeAttribute("onclick");
    GEBID("cfbutton").classList.remove("color");
    GEBID("cfbutton").classList.add("onclick");
    GEBID("cfbutton").innerHTML = "Sending...";

    try {
      var sendmessage = await (
        await fetch(
          document
            .getElementById("contactform")
            .getAttribute("form_worker_url"),
          {
            method: "POST",
            body: JSON.stringify(cfvalue),
          }
        )
      ).json();

      if (sendmessage.status) {
        GEBID("cfcontent").innerHTML = createHtmlFromObj(
          cfConfig.success
        );

        localStorage.setItem(
          "contact-form",
          JSON.stringify({
            sent: true,
            canSendUnix: new Date().getTime() + 43200000,
          })
        );
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
      GEBID("cfcontent").innerHTML = createHtmlFromObj(cfConfig.error);
    }
  }
}

function cfonChange(id) {
  GEBID(id).classList.remove("error");
}

function GEBID(id) {
  return document.getElementById(id);
}

function createHtmlFromObj({ title, message }) {
  return `<h3 class="title">${title}</h3><p>${message}</p>`;
}