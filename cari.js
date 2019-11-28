function myFunction() {
	var e, t, n, l;
	for (e = document.getElementById("myInput").value.toUpperCase(), t = document.getElementById("list").getElementsByTagName("li"), l = 0; l < t.length; l++)((n = t[l].getElementsByTagName("a")[0]).textContent || n.innerText).toUpperCase().indexOf(e) > -1 ? t[l].style.display = "" : t[l].style.display = "none"
}
