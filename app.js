// Edited by Kulo Kenci
// Head
document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/mdui@0.4.3/dist/css/mdui.min.css">');
document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/kulokenci/goindex-drive@2.0/custom.css">');
// Markdown
document.write('<script src="//cdn.jsdelivr.net/npm/markdown-it@9.1.0/dist/markdown-it.min.js"></script>');
document.write('<style>.mdui-appbar .mdui-toolbar{height:56px;font-size:1pc}.mdui-toolbar>*{padding:0 6px;margin:0 2px}.mdui-toolbar>i{opacity:.5}.mdui-toolbar>.mdui-typo-headline{padding:0 1pc 0 0}.mdui-toolbar>i{padding:0}.mdui-toolbar>a:hover,a.active,a.mdui-typo-headline{opacity:1}.mdui-container{max-width:980px}.mdui-list-item{transition:none}.mdui-list>.th{background-color:initial}.mdui-list-item>a{width:100%;line-height:3pc}.mdui-list-item{margin:2px 0;padding:0}.mdui-toolbar>a:last-child{opacity:1}@media screen and (max-width:980px){.mdui-list-item .mdui-text-right{display:none}.mdui-container{width:100%!important;margin:0}.mdui-toolbar>.mdui-typo-headline,.mdui-toolbar>a:last-child,.mdui-toolbar>i:first-child{display:block}}</style>');
// Initialization page，And load the necessary resources
function init() {
	document.siteName = $('title').html();
	$('body').addClass("mdui-theme-primary-blue-grey mdui-theme-accent-blue");
	var html = `
    <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">
<header class="mdui-appbar mdui-color-theme"> 
   <div id="nav" class="mdui-toolbar mdui-container">
   </div> 
</header>
<div id="content" class="mdui-container"> 
</div>
	`;
	$('body').html(html);
}

function render(path) {
	if (path.indexOf("?") > 0) {
		path = path.substr(0, path.indexOf("?"));
	}
	title(path);
	nav(path);
	if (path.substr(-1) == '/') {
		list(path);
	} else {
		file(path);
	}
}
// Rendering title
function title(path) {
	path = decodeURI(path);
	$('title').html(document.siteName + ' - ' + path);
}
// Render navigation bar
function nav(path) {
	var html = "";
	html += `<a href="/" class="mdui-typo-headline folder">${document.siteName}</a>`;
	var arr = path.trim('/').split('/');
	var p = '/';
	if (arr.length > 0) {
		for (i in arr) {
			var n = arr[i];
			n = decodeURI(n);
			p += n + '/';
			if (n == '') {
				break;
			}
			html += `<i class="mdui-icon material-icons mdui-icon-dark folder" style="margin:0;">chevron_right</i><a class="folder" href="${p}">${n}</a>`;
		}
	}
	html += `<div class="mdui-toolbar-spacer"></div>
    <a href="https://github.com/kulokenci/goindex-drive" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'GoIndex on Github'}">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve" class="mdui-icon" style="width: 24px;height:24px;">
        <path fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff" d="M18,1.4C9,1.4,1.7,8.7,1.7,17.7c0,7.2,4.7,13.3,11.1,15.5
	c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1
	c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4
	c-0.2-0.4-0.7-2.1,0.2-4.3c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7
	c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5
	c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C34.3,8.7,27,1.4,18,1.4z"></path>
      </svg>
    </a>`;
	$('#nav').html(html);
}
// Render file list
function list(path) {
	var content = `
	<div id="head_md" class="mdui-typo" style="display:none;padding: 20px 0;"></div>

	 <div class="mdui-row"> 
	  <ul class="mdui-list"> 
	   <li class="mdui-list-item th"> 
	    <div class="mdui-col-xs-12 mdui-col-sm-7">
	     File Name
	    </div> 
	    <div class="mdui-col-sm-3 mdui-text-right">
	     Time of Creation
	    </div> 
	    <div class="mdui-col-sm-2 mdui-text-right">
	     Size
	    </div> 
	    </li> 
	  </ul> 
	 </div> 
	 <div class="mdui-row"> 
	  <ul id="list" class="mdui-list"> 
	  </ul> 
	 </div>
	 <div id="readme_md" class="mdui-typo" style="display:none; padding: 20px 0;"></div>
	`;
	$('#content').html(content);
	var password = localStorage.getItem('password' + path);
	$('#list').html(`<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>`);
	$('#readme_md').hide().html('');
	$('#head_md').hide().html('');
	$.post(path, '{"password":"' + password + '"}', function (data, status) {
		var obj = jQuery.parseJSON(data);
		if (typeof obj != 'null' && obj.hasOwnProperty('error') && obj.error.code == '401') {
			var pass = prompt("Folder terenkripsi，Tolong masukan password", "");
			localStorage.setItem('password' + path, pass);
			if (pass != null && pass != "") {
				list(path);
			} else {
				history.go(-1);
			}
		} else if (typeof obj != 'null') {
			list_files(path, obj.files);
		}
	});
}

function list_files(path, files) {
	html = "";
	for (i in files) {
		var item = files[i];
		var p = path + item.name + '/';
		if (item['size'] == undefined) {
			item['size'] = "";
		}
		item['modifiedTime'] = utc2beijing(item['modifiedTime']);
		item['size'] = formatFileSize(item['size']);
		if (item['mimeType'] == 'application/vnd.google-apps.folder') {
			html += `<li class="mdui-list-item mdui-ripple"><a href="${p}" class="folder">
	            <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate">
	            <i class="mdui-icon material-icons">folder_open</i>
	              ${item.name}
	            </div>
	            <div class="mdui-col-sm-3 mdui-text-right">${item['modifiedTime']}</div>
	            <div class="mdui-col-sm-2 mdui-text-right">${item['size']}</div>
	            </a>
	        </li>`;
		} else {
			var p = path + item.name;
			var c = "file";
			if (item.name == "README.md") {
				get_file(p, item, function (data) {
					markdown("#readme_md", data);
				});
			}
			if (item.name == "HEAD.md") {
				get_file(p, item, function (data) {
					markdown("#head_md", data);
				});
			}
			var ext = p.split('.').pop();
			if ("|html|php|css|go|java|js|json|txt|sh|md|mp4|bmp|jpg|jpeg|png|gif|".indexOf(`|${ext}|`) >= 0) {
				p += "?a=view";
				c += " view";
			}
			html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}">
	          <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate">
	          <i class="mdui-icon material-icons">insert_drive_file</i>
	            ${item.name}
	          </div>
	          <div class="mdui-col-sm-3 mdui-text-right">${item['modifiedTime']}</div>
	          <div class="mdui-col-sm-2 mdui-text-right">${item['size']}</div>
	          </a>
	      </li>`;
		}
	}
	$('#list').html(html);
}

function get_file(path, file, callback) {
	var key = "file_path_" + path + file['modifiedTime'];
	var data = localStorage.getItem(key);
	if (data != undefined) {
		return callback(data);
	} else {
		$.get(path, function (d) {
			localStorage.setItem(key, d);
			callback(d);
		});
	}
}
// Document display ?a=view
function file(path) {
	var name = path.split('/').pop();
	var ext = name.split('.').pop().toLowerCase().replace(`?a=view`, "");
	if ("|html|php|css|go|java|js|json|txt|sh|md|".indexOf(`|${ext}|`) >= 0) {
		return file_code(path);
	}
	if ("|mp4|".indexOf(`|${ext}|`) >= 0) {
		return file_video(path);
	}
	if ("|bmp|jpg|jpeg|png|gif|".indexOf(`|${ext}|`) >= 0) {
		return file_image(path);
	}
}
// Document display |html|php|css|go|java|js|json|txt|sh|md|
function file_code(path) {
	var type = {
		"html": "html",
		"php": "php",
		"css": "css",
		"go": "golang",
		"java": "java",
		"js": "javascript",
		"json": "json",
		"txt": "Text",
		"sh": "sh",
		"md": "Markdown",
	};
	var name = path.split('/').pop();
	var ext = name.split('.').pop();
	var href = window.location.origin + path;
	var content = `
<div class="mdui-container">
<pre id="editor" ></pre>
</div>
<div class="mdui-textfield">
	<label class="mdui-textfield-label">Download Link</label>
	<input class="mdui-textfield-input" type="text" value="${href}"/>
</div>
<a href="${href}" class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">file_download</i></a>

<script src="https://cdn.bootcss.com/ace/1.2.9/ace.js"></script>
<script src="https://cdn.bootcss.com/ace/1.2.9/ext-language_tools.js"></script>
	`;
	$('#content').html(content);
	$.get(path, function (data) {
		$('#editor').html($('<div/>').text(data).html());
		var code_type = "Text";
		if (type[ext] != undefined) {
			code_type = type[ext];
		}
		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/ambiance");
		editor.setFontSize(18);
		editor.session.setMode("ace/mode/" + code_type);
		//Autocompletion
		editor.setOptions({
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: true,
			maxLines: Infinity
		});
	});
}
// Document display mp4
function file_video(path) {
	var url = window.location.origin + path;
	var content = `
<div class="mdui-container-fluid">
	<br>
	<video class="mdui-video-fluid mdui-center" preload controls>
	  <source src="${url}" type="video/mp4">
	</video>
	<br>
	<!-- Fixed label -->
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">Download Link</label>
	  <input class="mdui-textfield-input" type="text" value="${url}"/>
	</div>
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">Reference address</label>
	  <textarea class="mdui-textfield-input"><video><source src="${url}" type="video/mp4"></video></textarea>
	</div>
</div>
<a href="${url}" class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">file_download</i></a>
	`;
	$('#content').html(content);
}
//
function file_image(path) {
	var url = window.location.origin + path;
	var content = `
<div class="mdui-container-fluid">
	<br>
	<img class="mdui-img-fluid" src="${url}"/>
	<br>
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">Download Link</label>
	  <input class="mdui-textfield-input" type="text" value="${url}"/>
	</div>
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">HTML Reference address</label>
	  <input class="mdui-textfield-input" type="text" value="<img src='${url}' />"/>
	</div>
        <div class="mdui-textfield">
	  <label class="mdui-textfield-label">Markdown Reference address</label>
	  <input class="mdui-textfield-input" type="text" value="![](${url})"/>
	</div>
        <br>
</div>
<a href="${url}" class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">file_download</i></a>
	`;
	$('#content').html(content);
}
//Time conversion
function utc2beijing(utc_datetime) {
	// 转为正常的时间格式 年-月-日 时:分:秒
	var T_pos = utc_datetime.indexOf('T');
	var Z_pos = utc_datetime.indexOf('Z');
	var year_month_day = utc_datetime.substr(0, T_pos);
	var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
	var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06
	// Processing becomes a timestamp
	timestamp = new Date(Date.parse(new_datetime));
	timestamp = timestamp.getTime();
	timestamp = timestamp / 1000;
	// Increase 8 hours，Beijing time has eight time zones than utc time
	var unixtimestamp = timestamp + 5.5 * 60 * 60;
	// Timestamp is converted to time
	var unixtimestamp = new Date(unixtimestamp * 1000);
	var year = 1900 + unixtimestamp.getYear();
	var month = "0" + (unixtimestamp.getMonth() + 1);
	var date = "0" + unixtimestamp.getDate();
	var hour = "0" + unixtimestamp.getHours();
	var minute = "0" + unixtimestamp.getMinutes();
	var second = "0" + unixtimestamp.getSeconds();
	return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length) + " " + hour.substring(hour.length - 2, hour.length) + ":" + minute.substring(minute.length - 2, minute.length) + ":" + second.substring(second.length - 2, second.length);
}
// Bytes adaptive conversion to KB,MB,GB
function formatFileSize(bytes) {
	if (bytes >= 1000000000) {
		bytes = (bytes / 1000000000).toFixed(2) + ' GB';
	} else if (bytes >= 1000000) {
		bytes = (bytes / 1000000).toFixed(2) + ' MB';
	} else if (bytes >= 1000) {
		bytes = (bytes / 1000).toFixed(2) + ' KB';
	} else if (bytes > 1) {
		bytes = bytes + ' bytes';
	} else if (bytes == 1) {
		bytes = bytes + ' byte';
	} else {
		bytes = '';
	}
	return bytes;
}
String.prototype.trim = function (char) {
	if (char) {
		return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
	}
	return this.replace(/^\s+|\s+$/g, '');
};
// README.md HEAD.md stand by
function markdown(el, data) {
	if (window.md == undefined) {
		//$.getScript('https://cdn.jsdelivr.net/npm/markdown-it@9.1.0/dist/markdown-it.min.js',function(){
		window.md = window.markdownit();
		markdown(el, data);
		//});
	} else {
		var html = md.render(data);
		$(el).show().html(html);
	}
}
document.write('<script src="//cdn.jsdelivr.net/gh/kulokenci/goindex-drive@2.0/cari.js"></script>');
// Listening back event
window.onpopstate = function () {
	var path = window.location.pathname;
	render(path);
}
$(function () {
	init();
	var path = window.location.pathname;
	$("body").on("click", '.folder', function () {
		var url = $(this).attr('href');
		history.pushState(null, null, url);
		render(url);
		return false;
	});
	$("body").on("click", '.view', function () {
		var url = $(this).attr('href');
		history.pushState(null, null, url);
		render(url);
		return false;
	});
	render(path);
});
//# sourceMappingURL=/sm/7de5ebd04c9d149c688ff531decdeb96216884e2f3038bf5009b329a0c6f8140.map
