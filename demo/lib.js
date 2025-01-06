const pow = document.getElementById("mint");
pow.addEventListener("click", function () {
	document.getElementById("pow").value = hashcash_mint(
		20,
		getDMY(),
		document.getElementById("email").value,
	);
});

const submit = document.getElementById("submit");
submit.addEventListener("click", function () {
	fetch("http://localhost:3000/send", {
		method: "POST", 
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"email": document.getElementById("email").value,
			"message": document.getElementById("msg").value,
			"pow": document.getElementById("pow").value
		}),
	}).then(res => res.text()).then(text => alert(text));
});
