function unitize(num) {
			    return unitizer(num,0);
}
function unitizer(num, level) {
	var units = ["Bytes", "KB", "MB", "GB", "TB"];
	if (num < 1024 || level > units.length - 1) {        
		return num + " " + units[level];
	} else {
		return unitizer(num / 1024, level + 1);        
	}
}
	